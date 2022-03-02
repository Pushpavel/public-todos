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
</script>

<div bind:this={ref} class={"card " + $$props.class} on:click={()=>textarea.focus()} on:resize={notifyHeight}>
    <textarea class="w-full h-full align-top resize-none outline-none mb-4"
              bind:this={textarea}
              bind:value
              use:autoresize
              on:keydown={onKeyDown}
              on:input={notifyHeight}
              maxlength="255"
    ></textarea>
    <div class="flex">
        {charCount}/ l-{lineCount}
        <span class="flex-1"></span>
    </div>
</div>
