import {writable} from 'svelte/store';
import {browser} from "$app/env";


let initialTodos = []

if (browser) {
    const todoCache = JSON.parse(localStorage.getItem('todos_cache') || "{}");
    initialTodos = JSON.parse(localStorage.getItem('local_list_cache') || "[]").map(id => todoCache[id]).filter(todo => !!todo);
}

export const todos = writable(initialTodos)

if (browser)
    todos.subscribe((value) => localStorage.setItem("local_list_cache", JSON.stringify(value.map(t => t.id)) || "[]"))

export function addLocalTodo(todo: any) {
    todos.update((t) => [todo, ...t])
}

export function removeLocalTodo(id: string) {
    todos.update((t) => t.filter(todo => todo.id !== id))
}

export function updateLocalTodosFromTodoCache() {
    if (browser) {
        const todoCache = JSON.parse(localStorage.getItem('todos_cache') || "{}");
        todos.update((t) => t.map(todo => todoCache[todo.id] || todo))
    }
}