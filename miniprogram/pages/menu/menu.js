// menu.js
const app = getApp()

Page({
  data: {
    currentTable: null,
    currentCategory: 'all',
    searchValue: '',
    dishes: [],
    cartItems: [],
    totalPrice: '0.00',
    totalCount: 0,
    showCart: false
  },

  onLoad: function(options) {
    // 如果从首页跳转过来，可能带有分类或搜索参数
    if (options.category) {
      this.setData({
        currentCategory: options.category
      });
    }
    
    if (options.search) {
      this.setData({
        searchValue: options.search
      });
      this.searchDishes(options.search);
    } else {
      this.fetchDishesByCategory(this.data.currentCategory);
    }
  },

  onShow: function() {
    // 每次页面显示时，获取当前桌号和购物车数据
    this.setData({
      currentTable: app.globalData.currentTable,
      cartItems: app.globalData.cartItems
    });
    
    // 更新菜品列表中的数量
    this.updateDishesCount();
    
    // 计算总价和总数量
    this.calculateTotal();
  },

  // 根据分类获取菜品
  fetchDishesByCategory: function(category) {
    // 实际项目中应该从服务器获取数据
    // wx.request({
    //   url: `${app.globalData.baseUrl}/api/dishes?category=${category}`,
    //   success: res => {
    //     this.setData({
    //       dishes: res.data
    //     });
    //     this.updateDishesCount();
    //   }
    // })
    
    // 模拟数据
    let dishes = [
      {
        id: 1,
        name: '红烧肉',
        price: 38.00,
        image: '/images/dishes/dish1.jpg',
        description: '精选五花肉，红烧入味',
        category: 'lunch'
      },
      {
        id: 2,
        name: '宫保鸡丁',
        price: 32.00,
        image: '/images/dishes/dish2.jpg',
        description: '麻辣鲜香，口感丰富',
        category: 'dinner'
      },
      {
        id: 3,
        name: '早餐套餐',
        price: 22.00,
        image: '/images/dishes/dish3.jpg',
        description: '营养均衡，活力早晨',
        category: 'breakfast'
      },
      {
        id: 4,
        name: '水煮鱼',
        price: 48.00,
        image: '/images/dishes/dish4.jpg',
        description: '新鲜鱼肉，麻辣鲜香',
        category: 'dinner'
      },
      {
        id: 5,
        name: '冰镇柠檬水',
        price: 8.00,
        image: '/images/dishes/drink1.jpg',
        description: '清爽解腻，夏日必备',
        category: 'drinks'
      }
    ];
    
    // 如果不是全部分类，则筛选对应分类的菜品
    if (category !== 'all') {
      dishes = dishes.filter(dish => dish.category === category);
    }
    
    this.setData({
      dishes: dishes
    });
    
    this.updateDishesCount();
  },

  // 搜索菜品
  searchDishes: function(keyword) {
    // 实际项目中应该从服务器搜索数据
    // wx.request({
    //   url: `${app.globalData.baseUrl}/api/dishes/search?keyword=${keyword}`,
    //   success: res => {
    //     this.setData({
    //       dishes: res.data
    //     });
    //     this.updateDishesCount();
    //   }
    // })
    
    // 模拟搜索结果
    const dishes = [
      {
        id: 1,
        name: '红烧肉',
        price: 38.00,
        image: '/images/dishes/dish1.jpg',
        description: '精选五花肉，红烧入味',
        category: 'lunch'
      },
      {
        id: 2,
        name: '宫保鸡丁',
        price: 32.00,
        image: '/images/dishes/dish2.jpg',
        description: '麻辣鲜香，口感丰富',
        category: 'dinner'
      }
    ].filter(dish => dish.name.indexOf(keyword) !== -1);
    
    this.setData({
      dishes: dishes
    });
    
    this.updateDishesCount();
  },

  // 切换菜品分类
  switchCategory: function(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      currentCategory: category,
      searchValue: ''
    });
    
    this.fetchDishesByCategory(category);
  },

  // 搜索输入事件
  onSearchInput: function(e) {
    this.setData({
      searchValue: e.detail.value
    });
  },

  // 搜索确认事件
  onSearch: function() {
    const searchValue = this.data.searchValue;
    if (searchValue.trim() === '') {
      return;
    }
    
    this.searchDishes(searchValue);
  },

  // 添加到购物车
  addToCart: function(e) {
    const dish = e.currentTarget.dataset.dish;
    const cartItems = app.addToCart(dish);
    
    this.setData({
      cartItems: cartItems
    });
    
    this.updateDishesCount();
    this.calculateTotal();
  },

  // 从购物车移除
  removeFromCart: function(e) {
    const dishId = e.currentTarget.dataset.dishId;
    const cartItems = app.removeFromCart(dishId);
    
    this.setData({
      cartItems: cartItems
    });
    
    this.updateDishesCount();
    this.calculateTotal();
  },

  // 清空购物车
  clearCart: function() {
    const cartItems = app.clearCart();
    
    this.setData({
      cartItems: cartItems,
      showCart: false
    });
    
    this.updateDishesCount();
    this.calculateTotal();
  },

  // 更新菜品列表中的数量
  updateDishesCount: function() {
    const dishes = this.data.dishes;
    const cartItems = this.data.cartItems;
    
    dishes.forEach(dish => {
      const cartItem = cartItems.find(item => item.id === dish.id);
      dish.count = cartItem ? cartItem.count : 0;
    });
    
    this.setData({
      dishes: dishes
    });
  },

  // 计算总价和总数量
  calculateTotal: function() {
    const totalPrice = app.calculateTotal();
    let totalCount = 0;
    
    this.data.cartItems.forEach(item => {
      totalCount += item.count;
    });
    
    this.setData({
      totalPrice: totalPrice,
      totalCount: totalCount
    });
  },

  // 显示购物车详情
  showCartDetail: function() {
    if (this.data.cartItems.length === 0) {
      return;
    }
    
    this.setData({
      showCart: true
    });
  },

  // 隐藏购物车详情
  hideCartDetail: function() {
    this.setData({
      showCart: false
    });
  },

  // 提交订单
  submitOrder: function() {
    if (this.data.cartItems.length === 0) {
      wx.showToast({
        title: '购物车为空',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.currentTable) {
      wx.showToast({
        title: '请先扫码获取桌号',
        icon: 'none'
      });
      return;
    }
    
    // 创建订单数据
    const orderData = {
      tableNumber: this.data.currentTable,
      items: this.data.cartItems,
      totalPrice: this.data.totalPrice
    };
    
    // 实际项目中应该发送到服务器创建订单
    // wx.request({
    //   url: `${app.globalData.baseUrl}/api/orders`,
    //   method: 'POST',
    //   data: orderData,
    //   success: res => {
    //     // 清空购物车
    //     app.clearCart();
    //     // 跳转到订单页面
    //     wx.switchTab({
    //       url: '/pages/order/order'
    //     });
    //   }
    // })
    
    // 模拟创建订单成功
    wx.showLoading({
      title: '提交中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      // 清空购物车
      app.clearCart();
      this.setData({
        cartItems: [],
        showCart: false
      });
      this.updateDishesCount();
      this.calculateTotal();
      
      // 跳转到订单页面
      wx.switchTab({
        url: '/pages/order/order'
      });
    }, 1500);
  },

  // 扫码点餐
  scanQRCode: function() {
    wx.scanCode({
      success: (res) => {
        // 解析扫码结果，获取桌号
        try {
          const result = res.result;
          // 假设二维码内容格式为：table:1 表示1号桌
          if (result.startsWith('table:')) {
            const tableNumber = result.split(':')[1];
            // 设置当前桌号
            app.setCurrentTable(tableNumber);
            this.setData({
              currentTable: tableNumber
            });
            
            wx.showToast({
              title: `已选择${tableNumber}号桌`,
              icon: 'success'
            });
          } else {
            wx.showToast({
              title: '无效的桌号二维码',
              icon: 'none'
            });
          }
        } catch (error) {
          wx.showToast({
            title: '二维码解析失败',
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '扫码失败',
          icon: 'none'
        });
      }
    });
  }
});