<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { slide, fade } from 'svelte/transition';
    import logo from '$lib/assets/logo.png';
    import MenuIcon from '$lib/assets/icons/menu.svg';

    $: isMobile = true;
    $: menuOpened = false;
    const menuItems = [
        { name: 'Home', url: '/' },
        { name: 'Sezóny', url: '/seasons' },
        { name: 'Týmy', url: '/teams' },
        { name: 'Fotogalerie', url: '/gallery' },
    ];

    const setSize = () => (isMobile = window.innerWidth < 1024);

    onMount(() => setSize());
</script>

<svelte:window on:resize={setSize} />

<header class="bg-stone-800 text-white flex fixed items-center justify-between top-0 left-0 right-0 h-20 z-40">
    <a href="/" class="flex items-center h-full max-h-20 my-0 mx-5 z-40 mt-5">
        <img src={logo} alt="logo" height="90" width="90" />
    </a>
    <div class="flex items-center h-full max-h-20 my-0 mx-5">
        {#if !isMobile || menuOpened}
            <nav class="fixed top-20 left-0 w-full h-full lg:relative lg:top-auto lg:left-auto lg:w-auto">
                {#if !isMobile || menuOpened}
                    <ul
                        class="bg-stone-800 h-auto absolute left-0 right-0 z-40 py-5 lg:flex lg:py-0 lg:h-full lg:relative lg:left-auto lg:right-auto"
                        transition:slide={{ duration: 300 }}
                        on:click={() => (menuOpened = false)}
                    >
                        {#each menuItems as item}
                            <li
                                class={`
                                        flex items-center cursor-pointer
                                        active:bg-green-600 hover:bg-green-600 hover:bg-opacity-50  
                                        pl-2.5 py-6 h-10 text-xl lg:py-0 lg:px-2.5 lg:h-auto lg:text-2xl
                                    ` + ($page.url.pathname === item.url ? `bg-green-600 hover:bg-opacity-100` : '')}
                            >
                                <a class="h-10 lg:h-full w-full flex items-center" href={item.url}>{item.name}</a>
                            </li>
                        {/each}
                    </ul>
                {/if}
                {#if menuOpened}
                    <div
                        transition:fade={{ duration: 300 }}
                        class="h-full z-30 bg-green-100 bg-opacity-70"
                        on:click={() => (menuOpened = !menuOpened)}
                    />
                {/if}
            </nav>
        {/if}

        {#if isMobile}
            <div class="cursor-pointer py-4 px-2.5" on:click={() => (menuOpened = !menuOpened)}>
                <img src={MenuIcon} alt="menu" height="32" width="32" />
            </div>
        {/if}
    </div>
</header>
