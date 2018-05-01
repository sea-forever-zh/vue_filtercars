<template>
    <div>
        <filterbox></filterbox>
        <tablebox></tablebox>
    </div>
</template>

<script>
    import tablebox from "./tablebox.vue";
    import filterbox from "./filterbox.vue";

    export default {
        created(){
            //最早的生命周期
            this.$store.dispatch("init_car");
        },
        components : {
            tablebox,
            filterbox
        }
    }
</script>