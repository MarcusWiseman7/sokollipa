export default {
    title: 'Team',
    name: 'team',
    type: 'object',
    fields: [
        { title: 'Name', name: 'name', type: 'string' },
        { title: 'Logo', name: 'logo', type: 'image' },
        {
            title: 'Players',
            name: 'players',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'teamPlayer' }],
                },
            ],
        },
    ],
};
