export default {
    name: 'photoGallery',
    title: 'Photo gallery',
    type: 'document',
    fields: [
        {
            name: 'teamPhotos',
            title: 'Team photos',
            type: 'array',
            of: [{ type: 'teamAlbum' }],
        },
    ],
};
