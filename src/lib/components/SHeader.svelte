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
        { name: 'Publicita', url: '/bob' },
    ];

    const setSize = () => (isMobile = window.innerWidth < 1024);

    onMount(() => setSize());
</script>

<svelte:window on:resize={setSize} />

<header>
    <a href="/" class="logo">
        <img src={logo} alt="logo" height="90" width="90" />
    </a>
    <div class="nav-wrapper">
        {#if !isMobile || menuOpened}
            <nav>
                {#if !isMobile || menuOpened}
                    <ul
                        transition:slide={{ duration: 300 }}
                        on:click={() => (menuOpened = false)}
                        on:keypress={() => (menuOpened = false)}
                    >
                        {#each menuItems as item}
                            <li class={$page.url.pathname === item.url ? 'active' : ''}>
                                <a href={item.url}>{item.name}</a>
                            </li>
                        {/each}
                    </ul>
                {/if}
                {#if menuOpened}
                    <div
                        transition:fade={{ duration: 300 }}
                        class="nav-wrapper__background"
                        on:click={() => (menuOpened = !menuOpened)}
                        on:keypress={() => (menuOpened = !menuOpened)}
                    />
                {/if}
            </nav>
        {/if}

        {#if isMobile}
            <div on:click={() => (menuOpened = !menuOpened)} on:keypress={() => (menuOpened = !menuOpened)}>
                <img src={MenuIcon} alt="menu" height="32" width="32" />
            </div>
        {/if}
    </div>
</header>

<style lang="scss">
    header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--color-bg-second);
        color: #fff;
        z-index: var(--z-header);
        height: 80px;
    }

    .logo {
        margin: 30px 0 0 20px;
        z-index: var(--z-header);
    }

    .nav-wrapper {
        display: flex;
        align-items: center;
        height: 100%;
        max-height: 80px;
        margin: 0 20px;

        &__background {
            height: 100%;
            z-index: var(--z-header-bg);
            background-color: rgba(220, 252, 231, 0.7);
        }
    }

    nav {
        position: fixed;
        top: 80px;
        left: 0;
        width: 100%;
        height: 100%;

        @media (min-width: 1024px) {
            position: relative;
            top: auto;
            left: auto;
            width: auto;
        }
    }

    ul {
        background-color: var(--color-bg-second);
        position: absolute;
        left: 0;
        right: 0;
        padding: 20px 0;
        height: auto;
        z-index: var(--z-header);

        @media (min-width: 1024px) {
            position: relative;
            left: auto;
            right: auto;
            height: 100%;
            padding: 0;
            display: flex;
        }
    }

    li {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 24px 0 24px 10px;
        height: 40px;
        font-size: 20px;
        line-height: 28px;

        &:active {
            background-color: var(--color-green-600);
        }

        &:hover {
            background-color: var(--color-green-600-half);
        }

        @media (min-width: 1024px) {
            padding: 0 10px;
            height: auto;
            font-size: 24px;
            line-height: 32px;
        }

        &.active {
            background-color: var(--color-green-600);

            &:hover {
                background-color: var(--color-green-600);
            }
        }

        a {
            height: 80px;
            display: flex;
            align-items: center;
            width: 100%;
        }
    }
</style>
