import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
    // url: '/test/getBanners'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    // url: '/test/getGoods',
    params: {
      type,
      page
    }
  })
}
