import {browser} from "$app/env";

export function mapObj(obj, predicate: (item: any) => any) {
    return Object.keys(obj).reduce((acc, key) => {
        acc[key] = predicate(obj[key]);
        return acc;
    }, {});
}

export function useCache(key: string, value: any) {
    let item = value
    if (!item) {
        if (browser)
            item = JSON.parse(localStorage.getItem(`${key}_cache`) || "[]")
        else
            item = []
    }

    if (browser)
        localStorage.setItem(`${key}_cache`, JSON.stringify(item))

    return item
}