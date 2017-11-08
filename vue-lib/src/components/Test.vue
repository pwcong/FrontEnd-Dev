<style lang="scss">

    .test{
        display: inline-block;
        box-sizing: border-box;
        padding: 6px 12px;

        border-bottom: 1px solid #ccc;

        transition: border 0.2s;

        &:hover{
            border-color: #333;
        }
    }

</style>

<template>
  
    <div class="test">
        {{label}}
    </div>

</template>

<script>
export default {

    props: {

        label: {
            type: String,
            default: 'Test'
        }

    }

};
</script>


