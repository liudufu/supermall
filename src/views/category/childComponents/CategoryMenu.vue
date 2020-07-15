<template>
  <scroll id="category-menu">
    <div class="menu-list">
      <div class="menu-list-item"
           v-for="(item,index) in categories"
           :class="{active: index===currentIndex}"
           @click="itemClick(index)" :key="index">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "CategoryMenu",
    components: {
      Scroll
    },
    props: {
      categories: Array
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('selectItem', index);
      }
    }
  }
</script>

<style scoped>
  #category-menu {
    background-color: #f6f6f6;
    height: calc(100vh - 49px - 44px);
    overflow: hidden;
    box-sizing: border-box;
  }

  .menu-list-item {
    /*background-color: orangered;*/
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
