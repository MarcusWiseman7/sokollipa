<script lang="ts">
    import type { Player } from '$lib/ts-interfaces';
    import { urlFor } from '$lib/image-url';
    export let player: Player;
</script>

{#if player}
    <div class="grid gap-5 grid-cols-2 w-full h-[400px]">
        <div class="w-1/2">
            <img
                src={urlFor(player.photo).height(400).format('webp').url()}
                srcset={urlFor(player.photo).height(800).format('webp').url()}
                alt={player.name}
                height="400"
                class="max-h-[400px] w-auto"
                on:contextmenu|preventDefault
                on:dragstart|preventDefault
            />
        </div>
        <div class="w-1/2">
            Name: {player.name}
            Position: {player.position}
            Jersey: {player.number}
            Info: {player.info}
        </div>
    </div>
{/if}
