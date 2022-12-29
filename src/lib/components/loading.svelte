<div class="loading__wrapper">
    <svg class="loading" xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 100 100">
        <circle class="circle" cx="50" cy="50" r="25" fill="none" stroke="#00a14f" stroke-width="6" />
    </svg>
</div>

<style lang="scss">
    .loading {
        animation: rotate 3s linear infinite;

        &__wrapper {
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: var(--z-loading);
            backdrop-filter: blur(4px);
        }
    }

    .circle {
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
</style>
