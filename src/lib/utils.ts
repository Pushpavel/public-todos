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

export function useTodoCache(key: string, todos: any) {
    let items = useCache(key, todos)

    // createdAt from firestore is a class Timestamp which affects comparison so clone it
    for (const item of items)
        item.createdAt = {...item.createdAt}

    return items
}

const timers = {}

export function debounce(id: any, time: number, callback: () => void) {
    let timeout = timers[id]
    if (timeout === undefined) {
        callback()
        timers[id] = null
        return
    }
    clearTimeout(timeout);
    timers[id] = setTimeout(callback, time);
}