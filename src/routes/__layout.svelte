<script>
    import "../app.scss";
    import {firebaseConfig} from "../env";
    import {initializeApp} from "firebase/app";
    import {crossfade, blur} from "svelte/transition";
    import {sineOut} from "svelte/easing";
    import {setContext} from "svelte";
    import NavBar from "../components/NavBar.svelte";
    import NavLink from "../components/NavLink.svelte";
    import GithubLogo from "../components/GithubLogo.svelte";

    initializeApp(firebaseConfig);
    setContext(
        "crossfade",
        crossfade({fallback: blur, duration: 500, easing: sineOut})
    );
</script>


<div class="flex items-center text-yellow-500">
    <h1>Public Todos</h1>
    <span class="flex items-center ml-4">
        <a href="https://github.com/Pushpavel/public-todos">
            <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Pushpavel/public-todos?style=social">
        </a>
    </span>
    <span class="flex-1"></span>
    <button class="flex items-center p-4 hover:text-white">
        <GithubLogo/>
        <span class="ml-2">Github</span>
    </button>
    <button class="flex items-center p-4 hover:text-white">
        <span class="material-icons text-4xl">lightbulb</span>
        <span class="ml-2">How</span>
    </button>
</div>

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

<style>
    h1 {
        font-size: 4rem;
        color: white;
        font-family: "Open Sans ExtraBold", sans-serif;
        margin-bottom: 1rem;
    }
</style>