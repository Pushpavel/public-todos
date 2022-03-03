<script>
    import Grid from "../components/grid/Grid.svelte";
    import Todo from "../components/todo/Todo.svelte";
    import {todos} from "$lib/local";
    import AddTodo from "../components/todo/AddTodo.svelte";
    import {isEqual} from "lodash-es";


    let todosList = [{id: 1}]

    $: {
        let items = [{id: 1}, ...$todos]

        if (!isEqual(items, todosList))
            todosList = items
    }

</script>
<Grid class="w-full" items={todosList} let:item let:setRefHeight>
    {#if item.id === 1}
        <AddTodo class="mb-2" {setRefHeight}/>
    {:else}
        <Todo {item} {setRefHeight}/>
    {/if}
</Grid>