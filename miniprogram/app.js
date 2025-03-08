//app.js
App({
  globalData: {
    userInfo: null,
    baseUrl: 'http://localhost:3000', // 后端API地址
    cartItems: [], // 购物车数据
    currentTable: null, // 当前桌号
  },
  
  onLaunch: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
            }
          })
        }
      }
    })
  },
  
  // 添加商品到购物车
  addToCart: function(dish) {
    let cartItems = this.globalData.cartItems;
    let found = false;
    
    // 检查商品是否已在购物车中
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === dish.id) {
        cartItems[i].count++;
        found = true;
        break;
      }
    }
    
    // 如果不在购物车中，添加新项
    if (!found) {
      dish.count = 1;
      cartItems.push(dish);
    }
    
    this.globalData.cartItems = cartItems;
    return cartItems;
  },
  
  // 从购物车移除商品
  removeFromCart: function(dishId) {
    let cartItems = this.globalData.cartItems;
    
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === dishId) {
        if (cartItems[i].count > 1) {
          cartItems[i].count--;
        } else {
          cartItems.splice(i, 1);
        }
        break;
      }
    }
    
    this.globalData.cartItems = cartItems;
    return cartItems;
  },
  
  // 计算购物车总价
  calculateTotal: function() {
    let total = 0;
    let cartItems = this.globalData.cartItems;
    
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price * cartItems[i].count;
    }
    
    return total.toFixed(2);
  },
  
  // 清空购物车
  clearCart: function() {
    this.globalData.cartItems = [];
    return [];
  },
  
  // 设置当前桌号
  setCurrentTable: function(tableNumber) {
    this.globalData.currentTable = tableNumber;
  }
});