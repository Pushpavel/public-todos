<script lang="ts">
    import {autoresize} from 'svelte-textarea-autoresize'
    import {getFirestore, addDoc, collection, serverTimestamp} from "firebase/firestore"
    import {onMount} from "svelte";
    import {debounce} from "$lib/utils";

    let value: string = ''
    let textarea: HTMLTextAreaElement

    export let setRefHeight

    let ref
    const unique = Symbol()
    const notifyHeight = () => debounce(unique, 200, () => setRefHeight(ref.clientHeight))

    onMount(notifyHeight)

    function onKeyDown(e) {
        if (!e.ctrlKey || e.keyCode !== 13) return
        e.preventDefault()

        const db = getFirestore()
        addDoc(collection(db, "Todos"), {
            text: value,
            want: 0,
            createdAt: serverTimestamp()
        })
        value = ''
        // todo: also resize the textarea back to the original height
    }

    // todo: validate textarea
    // todo: focus on textarea when clicked on div

    $: charCount = 255 - value.length
    $: lineCount = 10 - value.split("\n").length
    $: notEmpty = value.length > 0
</script>

<div bind:this={ref} class={"add-card " + $$props.class} class:notEmpty on:click={()=>textarea.focus()}
     on:resize={notifyHeight}>
    <textarea
            class="w-full h-full align-top resize-none outline-none mb-4 bg-transparent placeholder-white"
            placeholder="Add a todo..."
            bind:this={textarea}
            bind:value
            use:autoresize
            on:keydown={onKeyDown}
            on:input={notifyHeight}
            maxlength="255"
    ></textarea>
    <div class="flex status">
        {charCount}/ l-{lineCount}
        <span class="flex-1"></span>
    </div>
</div>

<style lang="scss">
    .add-card {
        @apply rounded-lg p-4 focus-within:outline-none focus-within:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60;
        @apply border-dashed border-2;
        transition: background-color 250ms ease-in-out;
    }

    .add-card:focus-within, .notEmpty {
        background-color: rgba(255, 255, 255, 0.7);
    }

    .add-card:focus-within textarea::placeholder, .notEmpty textarea::placeholder {
        color: gray;
    }
</style>