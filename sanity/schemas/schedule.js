export default {
    title: 'Schedule',
    name: 'schedule',
    type: 'object',
    fields: [
        {
            title: 'Team',
            name: 'team',
            type: 'reference',
            to: [{ type: 'team' }],
        },
        {
            name: 'games',
            title: 'Games',
            type: 'array',
            of: [{ type: 'game' }],
        },
    ],
};
