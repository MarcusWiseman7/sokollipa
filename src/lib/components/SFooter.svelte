<script lang="ts">
    import logo from '$lib/assets/logo.png';
</script>

<footer>
    <a href="/">
        <img src={logo} alt="logo" height="120" width="120" />
    </a>
    <small>Marcus Wiseman | Zdeňka Kameníková &copy; {new Date().getFullYear()}</small>
</footer>

<style lang="scss">
    footer {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: var(--color-bg-second);
        color: #fff;
        padding: 16px;
        z-index: var(--z-footer);
    }

    a {
        display: flex;
        justify-content: center;
    }

    small {
        text-align: center;
    }
</style>
