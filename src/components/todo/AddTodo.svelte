<script lang="ts">
    import {autoresize} from 'svelte-textarea-autoresize'
    import {getFirestore, collection, serverTimestamp, doc, setDoc} from "firebase/firestore"
    import {onMount} from "svelte";
    import {addTodoToCache, debounce} from "$lib/utils";
    import {browser} from "$app/env";
    import {addLocalTodo} from "$lib/local";

    const maxChars = 255

    let value: string = (browser && localStorage.getItem('todo-input')) || ''
    let textarea: HTMLTextAreaElement

    export let setRefHeight

    let ref
    const unique = Symbol()
    const notifyHeight = () => debounce(unique, 200, () => setRefHeight(ref.clientHeight))

    onMount(() => notifyHeight())

    $: browser && localStorage.setItem('todo-input', value)

    function addTodo() {
        const finalValue = value.trim()

        if (finalValue.length === 0) return

        const db = getFirestore()
        const todosRef = collection(db, "Todos")
        const todoRef = doc(todosRef)
        setDoc(todoRef, {
            text: finalValue,
            want: 1,
            createdAt: serverTimestamp()
        })

        value = ''

        const todo = {
            id: todoRef.id,
            text: finalValue,
            want: 1,
            createdAt: {
                seconds: Date.now() / 1000,
                nanoseconds: 0
            }
        }

        addTodoToCache(todo)
        addLocalTodo(todo)
    }

    function onKeyDown(e) {
        if (!e.ctrlKey || e.keyCode !== 13) return
        e.preventDefault()

        addTodo()
    }


    $: charCount = maxChars - value.length
    $: notEmpty = value.length > 0

    $: {
        value = value.replace("\n", "")
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
    <div class="flex justify-between">
        <div class="flex status invisible justify-start"
             style={`opacity: ${1 - charCount/maxChars}`}>
            {charCount}
        </div>
        <button on:click={addTodo}
                class="material-icons invisible text-gray-400 hover:bg-white rounded-full transition-all duration-200 active:text-black/[0.4] active:bg-gray-200 ">
            add
        </button>
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

      button {
        visibility: visible;
      }
    }
  }

</style>