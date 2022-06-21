<?php

namespace App\Http\Controllers\Manage\General;

use App\Contracts\Importer;
use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\ImportForm;
use App\Importers\BablSuiteImporter;
use App\Importers\MyBBImporter;
use App\Importers\PrometheusImporter;
use Illuminate\Support\Facades\DB;

class ImportController extends Controller
{
    public static $importers = [
        'prometheus' => PrometheusImporter::class,
        'babl' => BablSuiteImporter::class,
        'mybb' => MyBBImporter::class
    ];

    public function index()
    {
        return view('manage.general.import', [
            'importers' => array_keys(static::$importers)
        ]);
    }

    /**
     * Tests the given database connection
     * @return bool
     */
    protected function testConnection()
    {
        try {
            DB::connection('import')->getPdo();
        } catch (\PDOException $e) {
            return false;
        }

         return true;
    }

    public function import(ImportForm $request)
    {
        config()->set('database.connections.import', [
            'driver' => 'mysql',
            'host' => $request->input('host'),
            'port' => $request->input('port'),
            'database' => $request->input('database'),
            'username' => $request->input('username'),
            'password' => $request->input('password'),
        ]);

        if (!$this->testConnection()) {
            toastr()->error('Database connection failed, please check your credentials.');
        } else {
            /** @var Importer $importer */
            $importer = app(
                static::$importers[$request->input('importer')]
            );

            $importer->handle();
        }

        return redirect()->route('manage.general.import');
    }
}