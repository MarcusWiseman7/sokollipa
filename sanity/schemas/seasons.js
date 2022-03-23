export default {
    name: 'seasons',
    title: 'Seasons',
    type: 'document',
    fields: [
        {
            name: 'years',
            title: 'Years',
            type: 'array',
            of: [{ type: 'year' }],
        },
    ],
};
