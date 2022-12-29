<script lang="ts">
    import { scorecardObj } from '$lib/stores';
    import type { IGame } from '$lib/ts-interfaces';
    import SImage from './SImage.svelte';

    export let game: IGame;
    export let clickable: boolean;

    const onClick = (): void => {
        if (clickable && game) scorecardObj.set(game);
    };

    const dtNow = Date.now();
    const canShowScore =
        game?.date &&
        new Date(game.date).getTime() < dtNow &&
        game?.hasOwnProperty('homeTeamScore') &&
        game?.hasOwnProperty('awayTeamScore');
</script>

<li class={clickable ? 'clickable' : ''} on:click={onClick} on:keypress={onClick}>
    <div class="block block--left">
        {#if game?.homeTeam?.logo}
            <SImage image={game.homeTeam.logo} width={40} addClass="team" />
        {/if}
        {#if game?.homeTeam?.name}
            <span class="block__team">{game.homeTeam.name}</span>
        {/if}
    </div>

    <div class="block block--center">
        {#if canShowScore}
            <div class="block__score">
                {game.homeTeamScore ? game.homeTeamScore : 0} - {game.awayTeamScore ? game.awayTeamScore : 0}
            </div>
        {/if}
        {#if game?.date}
            <div class="block__date">
                {new Date(game.date).toLocaleDateString()}
            </div>
        {/if}
        {#if !canShowScore}
            <div class="block__time">
                {new Date(game.date).toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
                })}
            </div>
        {/if}
    </div>

    <div class="block block--right">
        {#if game?.awayTeam?.name}
            <span class="block__team">{game.awayTeam.name}</span>
        {/if}
        {#if game?.awayTeam?.logo}
            <SImage image={game.awayTeam.logo} width={40} addClass="team" />
        {/if}
    </div>
</li>

<style lang="scss">
    li {
        display: flex;
        justify-content: space-between;
        padding: 12px;
        border-bottom: 1px solid var(--color-green-600-half);

        &:last-child {
            border: none;
        }

        &.clickable {
            cursor: pointer;

            &:active {
                background-color: var(--color-green-600-half);
            }

            &:hover {
                background-color: var(--color-green-600-quarter);
            }
        }

        .block {
            display: flex;
            align-items: center;
            width: 33.33333%;

            &--left {
                justify-content: start;
            }

            &--center {
                flex-direction: column;
                font-weight: 600;
            }

            &--right {
                justify-content: end;
            }

            &__team {
                display: none;
                margin: 0 14px;
                font-size: 18px;
                line-height: 28px;

                @media (min-width: 1024px) {
                    display: block;
                }
            }

            &__score {
                font-size: 18px;
                line-height: 28px;
            }

            &__date {
                font-size: 18px;
                line-height: 28px;
                white-space: nowrap;
            }

            &__time {
                white-space: nowrap;
                font-weight: 400;
            }
        }
    }
</style>
