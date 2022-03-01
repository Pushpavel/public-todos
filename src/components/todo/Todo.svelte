<script>
    import {addLocalTodo, removeLocalTodo, todos} from "$lib/local";
    import {getFirestore, doc, updateDoc, increment} from "firebase/firestore";


    export let todo;

    export let span;
    let card;

    $: {
        span = card && Math.round((card.clientHeight + 16) / 15) || 1
    }

    $: wanted = ($todos).hasOwnProperty(todo.id)

    const db = getFirestore()

    function toggleWantTodo() {
        const ref = doc(db, `Todos/${todo.id}`)

        if (wanted)
            removeLocalTodo(todo.id)
        else
            addLocalTodo(todo)

        updateDoc(ref, {
            want: increment(wanted ? -1 : 1)
        })
    }
</script>

<pre class="flex flex-col card p-8 whitespace-pre-line leading-none h-full">
    <span class="inline-flex" style="overflow-wrap: anywhere" bind:this={card}>{todo.text}</span>
    <button on:click={toggleWantTodo}>{wanted}</button>
    <span>{todo.want}</span>
</pre>