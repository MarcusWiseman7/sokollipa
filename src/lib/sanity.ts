import sanityClient from '@sanity/client';

const sanity = sanityClient({
    projectId: 'mgriwqg2',
    dataset: 'production',
    apiVersion: '2022-04-01',
    useCdn: true,
});

export default sanity;
