<script>
    import {debounce, mapObj} from "$lib/utils";
    import {getContext} from "svelte";
    import {flip} from 'svelte/animate';

    export let items = []
    const crossfade = getContext('crossfade');

    let itemRefHeights = {}

    $: itemRowSpans = mapObj(itemRefHeights, (refHeight) => {
        return Math.round(refHeight / 15) || 1
    })

    const [send, receive] = crossfade;
</script>
<main class={$$props.class + " absolute"}>
    {#each items as item (item.id)}
        <div
                animate:flip={{duration:500}}
                in:receive={{key: item.id}}
                out:send={{key: item.id}}
                style={`grid-row: span ${itemRowSpans[item.id]};`}>
            <slot {item} setRefHeight={(h)=>itemRefHeights[item.id] = h}>
            </slot>
        </div>
    {/each}
</main>

<style lang="postcss">
    main {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 0 1em;
    }
</style>