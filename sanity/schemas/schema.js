import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// documents
import hero from './hero';
import seasons from './seasons';

// supporting types
import year from './year';
import schedule from './schedule';

import mainImage from './mainImage';
import game from './game';
import team from './team';
import player from './teamPlayer';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
    // We name our schema
    name: 'default',
    // Then proceed to concatenate our document type
    // to the ones provided by any plugins that are installed
    types: schemaTypes.concat([hero, seasons, year, team, game, schedule, player, mainImage]),
});
