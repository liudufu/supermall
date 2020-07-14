<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

    <!--toast组件封装成插件进行显示-->
    <!--    <toast :message="message" :is-show="show"></toast>-->
  </div>
</template>

<script>
  import DetailNavBar from "./childComponents/DetailNavBar";
  import detailSwiper from "./childComponents/detailSwiper";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
  import DetailParamInfo from "./childComponents/DetailParamInfo";
  import DetailCommentInfo from "./childComponents/DetailCommentInfo";
  import DetailBottomBar from "./childComponents/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backTop/BackTop";
  // import Toast from "components/common/toast/Toast";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListener, backTopMinxin} from "common/mixin";

  import {mapActions} from 'vuex';

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      detailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll,
      // Toast,
      BackTop
    },
    mixins: [itemListener, backTopMinxin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        // isShowBackTop: false
        // message: '',
        // show: false
      }
    },
    created() {
      //1、保存传入的iid
      this.iid = this.$route.params.iid;

      //2、根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        //1、获取顶部图片 的 轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages;

        //2、获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns,data.shopInfo.services);

        //3、创建店铺信息
        this.shop = new Shop(data.shopInfo);

        //4、获取商品 详细信息
        this.detailInfo = data.detailInfo;

        //5、保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //6、取出评论信息
        if(data.rate.CRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
/*
        this.$nextTick(() => {
          //根据最新的数据 对应 的dom已经被渲染出来，但是图片没加载完会发生错误
          //offsetTop值不对 一般 是由图片产生的
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

          console.log(this.themeTopYs);
        })
*/
      });

      //3、请求推荐数据
      getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.list;
      });

      //4、给getthemeTopY赋值(进行防抖）
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

        console.log(this.themeTopYs);
      }, 500);
      },
    mounted() {
      // console.log('detail-mounted');
      //以下代码注释掉是因为使用了混入
      // const refresh = debounce(this.$refs.scroll.refresh, 500);
      // this.$bus.$on('itemImgLoad', () => {
      //   refresh()
      // });

    },
    updated() {
    },
    // destroyed() {
    //   // 2、取消全局事件监听
    //   this.$bus.$off('itemImgLoad', this.itemImgListener);
    // },
    methods: {
      //可以使用对象方式 'add':'addCart'
      ...mapActions(['addCart']),

      imageLoad() {
        console.log('-----');
        this.$refs.scroll.refresh();
        // this.refresh();
        this.getThemeTopY();
      },
      titleClick(index) {
        console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]+44, 200);
      },
      //使用 混入，下列代码被注释
      // backClick() {
      //   this.$refs.scroll.scrollTo(0, 0)
      // },
      contentScroll(position) {
        // console.log(position);
        const positionY = -position.y + 44;

        //2、positionY与主题中的值进行对比
        // [0, 13780, 15063, 15279,]
        //positonY在0-13780之间 index = 0
        //......
        //positonY在15279之后 index = 3
        for (let i = 0; i < this.themeTopYs.length; i++) {
          //console.log(i); //str 下面 i+ 1会有问题
          // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
          //
          // }
          let length = this.themeTopYs.length;
          if(this.currentIndex !== i
            && ((i < length - 1 && positionY >= this.themeTopYs[i]
            && positionY < this.themeTopYs[i + 1])
            || (i === length -1 && positionY >= this.themeTopYs[i]))) {
            //对于上面一长串的范围判断使用this.themeTopYs.push(Number.MAX.VALUE);
            //这样可以省去 || 之后的判断代码
            this.currentIndex = i;
            console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }

        //是否显示回到顶部
        this.isShowBackTop = (-position.y) > 1000;
      },
      addToCart() {
        console.log('addToCart');
        //1、获取购物车需要展示的信息加入购物车
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.newPrice;
        product.iid = this.iid;
        product.realPrice = this.goods.realPrice;

        //2、将商品添加购物车里面
        // this.$store.commit('addCart', product);

        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // });

        //将上面 的方法影射到本组件内部(利用mapActions
        this.addCart(product).then(res => {
          // console.log(res);
          // this.show = true;
          // this.message = res;
          //
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = '';
          // }, 1500);
          // console.log(this.$toast);
          this.$toast.show(res, 2000);
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    background-color: #fff;
    height: calc(100% - 44px - 49px);
  }
</style>
