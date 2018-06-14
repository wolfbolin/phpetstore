<script>
  let user_status = false;
  let user_uid = -1;
  let cartlist = [];
  const messages = {
    zh: {
      message: {
        welcome: '欢迎来到灰狼的宠物商店!',
        index: '主页',
        cart: '购物车',
        order: '订单',
        sign_in: '登录',
        sign_out: '登出',
      }
    },
    en: {
      message: {
        welcome: 'Welcome come to phpetstore',
        index: 'Index',
        cart: 'Cart',
        order: 'Order',
        sign_in: 'Sign in',
        sign_out: 'Sign out',
      }
    }
  };

  export default {
    user_status,
    cartlist,
    user_uid,
    messages
  }
</script>

