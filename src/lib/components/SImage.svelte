<script lang="ts">
    // types
    import type { SanityImageAssetDocument } from '@sanity/client';

    // helpers
    import getImageProps from '$lib/image-props';

    // props
    export let image: SanityImageAssetDocument;
    export let height: number = 0;
    export let width: number = 0;
    export let addClass: string = '';
    export let loading: 'lazy' | 'eager' = 'lazy';

    // data
    let loaded = false;
</script>

<img
    {loading}
    fetchPriority={loading === 'eager' ? 'high' : undefined}
    class={addClass}
    alt={image.alt || ' '}
    {...getImageProps({
        image,
        userMaxWidth: width || '100vw',
        userMaxHeight: height,
    })}
    data-loaded={loaded}
    on:load={() => (loaded = true)}
    on:contextmenu|preventDefault
    on:dragstart|preventDefault
/>

<style lang="scss">
    img {
        object-fit: cover;
        max-width: 100%;
        height: auto;
        transition: opacity 0.15s;
    }

    img[data-loaded='false'] {
        opacity: 0;
    }

    .round {
        border-radius: 50%;
    }

    .player {
        @media (min-width: 1024px) {
            max-height: 400px;
            width: auto;

            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
        }
    }

    .logo {
        width: 80px;
        height: 80px;

        &--big {
            width: 100px;
            height: 100px;
        }
    }

    .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .team {
        height: 40px;
        width: 40px;
    }
</style>
