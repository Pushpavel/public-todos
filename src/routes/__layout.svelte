<script>
    import "../app.css";
    import {firebaseConfig} from "../env";
    import {initializeApp} from "firebase/app"
    import AddTodo from "../components/todo/AddTodo.svelte";
    import {crossfade, scale} from 'svelte/transition';
    import {sineOut} from 'svelte/easing';
    import {setContext} from "svelte";

    initializeApp(firebaseConfig)
    setContext('crossfade', crossfade({fallback: scale, duration: 500, easing: sineOut}))
</script>


<main class="p-12">
    <AddTodo class="mb-8"/>
    <nav>
        <a href="/" class="text-blue-500">Home</a>
        <a href="/hot" class="text-blue-500">Hot</a>
        <a href="/wanted" class="text-blue-500">Wanted</a>
    </nav>
    <div class="relative">
        <slot/>
    </div>
</main>
