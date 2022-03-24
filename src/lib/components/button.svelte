<script>
    export let type = 'main';
</script>

<button
    class="{type === 'warning'
        ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white'
        : type === 'info'
        ? 'bg-slate-300 hover:bg-slate-400 active:bg-slate-500 text-slate-900'
        : 'bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white'}
    rounded-lg font-semibold text-xl px-20 py-2"
    on:click
>
    <slot />
</button>
