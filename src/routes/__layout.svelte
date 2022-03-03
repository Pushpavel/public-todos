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
<div class="relative">
    <slot/>
</div>