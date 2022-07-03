<script>
    import { activeTab } from '$lib/stores';

    const tabs = ['Tym A', 'Tym B'];
    const base_class =
        'flex items-center justify-center cursor-pointer text-lg w-1/2 py-1 hover:border-b-2 hover:border-green-600 hover:border-opacity-20';
    const active_class = ' border-b-2 border-green-600 hover:border-opacity-100';
</script>

<ul class="flex w-full mt-5 mb-6">
    {#each tabs as tab}
        <li class={base_class + (tab === $activeTab ? active_class : '')} on:click={() => activeTab.set(tab)}>
            {tab}
        </li>
    {/each}
</ul>
