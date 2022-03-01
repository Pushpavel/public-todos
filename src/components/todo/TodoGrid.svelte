<script>
    import {collection, getFirestore, query, orderBy} from "firebase/firestore";
    import {collectionData} from "rxfire/firestore";
    import Todo from "./Todo.svelte";

    const db = getFirestore()
    const todos = collectionData(query(collection(db, "Todos"), orderBy("createdAt", "desc")));
</script>

<main>
    {#each ($todos || []) as todo}
        <Todo text={todo.text}/>
    {/each}
</main>

<style lang="postcss">
    main {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, auto));
        grid-gap: 1rem;

        margin: 1rem;

        padding: 1rem;
    }
</style>