<script>
    import Grid from "../components/grid/Grid.svelte";
    import Todo from "../components/todo/Todo.svelte";
    import {todos} from "$lib/local";
    import {Timestamp} from "firebase/firestore";
    import AddTodo from "../components/todo/AddTodo.svelte";

    let todoList
    $: {
        const values = Object.values($todos)
        values.sort((a, b) => new Timestamp(b.createdAt.seconds) - new Timestamp(a.createdAt.seconds))
        todoList = [{id: 1}, ...values]
    }
</script>

<Grid class="w-full" items={todoList} let:item let:setRefHeight>
    {#if item.id === 1}
        <AddTodo class="mb-2" {setRefHeight} />
    {:else}
        <Todo {item} {setRefHeight}/>
    {/if}
</Grid>