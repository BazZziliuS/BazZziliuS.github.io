<?php

namespace App\Importers;

use App\Contracts\Importer;
use App\Models\Forums\Board;
use App\Models\Forums\Category;
use App\Models\Forums\Thread;
use App\Models\User;
use ErrorException;
use Genert\BBCode\BBCode;
use Illuminate\Database\Connection;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Support\Facades\DB;
use Throwable;

class MyBBImporter implements Importer
{
    protected $parser;

    protected $usersMap = [];
    protected $categoryMap = [];
    protected $boardsMap = [];

    public function __construct(BBCode $parser)
    {
        $this->parser = $parser;

        $this->parser->addParser(
            'color',
            '/\[color\=(.*?)\](.*?)\[\/color\]/s',
            '<span style="color: $1;">$2</span>',
            '$1'
        );

        $this->parser->addParser(
            'size',
            '/\[size\=(.*?)\](.*?)\[\/size\]/s',
            '<span style="font-size: $1;">$2</span>',
            '$1'
        );

        $this->parser->addParser(
            'font',
            '/\[font\=(.*?)\](.*?)\[\/font\]/s',
            '<span style="font-family: $1;">$2</span>',
            '$1'
        );
    }

    /**
     * @throws Throwable
     */
    public function handle()
    {
        DB::transaction(function() {
            $importConnection  = DB::connection('import');

            $importConnection->table('mybb_forums')
                ->orderBy('fid')
                ->get()->each(function ($forum) use ($importConnection) {
                    $this->importForum($forum);
                });

            $importConnection->table('mybb_threads')
                ->get()->each(function ($thread) use ($importConnection) {
                    $this->importThread($importConnection, $thread);
                });
        });
    }

    protected function importForum(object $forum)
    {
        // This means the forum is a category
        if ($forum->type === 'c') {
            $category = Category::create([
                'name' => $forum->name,
                'description' => !empty($forum->description) ? $forum->description : null
            ]);

            $this->categoryMap[$forum->fid] = $category;
            return;
        }

        if ($forum->type === 'f') {
            /** @var Board $board */
            $board = Board::make([
                'name' => $forum->name,
                'description' => !empty($forum->description) ? $forum->description : null,
                'icon' => 'fad fa-comments',
                'color' => config('cosmo.configs.site_color'),
                'roles' => []
            ]);

            // Parent count explanation
            // 1: The forum is a category
            // 2: The forum is not a sub board, but a part of category
            // 3 or more: The forum is a sub board

            $parents = explode(',', $forum->parentlist);
            if (count($parents) >= 3) {
                $parent = $this->boardsMap[$forum->pid];

                $board->category_id = $parent->category_id;
                $board->parent_id = $parent->id;
            } else {
                $board->category_id = $this->categoryMap[$forum->pid]->id;
            }

            $board->save();
            $this->boardsMap[$forum->fid] = $board;
        }
    }

    protected function importThread(ConnectionInterface $connection, object $thread)
    {
        /** @var object $post */
        $post = $connection->table('mybb_posts')
            ->where('pid', $thread->firstpost)
            ->first();

        if (!$post) return;

        $user = $this->importUser($connection, $thread->uid);
        if (!$user) return;

        $penis = str_replace(['"d', '&'], ['&quot;', '&amp;'], $this->parser->convertToHtml($post->message));

        /** @var Thread $thread */
        $thread = Thread::make([
            'title' => $thread->subject,
            'stickied' => $thread->sticky,
            'closed' => !empty($thread->closed) ? $thread->closed : false,
            'user_id' => $user->id,
            'board_id' => $this->boardsMap[$thread->fid]->id
        ]);

        try {
            $thread->fill([
                'content' => $penis
            ]);
        } catch (ErrorException $e) {
            $thread->fill([
                'content' => '<p>Failed to import this thread</p>'
            ]);
        }

        $thread->save();
    }

    /**
     * @param Connection $connection
     * @param int $id
     * @return false|User
     */
    protected function importUser(Connection $connection, int $id)
    {
        if (isset($this->usersMap[$id])) {
            return $this->usersMap[$id];
        }

        /** @var object $user */
        $user = $connection->table('mybb_users')
            ->where('uid', $id)
            ->first();

        if (!$user) return false;

        preg_match('/(\d{17,})@steamcommunity\.com/s', $user->email, $matches);

        if (!$steamId = $matches[1] ?? null) {
            return false;
        }

        return $this->usersMap[$id] = User::firstOrCreate(
            [
                'steamid' => $steamId,
            ],
            [
                'username' => $user->username,
                'avatar' => $user->avatar,
                'role_id' => 1
            ]
        );
    }
}