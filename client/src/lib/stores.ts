import { writable } from 'svelte/store';

export let activeTab = writable('Tym A');
export let scorecardObj = writable(null);
export let appLoading = writable(false);
