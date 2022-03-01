<script>
    import {collection, getFirestore, query, orderBy} from "firebase/firestore";
    import {flip} from "svelte/animate";
    import {collectionData} from "rxfire/firestore";
    import Todo from "./Todo.svelte";

    const db = getFirestore()
    const todos = collectionData(query(collection(db, "Todos"), orderBy("createdAt", "desc")), {idField: "id"})
    let spans = {}
</script>

<main>
    {#each ($todos || []) as todo (todo.id)}
        <div class="pb-2" animate:flip={{duration:1000}} style={`grid-row: span ${spans[todo.id]};`}>
            <Todo {todo} bind:span={spans[todo.id]}/>
        </div>
    {/each}
</main>

<style lang="postcss">
    main {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 0 1em;
        margin: 1em;
        padding: 1em;
    }
</style>