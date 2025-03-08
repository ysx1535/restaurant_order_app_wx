// index.js
const app = getApp()

Page({
  data: {
    banners: [
      { id: 1, image: '/images/banner/banner1.jpg' },
      { id: 2, image: '/images/banner/banner2.jpg' },
      { id: 3, image: '/images/banner/banner3.jpg' }
    ],
    restaurantInfo: {
      logo: '/images/logo.png',
      name: '美味餐厅',
      description: '为您提供最美味的佳肴，最贴心的服务'
    },
    currentCategory: 'lunch', // 默认选中午餐分类
    searchValue: '',
    recommendedDishes: [
      {
        id: 1,
        name: '红烧肉',
        price: 38.00,
        image: '/images/dishes/dish1.jpg',
        category: 'lunch'
      },
      {
        id: 2,
        name: '宫保鸡丁',
        price: 32.00,
        image: '/images/dishes/dish2.jpg',
        category: 'dinner'
      },
      {
        id: 3,
        name: '早餐套餐',
        price: 22.00,
        image: '/images/dishes/dish3.jpg',
        category: 'breakfast'
      },
      {
        id: 4,
        name: '水煮鱼',
        price: 48.00,
        image: '/images/dishes/dish4.jpg',
        category: 'dinner'
      }
    ]
  },

  onLoad: function() {
    // 页面加载时从服务器获取数据
    this.fetchBanners();
    this.fetchRecommendedDishes();
  },

  // 获取轮播图数据
  fetchBanners: function() {
    // 实际项目中应该从服务器获取数据
    // wx.request({
    //   url: `${app.globalData.baseUrl}/api/banners`,
    //   success: res => {
    //     this.setData({
    //       banners: res.data
    //     })
    //   }
    // })
  },

  // 获取推荐菜品数据
  fetchRecommendedDishes: function() {
    // 实际项目中应该从服务器获取数据
    // wx.request({
    //   url: `${app.globalData.baseUrl}/api/dishes/recommended`,
    //   success: res => {
    //     this.setData({
    //       recommendedDishes: res.data
    //     })
    //   }
    // })
  },

  // 切换菜品分类
  switchCategory: function(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      currentCategory: category
    });
    
    // 根据分类获取菜品
    this.fetchDishesByCategory(category);
  },

  // 根据分类获取菜品
  fetchDishesByCategory: function(category) {
    // 实际项目中应该从服务器获取数据
    // wx.request({
    //   url: `${app.globalData.baseUrl}/api/dishes?category=${category}`,
    //   success: res => {
    //     // 处理返回的菜品数据
    //   }
    // })
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
    
    // 跳转到菜单页面并传递搜索参数
    wx.navigateTo({
      url: `/pages/menu/menu?search=${searchValue}`
    });
  },

  // 导航到菜单页面
  navigateToMenu: function(e) {
    const dish = e.currentTarget.dataset.dish;
    wx.navigateTo({
      url: `/pages/menu/menu?category=${dish.category}`
    });
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
            // 跳转到点餐页面
            wx.switchTab({
              url: '/pages/menu/menu'
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