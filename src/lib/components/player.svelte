<script lang="ts">
    import type { Player } from '$lib/ts-interfaces';
    import { urlFor } from '$lib/image-url';
    export let player: Player;
</script>

{#if player}
    <div class="lg:flex gap-5 w-full lg:h-[400px] shadow-lg rounded-lg">
        <div class="relative">
            <h3 class="text-4xl font-semibold text-center mb-6 lg:hidden">{player.name}</h3>
            {#if player.profilePhoto}
                <img
                    src={urlFor(player.profilePhoto).height(400).format('webp').url()}
                    srcset={urlFor(player.profilePhoto).height(800).format('webp').url()}
                    alt={player.name}
                    class="max-w-full lg:max-h-[400px] w-full lg:w-auto rounded-lg lg:rounded-r-none"
                    on:contextmenu|preventDefault
                    on:dragstart|preventDefault
                />
            {/if}
            {#if player.number}
                <div class="absolute bottom-2 right-2 text-8xl text-white rounded-lg font-['Varsity']">
                    {player.number}
                </div>
            {/if}
        </div>
        <div class="py-[20px] px-7 lg:px-0">
            {#if player.avatar}
                <img
                    src={urlFor(player.avatar).height(80).width(80).format('webp').url()}
                    srcset={urlFor(player.avatar).height(160).width(160).format('webp').url()}
                    alt={player.name}
                    height="80"
                    width="80"
                    class="hidden lg:block max-h-[80px] max-w-[80px] object-contain rounded-full"
                    on:contextmenu|preventDefault
                    on:dragstart|preventDefault
                />
            {/if}
            <h3 class="text-4xl font-semibold hidden lg:block">{player.name}</h3>
            {#if player.position}
                <h4 class="text-3xl font-semibold text-center lg:text-left">{player.position}</h4>
            {/if}
            {#if player.info}
                <h5 class="text-2xl text-justify lg:text-left">{player.info}</h5>
            {/if}
        </div>
    </div>
{/if}

<style>
    @font-face {
        font-family: 'Varsity';
        font-style: normal;
        font-weight: bold;
        src: local(''), url('/fonts/varsity.woff') format('woff'), url('/fonts/varsity.ttf') format('truetype');
    }
</style>
