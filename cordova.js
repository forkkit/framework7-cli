/* =============================================
    Cordova Wrapper
============================================= */ 
var exec = require('./utils/exec.js');
module.exports = {
// -----> Cordova Create
    create: function (args, options) {
        args = args || [];
        options = options ||{};
        var path = args[0], id, name;
        if (path) {
            id = args[1] || 'io.framework7.helloframework7';
            name = args[2] || 'HelloFramework7';
            if (name.indexOf('"') === 0 && name.split('"') === 2) {
                for (var i = 3; i < args.length; i++) {
                    if (name.split('"') === 3) continue;
                    name += args[i];
                }
            }
            if (name.indexOf(' ') > 0) name = '"' + name + '"';
        }
        var cmd = `cordova create ${[path, id, name].join(' ')}`;
        exec(cmd);
    },
    // -----> Cordova Platform
    platform: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = `cordova platform ${args.join(' ')}`;
        if (options.save) cmd += ' --save';
        if (options.fetch) cmd += ' --fetch';
        if (options.link) cmd += ' --link ' + options.link;
        exec(cmd);
    },
    // -----> Cordova Plugin
    plugin: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = `cordova plugin ${args.join(' ')}`;
        if (options.searchpath) cmd += ' --searchpath ' + options.searchpath;
        if (options.noregistry) cmd += ' --noregistry';
        if (options.link) cmd += ' --link';
        if (options.save) cmd += ' --save';
        if (options.browserify) cmd += ' --browserify';
        if (options.force) cmd += ' --force';
        if (options.fetch) cmd += ' --fetch';
        exec(cmd);
    },
    // -----> Cordova Prepare
    prepare: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = `cordova prepare ${args.join(' ')}`;
        if (options.browserify) cmd += ' --browserify';
        if (options.fetch) cmd += ' --fetch';
        exec(cmd);
    },
    // -----> Cordova Build
    compile: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = `cordova compile ${args.join(' ')}`;
        exec(cmd);
    },
    // -----> Cordova Build
    build: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = `cordova build ${args.join(' ')}`;
        if (options.release) cmd += ' --release';
        if (options.device) cmd += ' --device';
        if (options.emulator) cmd += ' --emulator';
        if (options.buildConfig) cmd += ' --buildConfig ' + options.buildConfig;
        if (options.browserify) cmd += ' --browserify ' + options.browserify;
        exec(cmd);
    },
    // -----> Cordova Run
    run: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = `cordova run ${args.join(' ')}`;

        ('list debug release noprepare nobuild device emulator target buildConfig: browserify')
            .split(' ')
            .forEach(function (el) {
                if (el.indexOf(':')>=0) {
                    el = el.replace(':', '');
                    if (options[el]) cmd += ' --' + el + ' ' + options[el];
                }
                else {
                    if (options[el]) cmd += ' --' + el;
                }
            });
        exec(cmd);
    },
    // -----> Cordova Clean
    emulate: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = `cordova emulate ${args.join(' ')}`;
        exec(cmd);
    },
    // -----> Cordova Clean
    clean: function (args, options) {
        args = args || [];
        options = options ||{};
        var cmd = `cordova clean ${args.join(' ')}`;
        exec(cmd);
    }
};