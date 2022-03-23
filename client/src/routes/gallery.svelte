<script>
    import sanity from '$lib/sanity';
    import { urlFor } from '$lib/image-url';

    import Tabs from '$lib/components/tabs.svelte';

    const query = `*[_type == 'teamPhotos']{_id,albums->[{title, photos}]}`;

    let albums = [];

    // (async () => (albums = await sanity.fetch(query)))();
</script>

<Tabs />

{#each albums as album}
    <div class="w-full grid gap-4 lg:grid-cols-2 2xl:grid-cols-3 mb-10" v-for="album in blok.albums">
        <h3 class="mb-3">{album.title || ''}</h3>
        {#each album.photos as photo}
            <img
                class="w-full h-64 rounded-md object-cover"
                src={urlFor(photo).width(200).format('webp').url()}
                alt=""
            />
        {/each}
    </div>
{/each}
