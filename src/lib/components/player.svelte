<script lang="ts">
    // types
    import type { IPlayer } from '$lib/ts-interfaces';

    // props
    export let player: IPlayer;

    // components
    import SImage from './SImage.svelte';
</script>

{#if player}
    <div class="player">
        <div class="player__main">
            <h3 class="player__title">{player.name}</h3>
            {#if player.profilePhoto}
                <SImage image={player.profilePhoto} width={225} addClass="player" />
            {/if}
            {#if player.number}
                <div class="player__number">
                    {player.number}
                </div>
            {/if}
        </div>
        <div class="player__info">
            {#if player.avatar}
                <span class="desktop-only">
                    <SImage image={player.avatar} width={80} addClass="photo avatar" />
                </span>
            {/if}
            <h3 class="player__title-desktop">{player.name}</h3>
            {#if player.position}
                <h4 class="player__info__position">{player.position}</h4>
            {/if}
            {#if player.info}
                <h5 class="player__info__description">{player.info}</h5>
            {/if}
        </div>
    </div>
{/if}

<style lang="scss">
    @font-face {
        font-family: 'Varsity';
        font-style: normal;
        font-weight: bold;
        src: local(''), url('/fonts/varsity.woff') format('woff'), url('/fonts/varsity.ttf') format('truetype');
    }

    .player {
        width: 100%;
        border-radius: 8px;
        box-shadow: 4px 3px 10px 1px rgba(0, 0, 0, 0.2);

        @media (min-width: 1024px) {
            height: 400px;
            display: flex;
            gap: 20px;
        }

        &__main {
            position: relative;
        }

        &__title {
            font-weight: 600;
            text-align: center;
            margin-bottom: 24px;
            font-size: 36px;
            line-height: 40px;

            @media (min-width: 1024px) {
                display: none;
            }
        }

        &__title-desktop {
            display: none;

            @media (min-width: 1024px) {
                display: block;
                font-weight: 600;
                font-size: 36px;
                line-height: 40px;
            }
        }

        &__number {
            position: absolute;
            bottom: 8px;
            right: 8px;
            color: #fff;
            font-family: 'Varsity';
            font-size: 96px;
            line-height: 1;
        }

        &__info {
            padding: 20px 28px;

            @media (min-width: 1024px) {
                padding: 20px 0;
            }

            &__position {
                font-weight: 600;
                font-size: 30px;
                line-height: 36px;
                text-align: center;

                @media (min-width: 1024px) {
                    text-align: left;
                }
            }

            &__description {
                text-align: justify;
                font-size: 24px;
                line-height: 32px;

                @media (min-width: 1024px) {
                    text-align: left;
                }
            }
        }
    }
</style>
