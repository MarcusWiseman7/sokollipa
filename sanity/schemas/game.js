export default {
    title: 'Game',
    name: 'game',
    type: 'object',
    fields: [
        { title: 'Date', name: 'date', type: 'date' },
        { title: 'Description', name: 'description', type: 'text' },
        { title: 'Home Team', name: 'homeTeam', type: 'reference', to: [{ type: 'team' }] },
        { title: 'Away Team', name: 'awayTeam', type: 'reference', to: [{ type: 'team' }] },
        { title: 'Home Team Score', name: 'homeTeamScore', type: 'number' },
        { title: 'Away Team Score', name: 'awayTeamScore', type: 'number' },
    ],
};
