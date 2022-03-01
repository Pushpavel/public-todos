<script>
    import {collection, getFirestore, orderBy, query} from "firebase/firestore"
    import {collectionData} from "rxfire/firestore";
    import Todo from "../../components/todo/Todo.svelte";
    import Grid from "../../components/grid/Grid.svelte";
    import {browser} from "$app/env";

    const db = getFirestore()
    const todos = collectionData(query(collection(db, "Todos"), orderBy("want", "desc"), orderBy("createdAt", "desc")), {idField: "id"})

    let todosList
    $:{
        todosList = $todos
        if (!todosList) {
            if (browser)
                todosList = JSON.parse(localStorage.getItem("wanted_cache") || "[]")
            else
                todosList = []
        }

        if (browser)
            localStorage.setItem("wanted_cache", JSON.stringify(todosList))
    }
</script>

<Grid items={todosList} let:item let:setRefHeight>
    <Todo {item} {setRefHeight}/>
</Grid>