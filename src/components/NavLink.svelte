<script>
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";

    export let href = ""

    $: selected = href === $page.url.pathname;

</script>

<button {...$$props}
        class:selected
        on:pointerdown={()=>goto(href,{keepfocus:true})}
        class={`w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
   focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 ` + $$props.class} role="tab"
        type="button" aria-selected={selected} tabindex={selected?0:-1}
        aria-controls="headlessui-tabs-panel-4">
    <slot>Link</slot>
</button>


<style lang="postcss">
    .selected, button:active {
        @apply bg-white shadow;
    }

    button:not(.selected,:active) {
        @apply text-blue-100 hover:bg-white/[0.12] hover:text-white;
    }
</style>

