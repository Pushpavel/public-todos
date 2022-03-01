<script>
    import Grid from "../grid/Grid.svelte";
    import Todo from "./Todo.svelte";

    export let todos;
</script>

<Grid items={todos} let:item let:setRefHeight>
    <Todo {item} {setRefHeight}/>
</Grid>