<script lang="ts">
    // types
    import type { SanityImageAssetDocument } from '@sanity/client';
    import type { IGame } from '$lib/ts-interfaces';

    // props
    export let hero: SanityImageAssetDocument;
    export let nextGame: IGame | undefined;

    // helpers
    import { onDestroy, onMount } from 'svelte/internal';

    // components
    import SImage from './SImage.svelte';
    import urlFor from '$lib/image-url';

    // data
    let days = '0';
    let hours = '0';
    let minutes = '0';
    let seconds = '0';
    let showTime = false;
    let countingDown: NodeJS.Timer | null = null;
    let nextGameDateTime: number | null = null;
    let cg_counter = 0;
    let cg_to: NodeJS.Timeout | null = null;
    let hi_counter = 0;
    let hi_to: NodeJS.Timeout | null = null;
    let bgURL = '';
    let isMobile = true;

    const getTime = (): void => {
        showTime = false;
        nextGameDateTime = new Date(nextGame.date).getTime();

        countingDown = setInterval(() => {
            const timeNow = Date.now();
            const timeleft = typeof nextGameDateTime == 'number' ? nextGameDateTime - timeNow : 0;
            if (timeleft <= 0) {
                showTime = false;
                if (countingDown) clearInterval(countingDown);
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
        if (nextGame?.hasOwnProperty('date')) {
            getTime();
        } else if (cg_counter < 1000) {
            cg_counter++;
            cg_to = setTimeout(() => {
                checkNextGame();
            }, 100);
        }
    };

    const checkHeroImage = (): void => {
        if (hero) {
            const w = isMobile ? 800 : 1600;
            bgURL = urlFor(hero).width(w).url();
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

{#if hero}
    <div class="hero" style={`background-image: url(${bgURL})`}>
        {#if nextGame}
            <!-- Mobile countdown -->
            {#if isMobile}
                <div class="hero__mobile-countdown">
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
            <div class="hero__row">
                <div class="hero__row__section">
                    {#if nextGame.homeTeam?.logo}
                        <SImage image={nextGame.homeTeam.logo} width={100} addClass="logo--big" />
                    {/if}
                </div>

                <!-- Desktop countdown -->
                {#if !isMobile}
                    <div class="hero__row__section hero__desktop-countdown">
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

                <div class="hero__row__section">
                    {#if nextGame.awayTeam?.logo}
                        <SImage image={nextGame.awayTeam.logo} width={100} addClass="logo--big" />
                    {/if}
                </div>
            </div>

            <!-- Team names / game date row -->
            <div class="hero__row">
                {#if !isMobile}
                    <span class="hero__row__section hero__row__section--big fuzz">{nextGame.homeTeam.name}</span>
                {/if}
                <div class="hero__row__section hero__row__section--medium">
                    <span class="fuzz">{new Date(nextGame.date).toLocaleDateString()}</span>
                    <span class="fuzz"
                        >{new Date(nextGame.date).toLocaleTimeString([], {
                            hour: 'numeric',
                            minute: '2-digit',
                        })}</span
                    >
                </div>
                {#if !isMobile}
                    <span class="hero__row__section hero__row__section--big fuzz">{nextGame.awayTeam.name}</span>
                {/if}
            </div>
        {:else}
            <div class="hero__title fuzz">Sokol Lípa</div>
        {/if}
    </div>
{/if}

<style lang="scss">
    @font-face {
        font-family: 'Varsity';
        font-style: normal;
        font-weight: bold;
        src: local(''), url('/fonts/varsity.woff') format('woff'), url('/fonts/varsity.ttf') format('truetype');
    }

    .hero {
        display: flex;
        flex-direction: column;
        justify-content: end;
        color: #fff;
        height: 300px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        margin-top: -20px;

        @media (min-width: 1024px) {
            height: 400px;
        }

        &__title {
            font-family: 'Varsity';
            font-weight: 700;
            font-size: 58px;
            line-height: 1;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--color-green-600);
            text-transform: uppercase;
            text-align: center;

            @media (min-width: 1024px) {
                font-size: 120px;
                line-height: 1;
            }
        }

        &__row {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 112px;

            @media (min-width: 1024px) {
                height: 128px;
            }

            &__section {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 50%;

                @media (min-width: 1024px) {
                    width: 33.3333%;
                }

                &--big {
                    font-weight: 700;
                    font-size: 30px;
                    line-height: 36px;
                }

                &--medium {
                    font-weight: 700;
                    font-size: 24px;
                    line-height: 32px;
                }
            }
        }

        &__mobile-countdown {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 112px;
            font-weight: 700;
            font-size: 36px;
            line-height: 40px;
        }

        &__desktop-countdown {
            font-weight: 700;
            font-size: 60px;
            line-height: 1;
        }
    }

    .fuzz {
        text-shadow: 0 0 16px #000;
    }
</style>
