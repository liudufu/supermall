<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <good-list :goods="showGoods"/>
    </scroll>
<!--    <div>呵呵呵呵</div>-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import { getHomeMultidata, getHomeGoods } from "network/home"
  import { debounce } from "common/utils";
  import {itemListener, backTopMinxin} from "common/mixin";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    mixins: [itemListener, backTopMinxin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        // isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      // //3、监听item中图片加载完成
      // this.$bus.$on('itemImgLoad', () => {
      //   // console.log('------');
      //   this.$refs.scroll.refresh()
      // })

    },
    destroyed() {
      console.log('destroyhome');
    },
    activated() {
      this.$refs.scroll.refresh();
      // console.log('actived');
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      // console.log('deactived');
      //1、保存Y值
      this.saveY = this.$refs.scroll.getScrollY();

      // 2、取消全局事件监听
      this.$bus.$off('itemImgLoad', this.itemImgListener);

    },
    mounted() {
      //1、图片加载完成 的事件监听（注释掉是因为使用了混入）
      // const refresh = debounce(this.$refs.scroll.refresh, 500);

      //对监听的事件进行保存
      // this.itemImgListener = () => {
      //   // console.log('------');
      //   // this.$refs.scroll.refresh()
      //   refresh()
      // };

      //监听item中图片加载完成
      // this.$bus.$on('itemImgLoad', () => {
      //   // console.log('------');
      //   // this.$refs.scroll.refresh()
      //   refresh()
      // });
      //2、获取tabControl的offsetTop
      //所有的组件都有一个属性：$el,用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
      // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      // backClick() {
      //   this.$refs.scroll.scrollTo(0, 0)
      // },
      contentScroll(position) {
        //1、判断backTop是否显示

        this.isShowBackTop = (-position.y) > 1000;

        //2、决定tabControl是否吸顶(position: fiexd)
        this.isTabFixed = (-position.y) > this.tabOffsetTop;
      },
      loadMore() {
        this.getHomeGoods(this.currentType);

        // this.$refs.scroll.scroll.refresh();
      },
      swiperImageLoad() {
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  /*.tab-control {*/
  /*  !*position: sticky;*!*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/
  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.content {*/
  /*height: calc(100% - 93px);*/
  /*overflow: hidden;*/
  /*margin-top: 44px;*/
  /*}*/
</style>
