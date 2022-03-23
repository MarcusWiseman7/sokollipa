export default {
    name: 'year',
    title: 'Year',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Year',
            type: 'string',
        },
        {
            name: 'schedules',
            title: 'Schedules',
            type: 'array',
            of: [{ type: 'schedule' }],
        },
    ],
};
