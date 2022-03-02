import {browser} from "$app/env";

export function mapObj(obj, predicate: (item: any) => any) {
    return Object.keys(obj).reduce((acc, key) => {
        acc[key] = predicate(obj[key]);
        return acc;
    }, {});
}

export function useTodoCache(key: string, todos: any) {
    let items = todos
    if (!items) {
        if (browser)
            items = JSON.parse(localStorage.getItem(`${key}_list_cache`) || "[]")
        else
            items = []
    }

    if (browser) {
        localStorage.setItem(`${key}_cache`, JSON.stringify(items))
        const todoCache = JSON.parse(localStorage.getItem(`todos_cache`) || "{}")

        for (let item of items) {
            if (item.id)
                todoCache[item.id] = item
        }
        localStorage.setItem(`todos_cache`, JSON.stringify(todoCache))

        items = items.map(item => todoCache[item.id])
    }

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