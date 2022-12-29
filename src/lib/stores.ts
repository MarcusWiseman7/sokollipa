import { writable } from 'svelte/store';

/**
 * WRITABLE EXPORTS
 */
export let activeTab = writable('Tym A');
export let scorecardObj = writable(null);
export let appLoading = writable(false);
