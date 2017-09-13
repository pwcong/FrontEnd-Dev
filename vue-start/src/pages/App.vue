<template>
    <div class="container">
        <img :src="logo" alt="Logo">
        <h1>Hello World!</h1>
    </div>
</template>

<style lang="scss">
.container {

    text-align: center;
    padding-top: 100px;
    
}
</style>

<script>

import logo from '../assets/imgs/vue.png';

export default {

    data() {
        return {
            logo
        }
    }

}
</script>
