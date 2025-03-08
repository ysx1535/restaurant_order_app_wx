// user.js
Page({
  data: {
    isLogin: false,
    userInfo: null
  },

  onLoad: function() {
    // 检查用户是否已登录
    this.checkLoginStatus();
  },

  onShow: function() {
    // 页面显示时检查登录状态，以便在其他页面登录后返回能够更新状态
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus: function() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        isLogin: true,
        userInfo: userInfo
      });
    }
  },

  // 用户登录
  login: function() {
    const that = this;
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        const userInfo = res.userInfo;
        // 保存用户信息到本地存储
        wx.setStorageSync('userInfo', userInfo);
        that.setData({
          isLogin: true,
          userInfo: userInfo
        });
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
      },
      fail: (err) => {
        console.error('登录失败', err);
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        });
      }
    });
  },

  // 退出登录
  logout: function() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除本地存储的用户信息
          wx.removeStorageSync('userInfo');
          this.setData({
            isLogin: false,
            userInfo: null
          });
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          });
        }
      }
    });
  },

  // 导航到历史订单页面
  navigateToOrderHistory: function() {
    if (!this.data.isLogin) {
      this.showLoginTip();
      return;
    }
    wx.navigateTo({
      url: '/pages/order/order'
    });
  },

  // 导航到我的收藏页面
  navigateToFavorites: function() {
    if (!this.data.isLogin) {
      this.showLoginTip();
      return;
    }
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 导航到收货地址页面
  navigateToAddress: function() {
    if (!this.data.isLogin) {
      this.showLoginTip();
      return;
    }
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 导航到设置页面
  navigateToSettings: function() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 联系客服
  contactService: function() {
    wx.makePhoneCall({
      phoneNumber: '400-123-4567',
      fail: () => {
        wx.showToast({
          title: '拨打失败',
          icon: 'none'
        });
      }
    });
  },

  // 关于我们
  aboutUs: function() {
    wx.showModal({
      title: '关于我们',
      content: '美味餐厅是一家专注于提供高品质美食的餐厅，我们致力于为顾客提供最好的用餐体验。',
      showCancel: false
    });
  },

  // 显示登录提示
  showLoginTip: function() {
    wx.showModal({
      title: '提示',
      content: '请先登录',
      confirmText: '去登录',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          this.login();
        }
      }
    });
  }
});