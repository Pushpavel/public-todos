<script>
    import {onMount} from "svelte";
    import {addLocalTodo, removeLocalTodo, todos} from "$lib/local";
    import {doc, getFirestore, increment, updateDoc} from "firebase/firestore";

    export let item
    export let setRefHeight

    let ref
    onMount(() => setRefHeight(ref.clientHeight))


    $: wanted = ($todos).hasOwnProperty(item.id)


    const db = getFirestore()

    function toggleWantTodo() {
        const ref = doc(db, `Todos/${item.id}`)

        if (wanted)
            removeLocalTodo(item.id)
        else
            addLocalTodo(item)

        updateDoc(ref, {
            want: increment(wanted ? -1 : 1)
        })
    }
</script>

<pre class="card mb-2 whitespace-pre-wrap leading-none flex flex-col">
    <span bind:this={ref} class="flex" style="overflow-wrap: anywhere">{item.text}</span>
        <button on:click={toggleWantTodo}>{wanted}</button>
    <span>{item.want}</span>
</pre>
