<script lang="ts">
    import {autoresize} from 'svelte-textarea-autoresize'
    import {getFirestore, addDoc, collection, serverTimestamp} from "firebase/firestore"

    let value: string = ''

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
</script>

<div class={"card focus-within:outline outline-2 " + $$props.class}>
    <textarea class="w-full h-full align-top resize-none outline-none mb-4"
              bind:value
              use:autoresize
              on:keydown={onKeyDown}
              maxlength="255"
    ></textarea>
    <div class="flex">
        {charCount}
        <span class="flex-1"></span>
    </div>
</div>
