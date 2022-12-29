// types
import type { SanityImageAssetDocument } from '@sanity/client';

import imageUrlBuilder from '@sanity/image-url';
import sanity from './sanity';

const imageBuilder = imageUrlBuilder(sanity);

export default function urlFor(source: SanityImageAssetDocument) {
    return imageBuilder.image(source);
}
