import {writable} from 'svelte/store';

const initialTodos = (typeof localStorage !== 'undefined') ? JSON.parse(localStorage.getItem('todos') || "{}") : {};
export const todos = writable(initialTodos)

if (typeof localStorage !== 'undefined')
    todos.subscribe((value) => localStorage.setItem("todos", JSON.stringify(value) || "{}"))

export function addLocalTodo(todo: any) {
    todos.update((t) => {
        const newt = {...t}
        newt[todo.id] = todo
        return newt
    })
}

export function removeLocalTodo(id: string) {
    todos.update((t) => {
        const newt = {...t}
        delete newt[id]
        return newt
    })
}