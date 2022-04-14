<script lang="ts">
    import { onDestroy, onMount } from 'svelte/internal';
    import { urlFor } from '$lib/image-url';
    import { heroImage, nextAGame } from '$lib/stores';

    $: days = '0';
    $: hours = '0';
    $: minutes = '0';
    $: seconds = '0';
    $: showTime = false;
    $: countingDown = null;
    $: nextGameDateTime = null;
    $: cg_counter = 0;
    $: cg_to = null;
    $: hi_counter = 0;
    $: hi_to = null;
    $: bgURL = '';
    $: isMobile = true;

    const getTime = (): void => {
        showTime = false;
        nextGameDateTime = new Date($nextAGame.date).getTime();

        countingDown = setInterval(() => {
            const timeNow = Date.now();
            const timeleft = nextGameDateTime - timeNow;
            if (timeleft <= 0) {
                showTime = false;
                clearInterval(countingDown);
            }

            days = Math.floor(timeleft / (1000 * 60 * 60 * 24)).toString();
            const tHours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            hours = tHours < 10 ? '0' + tHours : tHours.toString();
            const tMinutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
            minutes = tMinutes < 10 ? '0' + tMinutes : tMinutes.toString();
            const tSeconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            seconds = tSeconds < 10 ? '0' + tSeconds : tSeconds.toString();

            if (!showTime) showTime = true;
        }, 1000);
    };

    const checkNextGame = (): void => {
        if ($nextAGame?.hasOwnProperty('date')) {
            getTime();
        } else if (cg_counter < 1000) {
            cg_counter++;
            cg_to = setTimeout(() => {
                checkNextGame();
            }, 100);
        }
    };

    const checkHeroImage = (): void => {
        if ($heroImage && $heroImage[0].hasOwnProperty('image')) {
            bgURL = urlFor($heroImage[0].image).format('webp').url();
        } else if (hi_counter < 1000) {
            hi_counter++;
            hi_to = setTimeout(() => {
                checkHeroImage();
            }, 10);
        }
    };

    const setSize = (): void => {
        isMobile = window.innerWidth < 1024;
    };

    onMount((): void => {
        setSize();
        checkHeroImage();
        checkNextGame();
    });

    onDestroy((): void => {
        if (cg_to) clearTimeout(cg_to);
        if (hi_to) clearTimeout(hi_to);
        if (countingDown) clearInterval(countingDown);
    });
</script>

<svelte:window on:resize={setSize} />

{#if $heroImage && $heroImage[0]?.hasOwnProperty('image')}
    <div
        class="flex flex-col justify-end text-white h-1/2 lg:h-96 bg-no-repeat bg-center bg-cover"
        style={`background-image: url(${bgURL})`}
    >
        {#if $nextAGame}
            <!-- Mobile countdown -->
            {#if isMobile}
                <div class="flex items-center justify-center h-28 font-bold text-4xl">
                    {#if showTime}
                        <span class="fuzz">
                            {#if parseInt(days) > 0}
                                {days}:{hours}:{minutes}:{seconds}
                            {:else if parseInt(hours) > 0}
                                {hours}:{minutes}:{seconds}
                            {:else}
                                {minutes}:{seconds}
                            {/if}
                        </span>
                    {/if}
                </div>
            {/if}

            <!-- Team logos row -->
            <div class="flex items-center justify-center h-28 lg:h-32">
                <div class="flex flex-col items-center w-1/2 lg:w-1/3">
                    {#if $nextAGame?.homeTeam?.logo}
                        <img
                            src={urlFor($nextAGame.homeTeam.logo).height(80).width(80).format('webp').url()}
                            alt="home team logo"
                            width="100"
                            height="100"
                            on:contextmenu|preventDefault
                            on:dragstart|preventDefault
                        />
                    {/if}
                </div>

                <!-- Desktop countdown -->
                {#if !isMobile}
                    <div class="flex flex-col items-center w-1/2 lg:w-1/3 text-6xl font-bold">
                        {#if showTime}
                            <span class="fuzz">
                                {#if parseInt(days) > 0}
                                    {days}:{hours}:{minutes}:{seconds}
                                {:else if parseInt(hours) > 0}
                                    {hours}:{minutes}:{seconds}
                                {:else}
                                    {minutes}:{seconds}
                                {/if}
                            </span>
                        {/if}
                    </div>
                {/if}

                <div class="flex flex-col items-center w-1/2 lg:w-1/3">
                    {#if $nextAGame?.awayTeam?.logo}
                        <img
                            src={urlFor($nextAGame.awayTeam.logo).height(80).width(80).format('webp').url()}
                            alt="home team logo"
                            width="100"
                            height="100"
                            on:contextmenu|preventDefault
                            on:dragstart|preventDefault
                        />
                    {/if}
                </div>
            </div>

            <!-- Team names / game date row -->
            <div class="flex items-center justify-center h-28 lg:h-32">
                {#if !isMobile}
                    <span v-if="!isMobile" class="flex flex-col items-center w-1/2 lg:w-1/3 text-3xl font-bold fuzz"
                        >{$nextAGame.homeTeam.name}</span
                    >
                {/if}
                <div class="flex flex-col items-center w-1/2 lg:w-1/3 text-2xl font-bold">
                    <span class="fuzz">{new Date($nextAGame.date).toLocaleDateString()}</span>
                    <span class="fuzz"
                        >{new Date($nextAGame.date).toLocaleTimeString([], {
                            hour: 'numeric',
                            minute: '2-digit',
                        })}</span
                    >
                </div>
                {#if !isMobile}
                    <span class="flex flex-col items-center w-1/2 lg:w-1/3 text-3xl font-bold fuzz"
                        >{$nextAGame.awayTeam.name}</span
                    >
                {/if}
            </div>
        {/if}
    </div>
{/if}

<style>
    .fuzz {
        text-shadow: 0 0 16px #000;
    }
</style>
