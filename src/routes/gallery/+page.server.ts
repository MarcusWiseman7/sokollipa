import sanity from '$lib/sanity';
import type { IGallery } from '$lib/ts-interfaces';

/** @type {import('./$types').PageServerLoad} */
export async function load({}) {
    const galleryQuery: string = `*[_type == 'photoGallery']`;
    const res: IGallery[] = await sanity.fetch(galleryQuery);

    return { res };
}
