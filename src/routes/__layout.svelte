<script>
    import "../app.scss";
    import {firebaseConfig} from "../env";
    import {initializeApp} from "firebase/app";
    import {crossfade, blur} from "svelte/transition";
    import {sineOut} from "svelte/easing";
    import {setContext} from "svelte";
    import NavBar from "../components/NavBar.svelte";
    import NavLink from "../components/NavLink.svelte";
    import Header from "../components/Header.svelte";
    import {todos} from "$lib/local";

    initializeApp(firebaseConfig);
    setContext(
        "crossfade",
        crossfade({fallback: blur, duration: 500, easing: sineOut})
    );
</script>

<Header/>
<NavBar class="mb-8">
    <NavLink href="/" class="flex items-center justify-center">
        <span class="material-icons mr-2">task_alt</span>
        Want Todo
    </NavLink>
    <NavLink href="/hot" class="flex items-center justify-center">
        <span class="material-icons mr-2">whatshot</span>
        Hot
    </NavLink>
    <NavLink href="/wanted" class="flex items-center justify-center">
        <span class="material-icons mr-2">trending_up</span>
        Most Wanted
    </NavLink>
</NavBar>
{#if $todos.length === 0}
    <div class="card flex items-center mb-8 !shadow-none !border-none !bg-white/[0.3] text-white/75">
        <span class="material-icons p-2">lightbulb</span>
        <p>Create a Todo or save Todos in "Hot" or "Most Wanted" tab to show up in "Want Todo" tab</p>
    </div>
{/if}
<div class="relative">
    <slot/>
</div>