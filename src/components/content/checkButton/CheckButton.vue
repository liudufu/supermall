<template>
  <div id="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default() {
          return false;
        }
      }
    }
  }
</script>

<style scoped>
  /*#check-button {*/
  /*  align-items: center;*/
  /*  !*height: 20px;*!*/
  /*  !*width: 20px;*!*/
  /*  justify-content: center;*/
  /*}*/
  #check-button img{
    border-radius: 50%;
    border: 1px solid #aaa;
    align-items: center;
    /*height: 20px;*/
    /*width: 20px;*/
    justify-content: center;
  }

   .check {
    /*flex: 1;*/
    background-color: var(--color-high-text);
    border-radius: 50%;
  }
</style>
