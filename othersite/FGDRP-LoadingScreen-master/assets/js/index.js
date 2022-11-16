/**
 * Garry's Mod Loading Screen
 * @author Zeropoint
 * @license MIT
 */

/**
 * Configuration for the loading screen.
 */
const config = {
    title: `Family Guy DarkRp`, // Title of your server.

    test: {
        serverURL: `apollo.banabyte.com`, // The IP to your server.
        mapName: `RP_FGDRP_SIMPLYTOWN`, // The name of the map on your server.
        maxPlayers: 128 // Number of player slots on your server.
    },

    enableMap: true, // Enable map text in the top left corner of the screen?
    enableSteamID: true, // Enable steamID text in the top right corner of the screen?
    enableAnnouncements: true, // Enable announcements?
    announceMessages: [
        'TheRandomguy98 is peter griffin.',
        'Can I buy some propane.',
        'Lion is a karen',
        'MEG GRIFFIN',
        'Among us',
        'Family guy',
        `Enjoy your stay!`,
        `Join our Discord at discord.banabyte.com!`,
        `Gamemode Made By zeropoint#9798`
    ],
    announcementLength: 5000, // Duration of an announcement, in milliseconds.
    backgroundImage: ``, // Optional background image.
    enableDebug: false // Enable debug messages?
};

let isGmod = false;
let isTest = false;
let totalFiles = 50;
let totalCalled = false;
let downloadingFileCalled = false;
let percentage = 0;
let permanent = false;
let allowIncrement = true;

/**
 * Print debug content to console.
 * @param {string} content The content to print.
 */
const debug = (content) => {
    if (!config.enableDebug) return;

    $(`#debug`).prepend(`${content}<br />`);
    console.log(`[DEBUG]: ${content}`);
};

/**
 * Announce a message.
 * @param {string} message The message to announce.
 * @param {boolean?} isPermanent Whether the message should stay permanently onscreen.
 */
const announce = (message, isPermanent) => {
    if (config.enableAnnouncements && !permanent) {
        $(`#announcement`).hide();
        $(`#announcement`).html(message);
        $(`#announcement`).fadeIn();
    }

    if (isPermanent) permanent = true;
};

/**
 * Set game details.
 * @author Zeropoint
 * @param {string?} serverName The name of the server.
 * @param {string} serverURL The IP of the server.
 * @param {string} mapName The name of the map.
 * @param {number} maxPlayers The maximum number of players.
 * @param {string} steamID The steam ID of the current player.
 * @param {string} gameMode The gamemode of the current player.
 */
function GameDetails (serverName, serverURL, mapName, maxPlayers, steamID, gameMode) {
    debug(`Initialized game details.`);
    isGmod = true;

    // Load menu.
    if (!isTest) loadAll();

    // Set the server title.
    $(`#title`).html(config.title || serverName);
    $(`#title`).fadeIn();

    if (config.enableMap) {
        $(`#map`).append(mapName);
        $(`#map`).fadeIn();
    } else $(`#map`).hide();

    if (config.enableSteamID) {
        $(`#steamid`).html(steamID);
        $(`#steamid`).fadeIn();
    }
};

/**
 * Set the total number of files to download.
 * @param {number} total The number of files.
 */
function SetFilesTotal (total) {
    debug(`Setting the number of total files: ${total}.`);

    totalFiles = total;
    totalCalled = true;
};

/**
 * Sets the number of files remaining.
 * @param {number} needed The number of files.
 */
function SetFilesNeeded (needed) {
    debug(`Setting the number of needed files: ${needed}.`);

    if (totalCalled) {
        percentage = 100 - Math.round((needed / totalFiles) * 100);
        setLoad(percentage);
    }
};

const fileCount = 0;

/**
 * Download a file.
 * @param {string} fileName The name of the file.
 */
function DownloadingFile (fileName) {
    fileName = fileName.replace(`'`, ``).replace(`?`, ``);
    downloadingFileCalled = true;

    debug(`Downloading file: ${fileName}.`);

    $(`#history`).prepend(`<div class="history-item">${fileName}</div>`);
    $(`.history-item`).each((i, f) => {
        if (i > 10) $(f).remove();
        else $(f).css(`opacity`, `${1 - (i * 0.1)}`);
    });
};

/**
 * Set the status.
 * @param {string} status The current status.
 */
function SetStatusChanged (status) {
    debug(`Setting status: ${status}.`);

    $(`#history`).prepend(`<div class="history-item">${status}</div>`);
    $(`.history-item`).each((i, f) => {
        if (i > 10) $(f).remove();
        else $(f).css(`opacity`, `${1 - (i * 0.1)}`);
    });

    if (status === `Workshop Complete`) {
        allowIncrement = false;
        setLoad(80);
    } else if (status === `Client info sent!`) {
        allowIncrement = false;
        setLoad(95);
    } else if (status === `Starting Lua...`) {
        setLoad(100);
    } else {
        if (allowIncrement) {
            percentage += 0.1;
            setLoad(percentage);
        }
    }
};

/**
 * Load all components.
 */
const loadAll = () => {
    $(`nav`).fadeIn();
    $(`main`).fadeIn();

    setTimeout(() => {
        if (!downloadingFileCalled) return;

        // Consider the player to be loading for the first time if files are not being downloaded after a prolonged period of time.
        debug(`Player has loaded for the first time: ${!downloadingFileCalled}`);
        announce(`This is your first time loading, please wait for the files to download!`, true);
    }, 1e4);
};

/**
 * Load the background.
 */
const loadBackground = () => {
    if (config.backgroundImage) $(`.background`).css(`background-image`, `url('./images/${config.backgroundImage}');`);
};

/**
 * Set the loading bar's progress.
 * @param {number} percentage The current percentage.
 */
const setLoad = (percentage) => {
    debug(`${percentage}% Loaded`);
    $(`.overhaul`).css(`left`, `${percentage}%`);
};

$(document).ready(() => {
    // Load everything in when ready.
    loadBackground();

    // Print announcement mesasges every few seconds.
    if (config.announceMessages && config.enableAnnouncements) {
        if (config.announceMessages.length > 0) {
            let i = 0;
            setInterval(() => {
                announce(config.announceMessages[i]);
                i++;

                if (i > config.announceMessages.length - 1) i = 0;
            }, config.announcementLength);
        }
    }

    // If it isn't loaded by Gmod load manually.
    setTimeout(() => {
        if (!isGmod) {
            debug(`Not running Gmod!`);
            isTest = true;

            loadAll();

            GameDetails(config.title, config.test.serverURL, config.test.mapName, config.test.maxPlayers, `SteamID`, `GameMode`);

            const totalTestFiles = 100;
            SetFilesTotal(totalTestFiles);

            let needed = totalTestFiles;

            setInterval(() => {
                if (needed > 0) {
                    needed = needed - 1;
                    SetFilesNeeded(needed);
                    DownloadingFile(`Filename ${needed}`);
                }
            }, 4500);
            SetStatusChanged(`Testing...`);
        }
    }, 25000);
});
