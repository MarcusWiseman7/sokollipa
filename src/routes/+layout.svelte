<script>
    import '../app.scss';
    import { scorecardObj, appLoading } from '$lib/stores';

    import SHeader from '$lib/components/SHeader.svelte';
    import SFooter from '$lib/components/SFooter.svelte';
    import Scorecard from '$lib/components/scorecard.svelte';
    import Loading from '$lib/components/loading.svelte';
</script>

<div class="layout">
    <SHeader />

    <slot />

    <SFooter />

    {#if $scorecardObj}
        <Scorecard />
    {/if}

    {#if $appLoading}
        <Loading />
    {/if}
</div>

<style lang="scss">
    .layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding-top: 100px;
        width: 100%;
        min-height: 100vh;
        position: relative;
    }
</style>
