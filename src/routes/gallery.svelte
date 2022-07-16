<script>
    import Tabs from '$lib/components/tabs.svelte';
    import { urlFor } from '$lib/image-url';
    import { galleries, activeTab } from '$lib/stores';
</script>

<Tabs />

{#each $galleries as gallery}
    {#if gallery.teamName === $activeTab && gallery.photoAlbums?.length}
        {#each gallery.photoAlbums as album}
            {#if album?.photos?.length}
                <h3 class="mb-3 text-xl text-center">{album.name || ''}</h3>
                <div class="w-full grid gap-4 lg:grid-cols-2 2xl:grid-cols-3 mb-10">
                    {#each album.photos as photo}
                        <div class="flex flex-col items-center">
                            <img
                                class="w-full h-64 rounded-md object-cover bg-gray-200 shadow-lg"
                                src={urlFor(photo).width(600).format('webp').url()}
                                srcset={urlFor(photo).width(1200).format('webp').url()}
                                alt={photo.alt}
                            />
                            <p class="text-sm italic">{photo.caption || ''}</p>
                        </div>
                    {/each}
                </div>
            {/if}
        {/each}
    {/if}
{/each}
