<template>
  <div class="cart">
<!--    导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

<!--    商品列表-->
    <cart-list></cart-list>
<!--    底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex';

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      //将getters中的方法直接转换为计算属性,有两种语法
      // ...mapGetters({
      //   length:'cartLength'
      // });
      ...mapGetters([
        'cartLength',
        'cartList'
      ])
    }
  }
</script>

<style scoped>
  .cart {
    /*height: 100vh;*/
    position: relative;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
