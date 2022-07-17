<script lang="ts">
    import type { Player } from '$lib/ts-interfaces';
    import { urlFor } from '$lib/image-url';
    export let player: Player;
</script>

{#if player}
    <div class="grid gap-5 grid-cols-1 lg:grid-cols-2 w-full lg:h-[440px] shadow-lg rounded-lg">
        <div class="relative py-[20px]">
            <h3 class="text-4xl font-semibold text-center mb-6 lg:hidden">{player.name}</h3>
            <img
                src={urlFor(player.profilePhoto).height(400).format('webp').url()}
                srcset={urlFor(player.profilePhoto).height(800).format('webp').url()}
                alt={player.name}
                class="max-w-full max-h-[400px] w-auto"
                on:contextmenu|preventDefault
                on:dragstart|preventDefault
            />
            <div class="absolute bottom-4 right-4 text-8xl font-['Varsity']">{player.number}</div>
        </div>
        <div class="py-[20px] px-7 lg:px-0">
            <img
                src={urlFor(player.avatar).height(80).width(80).format('webp').url()}
                srcset={urlFor(player.avatar).height(160).width(80).format('webp').url()}
                alt={player.name}
                height="80"
                width="80"
                class="hidden lg:block max-h-[80px] max-w-[80px] object-contain rounded-full"
                on:contextmenu|preventDefault
                on:dragstart|preventDefault
            />
            <h3 class="text-4xl font-semibold hidden lg:block">{player.name}</h3>
            <h4 class="text-3xl font-semibold text-center lg:text-left">{player.position}</h4>
            <h5 class="text-2xl text-justify lg:text-left">{player.info}</h5>
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
