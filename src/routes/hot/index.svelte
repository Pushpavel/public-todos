<script>
    import {collection, getFirestore, orderBy, query} from "firebase/firestore"
    import {collectionData} from "rxfire/firestore";
    import Todo from "../../components/todo/Todo.svelte";
    import Grid from "../../components/grid/Grid.svelte";
    import {useTodoCache} from "$lib/utils";
    import {isEqual} from "lodash-es";
    import AddTodo from "../../components/todo/AddTodo.svelte";

    const db = getFirestore()
    const todos = collectionData(query(collection(db, "Todos"), orderBy("createdAt", "desc")), {idField: "id"})

    let todosList = [{id: 1}]
    $:{
        let items = [{id: 1}, ...useTodoCache("hot", $todos)]

        if (!isEqual(items, todosList))
            todosList = items
    }

</script>

<Grid items={todosList} let:item let:setRefHeight>
    {#if item.id === 1}
        <AddTodo class="mb-2" {setRefHeight} />
    {:else}
        <Todo {item} {setRefHeight}/>
    {/if}
</Grid>