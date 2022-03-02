<script lang="ts">
    import {onMount} from "svelte";
    import {addLocalTodo, removeLocalTodo, todos} from "$lib/local";
    import {doc, getFirestore, increment, Timestamp, updateDoc} from "firebase/firestore";

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

    function timeAgo(timestamp: any) {
        const date = new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
        const seconds = Math.floor((new Date() - date) / 1000)
        let interval = Math.floor(seconds / 31536000)
        if (interval > 1) return `${interval} years ago`
        interval = Math.floor(seconds / 2592000)
        if (interval > 1) return `${interval} months ago`
        interval = Math.floor(seconds / 86400)
        if (interval > 1) return `${interval} days ago`
        interval = Math.floor(seconds / 3600)
        if (interval > 1) return `${interval} hours ago`
        interval = Math.floor(seconds / 60)
        if (interval > 1) return `${interval} minutes ago`
        return `just now`
    }
</script>

<pre bind:this={ref} class="card mb-2 whitespace-pre-wrap leading-none flex flex-col justify-center">
    <span class="flex" style="overflow-wrap: anywhere">{item.text}</span>
    <span class="flex justify-between mt-4 items-end footer">
            <button class:wanted class="flex pin-btn items-center tooltip-bottom"
                    data-tooltip={wanted?"Done":"Want Todo"}
                    on:click={toggleWantTodo}>
                <span>{item.want}</span>
                <span class="material-icons text-lg ml-2">{wanted ? "task_alt" : "add_task"}</span>
            </button>
        <span class="text-gray-500 opacity-0 text-sm ">{timeAgo(item.createdAt)}</span>
    </span>
</pre>

<style lang="postcss">

    .footer, .footer > span, .pin-btn {
        transition: all 500ms;
    }

    pre:hover .footer {
    //padding-top: 16px;
    }

    pre:hover .footer > span {
        opacity: 1;
    }

    .pin-btn {
        @apply border border-gray-300 text-gray-500 hover:bg-gray-50 rounded-lg px-2 py-1 font-medium;
    }

    .pin-btn.wanted {
        @apply bg-indigo-50 border-indigo-500 text-indigo-600;
    }
</style>