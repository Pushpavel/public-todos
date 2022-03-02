<script lang="ts">
    import {autoresize} from 'svelte-textarea-autoresize'
    import {getFirestore, addDoc, collection, serverTimestamp} from "firebase/firestore"
    import {onMount} from "svelte";
    import {debounce} from "$lib/utils";
    import {browser} from "$app/env";

    const maxChars = 255
    const maxLines = 10

    let value: string = (browser && localStorage.getItem('todo-input')) || ''
    let textarea: HTMLTextAreaElement

    export let setRefHeight

    let ref
    const unique = Symbol()
    const notifyHeight = () => debounce(unique, 200, () => setRefHeight(ref.clientHeight))

    onMount(() => notifyHeight())

    $: browser && localStorage.setItem('todo-input', value)

    function onKeyDown(e) {
        if (!e.ctrlKey || e.keyCode !== 13) return
        e.preventDefault()

        const finalValue = value.trim()

        if (finalValue.length === 0) return

        const db = getFirestore()
        addDoc(collection(db, "Todos"), {
            text: finalValue,
            want: 1,
            createdAt: serverTimestamp()
        })
        value = ''
    }


    $: charCount = maxChars - value.length
    $: notEmpty = value.length > 0
    $: lineCount = maxLines - value.split("\n").length

    $:{
        const newlines = value.split("\n").length
        if (newlines > maxLines)
            value = value.split("\n").slice(0, newlines + (maxLines - newlines)).join("\n")
    }
</script>

<div bind:this={ref} class={"add-card " + $$props.class} class:notEmpty on:click={()=>textarea.focus()}
     on:resize={notifyHeight}>
    <textarea
            class="w-full h-full align-top resize-none outline-none mb-4 bg-transparent placeholder-white overflow-hidden"
            placeholder="Add a todo..."
            bind:this={textarea}
            bind:value
            use:autoresize
            on:keydown={onKeyDown}
            on:input={notifyHeight}
            maxlength="255"
    ></textarea>
    <div class="flex status invisible justify-end"
         style={`opacity: ${1 - Math.min(charCount/maxChars,lineCount/maxLines)}`}>
        {charCount}  {lineCount}
    </div>
</div>

<style lang="scss">
  .add-card {
    @apply rounded-lg p-4 focus-within:outline-none focus-within:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60;
    @apply border-dashed border-2;
    transition: background-color 250ms ease-in-out;

    .status {
      font-family: "Roboto Mono", monospace;
      font-size: 12px;
    }

    &:focus-within, &.notEmpty {
      background-color: rgba(255, 255, 255, 0.7);

      textarea::placeholder {
        color: gray;
      }

      .status {
        color: red;
        visibility: visible;
      }
    }
  }

</style>