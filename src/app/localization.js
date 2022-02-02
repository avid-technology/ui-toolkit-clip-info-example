/*
 * Copyright 2021 by Avid Technology, Inc.
 */


function formatString(str, ...templateValues) {
    return str.replace(/\{(\d+)\}/g, function (a, i) {
        return templateValues[i];
    });
}

export function getLocalization(data) {
    function localize(key, ...templateValues) {
        const localizedString = data[key];
        if (localizedString === undefined) {
            return key;
        }
        return templateValues.length ? formatString(localizedString, ...templateValues) : localizedString;
    }
    return localize;
}
