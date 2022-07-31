<script lang="ts">
    import { scorecardObj } from '$lib/stores';
    import { urlFor } from '$lib/image-url';
    import type { Game } from '$lib/ts-interfaces';

    export let game: Game;
    export let clickable: boolean;

    let liclass: string =
        'flex justify-between p-3 border-b last:border-b-0 border-green-600' +
        (clickable
            ? ' active:bg-green-600 active:bg-opacity-75 hover:bg-green-600 hover:bg-opacity-50 cursor-pointer'
            : '');

    const onClick = (): void => {
        if (clickable) scorecardObj.set(game);
    };
</script>

<li class={liclass} on:click={onClick}>
    <div class="flex items-center w-1/3 justify-start team team--home">
        {#if game?.homeTeam?.logo}
            <img
                src={urlFor(game.homeTeam.logo).height(40).width(40).format('webp').url()}
                srcset={urlFor(game.homeTeam.logo).height(80).width(80).format('webp').url()}
                alt="home team logo"
                width="40"
                height="40"
                on:contextmenu|preventDefault
                on:dragstart|preventDefault
            />
        {/if}
        {#if game?.homeTeam?.name}
            <span class="text-lg my-0 mx-3.5 opacity-0 lg:opacity-100">{game.homeTeam.name}</span>
        {/if}
    </div>

    <div class="flex flex-col items-center w-2/5 font-semibold stats">
        {#if game?.hasOwnProperty('homeTeamScore') && game?.hasOwnProperty('awayTeamScore')}
            <div class="text-lg flex flex-col items-center w-2/5 stats__score" v-if="!isFutureGame">
                {game.homeTeamScore ? game.homeTeamScore : 0} - {game.awayTeamScore ? game.awayTeamScore : 0}
            </div>
        {/if}
        {#if game?.date}
            <div class="text-lg flex flex-col items-center w-2/5 stats__date">
                {new Date(game.date).toLocaleDateString().replace(' ', '')}
            </div>
        {/if}
    </div>

    <div class="flex items-center w-1/3 justify-end team team--away">
        {#if game?.awayTeam?.name}
            <span class="text-lg my-0 mx-3.5 opacity-0 lg:opacity-100">{game.awayTeam.name}</span>
        {/if}
        {#if game?.awayTeam?.logo}
            <img
                src={urlFor(game.awayTeam.logo).height(40).width(40).format('webp').url()}
                srcset={urlFor(game.awayTeam.logo).height(80).width(80).format('webp').url()}
                alt="away team logo"
                width="40"
                height="40"
                on:contextmenu|preventDefault
                on:dragstart|preventDefault
            />
        {/if}
    </div>
</li>
