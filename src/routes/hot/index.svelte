<script>
    import {collection, getFirestore, orderBy, query} from "firebase/firestore"
    import {collectionData} from "rxfire/firestore";
    import Todo from "../../components/todo/Todo.svelte";
    import Grid from "../../components/grid/Grid.svelte";
    import {useCache} from "$lib/utils";
    import {isEqual} from "lodash-es";

    const db = getFirestore()
    const todos = collectionData(query(collection(db, "Todos"), orderBy("createdAt", "desc")), {idField: "id"})

    let todosList = []
    $:{
        let items = useCache("hot", $todos)
        if (!isEqual(items, todosList))
            todosList = items
    }
</script>

<Grid items={todosList} let:item let:setRefHeight>
    <Todo {item} {setRefHeight}/>
</Grid>