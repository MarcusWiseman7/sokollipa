<script>
    import { activeTab } from '$lib/stores';

    const tabs = ['Tym A', 'Tym B'];
</script>

<ul>
    {#each tabs as tab}
        <li
            class={tab === $activeTab ? 'active' : ''}
            on:click={() => activeTab.set(tab)}
            on:keypress={() => activeTab.set(tab)}
        >
            {tab}
        </li>
    {/each}
</ul>

<style lang="scss">
    ul {
        width: 100%;
        display: flex;
        margin: 20px 0 24px 0;
    }

    li {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 50%;
        padding: 4px 0;
        font-size: 18px;
        line-height: 28px;

        &:hover {
            border-bottom: 2px solid var(--color-green-600-quarter);
        }

        &.active {
            border-bottom: 2px solid var(--color-green-600);

            &:hover {
                border-bottom: 2px solid var(--color-green-600);
            }
        }
    }
</style>
