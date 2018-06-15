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
        sure: '确 定',
        cancel: '取 消',
        login_title: '用户登录',
        login_name: '用户名',
        login_passwd: '密码'
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
        sure: 'Sure',
        cancel: 'Cancel',
        login_title: 'Sign in',
        login_name: 'Username',
        login_passwd: 'Password'
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

