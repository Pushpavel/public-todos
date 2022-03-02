<script>
    import {collection, getFirestore, orderBy, query} from "firebase/firestore"
    import {collectionData} from "rxfire/firestore";
    import Todo from "../../components/todo/Todo.svelte";
    import Grid from "../../components/grid/Grid.svelte";
    import {isEqual} from 'lodash-es';
    import {useTodoCache} from "$lib/utils";

    const db = getFirestore()
    const todos = collectionData(query(collection(db, "Todos"), orderBy("want", "desc"), orderBy("createdAt", "desc")), {idField: "id"})

    let todosList = []

    $:{
        let items = useTodoCache("wanted", $todos)
        if (!isEqual(items, todosList))
            todosList = items
    }
</script>

<Grid class="w-full" items={todosList} let:item let:setRefHeight>
    <Todo {item} {setRefHeight}/>
</Grid>
