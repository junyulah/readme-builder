'use strict';

let binHelpers = require('./binHelpers');
let devHelpers = require('./devHelpers');
let license = require('./license');
let commentsContent = require('./commentsContent');

let plugins = {
    binHelpers, devHelpers, license, commentsContent
};

let pluginNames = Object.keys(plugins);

module.exports = (projectDir, packageJson) => {
    let readmeDocOptions = packageJson.readmeDocOptions || {};
    let collectors = readmeDocOptions.collectors || {};

    return Promise.all(
        pluginNames.map((name) => {
            let plugin = plugins[name];
            let collectorOptions = collectors[name] || {};
            if (collectorOptions.off) return null;
            return plugin(projectDir, packageJson, collectorOptions);
        })
    ).then(((list) => {
        return list.reduce((prev, cur, index) => {
            let name = pluginNames[index];
            prev[name] = cur;
            return prev;
        }, {});
    }));
};
