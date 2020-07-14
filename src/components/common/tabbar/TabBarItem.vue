<!--<template>-->
<!--  <div id="tab-bar-item" @click="itemClick">-->
<!--    <div class="item-icon" v-show="!isActive"><slot name="icon"></slot></div>-->
<!--    <div class="item-active-icon" v-show="isActive"><slot name="active-icon"></slot></div>-->
<!--    <div class="item-text" :style="activeStyle"><slot name="text"></slot></div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--	export default {-->
<!--		name: "TabBarItem",-->
<!--    props: {-->
<!--			link: {-->
<!--				type: String,-->
<!--        required: true-->
<!--      }-->
<!--    },-->
<!--    computed: {-->
<!--			isActive() {-->
<!--				return this.$route.path.indexOf(this.link) !== -1-->
<!--      },-->
<!--      activeStyle() {-->
<!--				return this.isActive ? {'color': 'red'} : {}-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--			itemClick() {-->
<!--				this.$router.replace(this.link)-->
<!--      }-->
<!--    }-->
<!--	}-->
<!--</script>-->

<!--<style scoped>-->
<!--  #tab-bar-item {-->
<!--    flex: 1;-->
<!--  }-->

<!--  .item-icon img, .item-active-icon img {-->
<!--    width: 24px;-->
<!--    height: 24px;-->
<!--    margin-top: 5px;-->
<!--    vertical-align: middle;-->
<!--  }-->

<!--  .item-text {-->
<!--    font-size: 12px;-->
<!--    margin-top: 3px;-->
<!--    color: #333;-->
<!--  }-->
<!--</style>-->


<template>

  <div class="tab-bar-item" @click="itemclick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        // /home -> item1(/home) => true
        return this.$route.path.indexOf(this.path) != -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemclick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  /*.active {*/
  /*  color: red;*/
  /*}*/
</style>
