import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types';

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //payload新加入的商品
      //1、查找数组中是否有该商品
      let product = context.state.cartList.find((item) => {
        return item.iid === payload.iid;
      });
      //2、判断product
      if(product) {
        // product.count += 1;
        context.commit(ADD_COUNTER, product);
        resolve('当前的商品数量加一');
      }else {
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload);
        resolve('添加了心得商品');
      }
    })
  }
}
