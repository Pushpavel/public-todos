<script>
    import Grid from "../components/grid/Grid.svelte";
    import Todo from "../components/todo/Todo.svelte";
    import {todos} from "$lib/local";
    import AddTodo from "../components/todo/AddTodo.svelte";

    $: todoList = [{id: 1}, ...($todos)]
</script>

<Grid class="w-full" items={todoList} let:item let:setRefHeight>
    {#if item.id === 1}
        <AddTodo class="mb-2" {setRefHeight}/>
    {:else}
        <Todo {item} {setRefHeight}/>
    {/if}
</Grid>