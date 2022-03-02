<script>
    import {onMount} from "svelte";
    import {addLocalTodo, removeLocalTodo, todos} from "$lib/local";
    import {doc, getFirestore, increment, updateDoc} from "firebase/firestore";
    import {tooltip} from "../utils/tooltip";

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

<pre class="card mb-2 whitespace-pre-wrap leading-none flex flex-col justify-center">
    <span bind:this={ref} class="flex" style="overflow-wrap: anywhere">{item.text}</span>
    <span class="flex mt-4 items-center footer justify-end">
            <button class="flex pin-btn items-center" use:tooltip={{
                duration: 0,
                arrow: false,
                delay: [1000, 200],
                theme:"light-border",
            }} title={wanted?"done":"want todo"} on:click={toggleWantTodo}>
                <span>{item.want} WANT</span>
                <span class="material-icons ml-4">{wanted ? "done_outline" : "task_alt"}</span>
            </button>
    </span>
</pre>

<style>
    .pin-btn {
        opacity: 0;
        transition: all 500ms;
        @apply text-gray-800 hover:text-gray-500;
    }

    .footer {
        transition: all 500ms;
    }

    pre:hover .pin-btn {
        visibility: visible;
        opacity: 1;
    }

    .pin-btn:hover {
    }

    pre:hover .footer {
        padding-top: 16px;
    }
</style>