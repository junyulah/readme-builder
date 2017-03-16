'use strict';

let zh = require('./package/zh');

let langMap = {
    zh,
    en: null
};

module.exports = {
    langs: Object.keys(langMap),

    getLang: (type) => {
        let lang = langMap[type];
        return (key) => {
            if (lang) {
                if (lang.hasOwnProperty(key)) {
                    return lang[key];
                }
                return key;
            } else {
                return key;
            }
        };
    }
};
