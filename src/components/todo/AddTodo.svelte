<script lang="ts">
    import {autoresize} from 'svelte-textarea-autoresize'
    import {getFirestore, addDoc, collection, serverTimestamp} from "firebase/firestore"

    let value: string

    function addTodo() {
        const db = getFirestore()
        addDoc(collection(db, "Todos"), {
            text: value,
            createdAt: serverTimestamp()
        })
    }

    // todo: validate textarea
    // todo: focus on textarea when clicked on div
</script>

<div class="card focus-within:outline outline-2">
    <textarea class="w-full h-full align-top resize-none outline-none"
              bind:value
              use:autoresize
              on:keydown={(e)=>{
                  if(e.altKey && e.keyCode === 13)
                      addTodo()
              }}
    ></textarea>
</div>
