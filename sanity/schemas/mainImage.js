export default {
    name: 'mainImage',
    title: 'Image',
    type: 'image',
    options: {
        hotspot: true,
    },
    fields: [
        {
            name: 'caption',
            title: 'Caption',
            type: 'string',
            options: {
                isHighlighted: true,
            },
        },
        {
            name: 'alt',
            title: 'Alternative text',
            type: 'string',
            description: 'Important for SEO and accessibility',
            options: {
                isHighlighted: true,
            },
        },
    ],
    preview: {
        select: {
            imageUrl: 'asset.url',
            title: 'caption',
        },
    },
};
