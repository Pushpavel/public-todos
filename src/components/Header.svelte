<script>
    import GithubLogo from "./GithubLogo.svelte";
    import {slide} from 'svelte/transition'

    let toggle = false
</script>

<header class="grid sm:grid-flow-col-dense mb-8">
    <h1 class="col-span-2 text-4xl sm:text-5xl text-center sm:text-left">Public Todos</h1>
    <div class="flex items-center col-span-2 sm:col-span-1 justify-around sm:justify-end">
        <button class="flex items-center text-gray-200 hover:bg-white/[0.12] active:text-white/[0.7] hover:text-white  px-3 py-2 rounded-md text-sm font-medium"
                on:click={()=>window.open('https://github.com/Pushpavel/public-todos', '_blank')}
        >
            <GithubLogo/>
            <span class="ml-2">Github</span>
            <sup class="material-icons text-base ml-1">open_in_new</sup>
        </button>
        <button class={`flex items-center text-gray-200 hover:bg-white/[0.12] active:text-white/[0.7] hover:text-white  px-3 py-2 rounded-md text-sm font-medium
                    transition-all duration-200 ease-in-out
                        ${toggle?"bg-white/[0.12] ml-4":""}`}
                on:click={()=>toggle=!toggle}
        >
            <span class="material-icons text-3xl">lightbulb</span>
            <span class="ml-2">How</span>
            {#if toggle}
                <span class="material-icons" in:slide>expand_more</span>
            {/if}
        </button>
    </div>
</header>

{#if toggle}
    <main class="card mb-8 !bg-black/[0.5] text-white" in:slide out:slide>
        <p>Open todo board to look up things todo when bored and add things todo when bored.</p>
        <br>
        <h4 class="mb-4">
            <i class="material-icons">add_circle_outline</i>
            <span class="ml-2 ">Create Todos</span>
        </h4>
        <p>The Todos you create are publicly available to everyone. They can't be removed once created. Go on add
            something todo when bored.</p>

        <h4 class="mt-8 mb-4">
            <i class="material-icons">add_task</i>
            <span class="ml-2 ">Want Todo</span>
        </h4>
        <p>
            Explore
            <span class="block">
                <span class="material-icons">whatshot</span>
                <span class="ml-2">Hot</span>
            </span>
            <span class="block">
                <span class="material-icons">trending_up</span>
                <span class="ml-2">Most Wanted</span>
            </span>
            Tabs and mark todos you want todo. They show up in the
            <span class="block">
                <span class="material-icons">task_alt</span>
                <span class="ml-2">Want Todo</span>
            </span>
        </p>

    </main>
{/if}

<style>
    h1 {
        color: white;
        font-family: "Open Sans ExtraBold", sans-serif;
    }

    h4 {
        @apply flex items-center text-xl;
    }

    p {
        @apply text-white/[0.8];
    }

    .block {
        @apply inline-flex items-center border border-white/[0.5] rounded-lg px-2 pr-4 py-1;
    }
</style>