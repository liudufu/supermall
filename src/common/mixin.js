import {debounce} from "./utils";

import BackTop from "components/content/backTop/BackTop";

export const itemListener = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => {
      this.refresh()
    };
    this.$bus.$on('itemImgLoad', this.itemImgListener);
    console.log('mounted混入操作');
  }
}

export const backTopMinxin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
  }
}
