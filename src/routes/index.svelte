<script>
    import Grid from "../components/grid/Grid.svelte";
    import Todo from "../components/todo/Todo.svelte";
    import {todos} from "$lib/local";
    import {Timestamp} from "firebase/firestore";

    let todoList = []
    $: {
        const values = Object.values($todos)
        values.sort((a, b) => new Timestamp(b.createdAt.seconds) - new Timestamp(a.createdAt.seconds))
        todoList = values
    }
</script>

<Grid items={todoList} let:item let:setRefHeight>
    <Todo {item} {setRefHeight}/>
</Grid>