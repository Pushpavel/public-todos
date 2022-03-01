<script>
    export let text;
    export let span;
    let card;
    $:{
        span = card && Math.round((card.clientHeight + 16) / 15) || 1
    }
</script>

<pre class="flex flex-col card p-8 whitespace-pre-line leading-none h-full ">
    <span class="inline-flex" style="overflow-wrap: anywhere" bind:this={card}>{text}</span>
</pre>
