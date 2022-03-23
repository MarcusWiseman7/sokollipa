<script>
    import '../app.css';
    import { page } from '$app/stores';
    import { scorecardObj, appLoading } from '$lib/stores';

    import logo from '$lib/assets/logo.png';
    import SHeader from '$lib/components/SHeader.svelte';
    import Scorecard from '$lib/components/scorecard.svelte';
    import Loading from '$lib/components/loading.svelte';

    const names = {
        '/seasons': 'Sezóny',
        '/teams': 'Týmy',
        '/gallery': 'Fotogalerie',
    };

    $: title = 'Sokol Lipa' + ($page.url.pathname !== '/' ? ` | ${names[$page.url.pathname]}` : '');
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div
    class="flex flex-col items-center justify-between pt-20 w-full min-h-screen text-stone-900 select-none overflow-x-hidden"
>
    <SHeader />

    <div class="min-h-max w-full px-3.5 lg:w-2/3 lg:max-w-4xl lg:px-0">
        <slot />
    </div>

    {#if $scorecardObj}
        <Scorecard />
    {/if}

    {#if $appLoading}
        <Loading />
    {/if}

    <footer class="flex flex-col items-center w-full bg-stone-800 text-white">
        <a href="/" class="my-0.5 mx-0">
            <img src={logo} alt="logo" height="120" width="120" />
        </a>
        <div class="text-lg mb-5">Marcus Wiseman &copy; {new Date().getFullYear()}</div>
    </footer>
</div>
