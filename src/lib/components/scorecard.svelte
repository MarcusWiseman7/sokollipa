<script lang="ts">
    import { scorecardObj } from '$lib/stores';

    // components
    import closer from '$lib/assets/icons/close.svg';
    import SImage from './SImage.svelte';

    // helpers
    import { scale } from 'svelte/transition';

    // data
    const { homeTeam, awayTeam, homeTeamScore, awayTeamScore, date, description } = $scorecardObj;
    const dtNow = Date.now();
    const canShowScore: boolean = !!date && new Date(date).getTime() < dtNow;

    // methods
    const close = () => scorecardObj.set(null);
    const handle_keydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            close();
            return;
        }
    };
</script>

<svelte:window on:keydown={handle_keydown} />

<!-- Holder -->
<div on:click={close} on:keypress={close} class="scorecard">
    <!-- Popup -->
    <div
        on:click|stopPropagation
        on:keypress|stopPropagation
        role="dialog"
        transition:scale={{ duration: 500, delay: 100 }}
        class="scorecard__main"
    >
        <!-- Closer -->
        <div on:click={close} on:keypress={close} class="scorecard__closer">
            <img src={closer} alt="close" />
        </div>

        <h1 class="scorecard__title">Výsledková listina</h1>

        <div class="scorecard__content">
            <!-- mobile score -->
            {#if canShowScore}
                <div class="scorecard__score--mobile">
                    <span class="scorecard__score--mobile__score">{homeTeamScore ? homeTeamScore : 0}</span>
                    <span class="">-</span>
                    <span class="scorecard__score--mobile__score">{awayTeamScore ? awayTeamScore : 0}</span>
                </div>
            {/if}

            <div class="scorecard__content__inner">
                <div class="scorecard__team-info">
                    {#if homeTeam?.logo}
                        <SImage image={homeTeam.logo} width={80} addClass="logo" />
                    {/if}

                    {#if homeTeam?.name}
                        <span class="scorecard__team-info__name">{homeTeam.name}</span>
                    {/if}
                </div>

                <!-- Desktop score -->
                {#if canShowScore}
                    <div class="scorecard__score--desktop">
                        {homeTeamScore ? homeTeamScore : 0} - {awayTeamScore ? awayTeamScore : 0}
                    </div>
                {/if}

                <div class="scorecard__team-info">
                    {#if awayTeam?.logo}
                        <SImage image={awayTeam.logo} width={80} addClass="logo" />
                    {/if}

                    {#if awayTeam?.name}
                        <span class="scorecard__team-info__name">{awayTeam.name}</span>
                    {/if}
                </div>
            </div>

            {#if date}
                <div class="scorecard__date">
                    {new Date(date).toLocaleDateString()}
                </div>
                <div class="scorecard__time">
                    {new Date(date).toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit',
                    })}
                </div>
            {/if}

            {#if description}
                <div class="scorecard__description">
                    <span class="scorecard__description__title">Záznam zápasu:</span>
                    <p class="scorecard__description__text">{description}</p>
                </div>
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    .scorecard {
        height: 100vh;
        width: 100vw;
        position: fixed;
        left: 0;
        top: 0;
        z-index: var(--z-scorecard);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(15, 23, 42, 0.8);

        &__main {
            border-radius: 8px;
            background-color: #fff;
            height: auto;
            width: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-weight: 600;
            padding: 24px 40px;

            @media (min-width: 1024px) {
                max-width: 800px;
            }
        }

        &__closer {
            position: absolute;
            top: 0;
            left: 0;
            padding: 12px 16px;
            cursor: pointer;
        }

        &__title {
            font-size: 24px;
            line-height: 32px;
            margin-bottom: 24px;

            @media (min-width: 1024px) {
                font-size: 30px;
                line-height: 36px;
            }
        }

        &__content {
            width: 100%;

            &__inner {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                padding: 20px 0;
            }
        }

        &__team-info {
            width: 50%;
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            grid-template-rows: repeat(2, minmax(0, 1fr));
            place-items: center;

            @media (min-width: 1024px) {
                width: 33.3333%;
            }

            &__name {
                text-align: center;
                font-size: 24px;
                line-height: 32px;
            }
        }

        &__score {
            &--mobile {
                white-space: nowrap;
                width: 100%;
                display: flex;
                justify-content: space-between;
                font-size: 42px;
                line-height: 1;
                margin: 16px 0;

                &__score {
                    width: 50%;
                    text-align: center;
                }

                @media (min-width: 1024px) {
                    display: none;
                    width: 0;
                    height: 0;
                }
            }

            &--desktop {
                display: none;
                width: 0;
                height: 0;

                @media (min-width: 1024px) {
                    white-space: nowrap;
                    display: flex;
                    justify-content: center;
                    width: 33.3333%;
                    height: auto;
                    font-size: 48px;
                    line-height: 1;
                }
            }
        }

        &__date {
            display: flex;
            justify-content: center;
            font-size: 20px;
            line-height: 28px;
            padding-top: 20px;
        }

        &__time {
            display: flex;
            justify-content: center;
            white-space: nowrap;
            font-weight: 400;
        }

        &__description {
            padding: 0 20px 20px 20px;

            &__title {
                font-size: 20px;
                line-height: 28px;
            }

            &__text {
                text-align: justify;
                padding: 0 20px;
            }
        }
    }
</style>
