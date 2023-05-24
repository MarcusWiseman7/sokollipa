<script lang="ts">
    import pic from '$lib/assets/1.webp';
    import pic2 from '$lib/assets/2.webp';
</script>

<div class="page">
    <div class="pic">
        <img src={pic} alt="EU growth program" />
        <img src={pic2} alt="EU growth program information" />
    </div>
</div>

<style lang="scss">
    .pic {
        img {
            width: 100%;
            object-fit: cover;
        }
    }
</style>
