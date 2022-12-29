<script lang="ts">
    import logo from '$lib/assets/logo.png';
</script>

<footer>
    <a href="/">
        <img src={logo} alt="logo" height="120" width="120" />
    </a>
    <small>Marcus Wiseman | Baby Z &copy; {new Date().getFullYear()}</small>
</footer>

<style lang="scss">
    footer {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        // gap: 40px;
        background-color: var(--color-bg-second);
        color: #fff;
        padding: 16px;
        z-index: var(--z-footer);

        @media (min-width: 1024px) {
            // padding: 24px;
        }
    }

    a {
        display: flex;
        justify-content: center;
    }

    small {
        text-align: center;
    }
</style>
