<script>
    import { scale } from 'svelte/transition';
    import { scorecardObj } from '$lib/stores';
    import { urlFor } from '$lib/image-url';

    import closer from '$lib/assets/icons/close.svg';

    const { homeTeam, awayTeam, homeTeamScore, awayTeamScore, date, description } = $scorecardObj;

    const close = () => scorecardObj.set(null);
    const handle_keydown = (e) => {
        if (e.key === 'Escape') {
            close();
            return;
        }
    };
</script>

<svelte:window on:keydown={handle_keydown} />

<!-- Holder -->
<div
    on:click={close}
    class="h-screen w-screen fixed left-0 top-0 z-40 flex justify-center items-center bg-slate-900 bg-opacity-80"
>
    <!-- Popup -->
    <div
        on:click|stopPropagation
        role="dialog"
        transition:scale={{ duration: 500, delay: 100 }}
        class="h-full w-full lg:rounded-lg lg:h-auto lg:max-w-3xl bg-white relative flex flex-col items-center py-6 px-10 font-semibold"
    >
        <!-- Closer -->
        <div on:click={close} class="absolute top-0 left-0 py-3 px-4 cursor-pointer">
            <img src={closer} alt="close" />
        </div>

        <h1 class="text-3xl">Výsledková listina</h1>

        <div class="mt-6 w-full">
            <div class="lg:w-0 lg:h-0 whitespace-nowrap text-5xl flex justify-between lg:opacity-0 my-4 w-full">
                <span class="w-1/2 text-center">{homeTeamScore}</span>
                <span class="">-</span>
                <span class="w-1/2 text-center">{awayTeamScore}</span>
            </div>
            <div class="flex justify-between items-center py-5 w-full">
                <div class="w-1/2 lg:w-1/3 flex flex-col items-center">
                    {#if homeTeam?.logo}
                        <img
                            src={urlFor(homeTeam.logo).height(160).width(160).format('webp').url()}
                            alt="home team logo"
                            height="80"
                            width="80"
                            on:contextmenu|preventDefault
                            on:dragstart|preventDefault
                        />
                    {/if}

                    {#if homeTeam?.name}
                        <span class="text-2xl whitespace-nowrap">{homeTeam.name}</span>
                    {/if}
                </div>

                <div class="w-0 lg:w-1/3 whitespace-nowrap text-5xl flex justify-center opacity-0 lg:opacity-100">
                    {homeTeamScore} - {awayTeamScore}
                </div>

                <div class="w-1/2 lg:w-1/3 flex flex-col items-center">
                    {#if awayTeam?.logo}
                        <img
                            src={urlFor(awayTeam.logo).height(160).width(160).format('webp').url()}
                            alt="away team logo"
                            height="80"
                            width="80"
                            on:contextmenu|preventDefault
                            on:dragstart|preventDefault
                        />
                    {/if}

                    {#if awayTeam?.name}
                        <span class="text-2xl whitespace-nowrap">{awayTeam.name}</span>
                    {/if}
                </div>
            </div>

            {#if date}
                <div class="flex justify-center text-xl py-5">
                    {new Date(date).toLocaleDateString()}
                </div>
            {/if}

            {#if description}
                <div class="px-5 pb-5">
                    <span class="text-xl">Záznam zápasu:</span>
                    <p class="text-justify px-5">{description}</p>
                </div>
            {/if}
        </div>
    </div>
</div>
