<script lang="ts">
    // types
    import type { IGallery } from '$lib/ts-interfaces';

    import SImage from '$lib/components/SImage.svelte';
    import Tabs from '$lib/components/tabs.svelte';
    import { activeTab } from '$lib/stores';

    /** @type {import('./$types').PageData} */
    export let data: { res: IGallery[] };

    $: galleries = data?.res;
</script>

<div class="page">
    <Tabs />

    {#if galleries?.length}
        {#each galleries as gallery}
            {#if gallery.teamName === $activeTab && gallery.photoAlbums?.length}
                {#each gallery.photoAlbums as album}
                    {#if album?.photos?.length}
                        <h3 class="album__title">{album.name || ''}</h3>
                        <div class="album__photos">
                            {#each album.photos as photo}
                                <div class="album__photo">
                                    <SImage image={photo} width={600} addClass="photo" />

                                    <small class="album__photo__caption">{photo.caption || ''}</small>
                                </div>
                            {/each}
                        </div>
                    {/if}
                {/each}
            {/if}
        {/each}
    {/if}
</div>

<style lang="scss">
    .album {
        &__title {
            margin: 0 0 10px 0;
            font-size: 20px;
            line-height: 28px;
            text-align: center;
        }

        &__photos {
            width: 100%;
            display: grid;
            gap: 16px;
            margin: 0 0 40px 0;

            @media (min-width: 1024px) {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        &__photo {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &__caption {
                font-style: italic;
            }
        }
    }
</style>
