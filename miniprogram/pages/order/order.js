// order.js
const app = getApp()

Page({
  data: {
    currentStatus: 'all',
    orders: []
  },

  onLoad: function() {
    // 页面加载时获取订单数据
    this.fetchOrders(this.data.currentStatus);
  },

  onShow: function() {
    // 每次页面显示时刷新订单数据
    this.fetchOrders(this.data.currentStatus);
  },

  // 切换订单状态标签
  switchStatus: function(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      currentStatus: status
    });
    
    this.fetchOrders(status);
  },

  // 获取订单数据
  fetchOrders: function(status) {
    // 实际项目中应该从服务器获取数据
    // wx.request({
    //   url: `${app.globalData.baseUrl}/api/orders?status=${status}`,
    //   success: res => {
    //     this.setData({
    //       orders: res.data
    //     });
    //   }
    // })
    
    // 模拟订单数据
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const mockOrders = [
      {
        id: 1,
        orderNumber: 'O2023112001',
        status: 'pending',
        tableNumber: '8',
        createTime: now.toLocaleString(),
        totalPrice: '88.00',
        dishes: [
          { id: 1, name: '红烧肉', count: 1, price: '38.00' },
          { id: 2, name: '宫保鸡丁', count: 1, price: '32.00' },
          { id: 5, name: '冰镇柠檬水', count: 2, price: '9.00' }
        ]
      },
      {
        id: 2,
        orderNumber: 'O2023112002',
        status: 'processing',
        tableNumber: '5',
        createTime: now.toLocaleString(),
        totalPrice: '108.00',
        dishes: [
          { id: 1, name: '红烧肉', count: 1, price: '38.00' },
          { id: 4, name: '水煮鱼', count: 1, price: '48.00' },
          { id: 3, name: '早餐套餐', count: 1, price: '22.00' }
        ]
      },
      {
        id: 3,
        orderNumber: 'O2023111901',
        status: 'completed',
        tableNumber: '3',
        createTime: yesterday.toLocaleString(),
        completeTime: new Date(yesterday.getTime() + 30 * 60 * 1000).toLocaleString(),
        totalPrice: '70.00',
        dishes: [
          { id: 2, name: '宫保鸡丁', count: 2, price: '32.00' },
          { id: 5, name: '冰镇柠檬水', count: 1, price: '8.00' }
        ]
      }
    ];
    
    // 根据状态筛选订单
    let filteredOrders = mockOrders;
    if (status !== 'all') {
      filteredOrders = mockOrders.filter(order => order.status === status);
    }
    
    this.setData({
      orders: filteredOrders
    });
  },

  // 支付订单
  payOrder: function(e) {
    const orderId = e.currentTarget.dataset.orderId;
    
    // 实际项目中应该调用微信支付接口
    // wx.requestPayment({
    //   timeStamp: '',
    //   nonceStr: '',
    //   package: '',
    //   signType: 'MD5',
    //   paySign: '',
    //   success: res => {
    //     // 支付成功后更新订单状态
    //     this.updateOrderStatus(orderId, 'processing');
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       title: '支付失败',
    //       icon: 'none'
    //     });
    //   }
    // })
    
    // 模拟支付过程
    wx.showLoading({
      title: '支付中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      // 更新订单状态为备餐中
      this.updateOrderStatus(orderId, 'processing');
      
      wx.showToast({
        title: '支付成功',
        icon: 'success'
      });
    }, 1500);
  },

  // 催单
  urgeOrder: function(e) {
    const orderId = e.currentTarget.dataset.orderId;
    
    // 实际项目中应该发送催单请求到服务器
    // wx.request({
    //   url: `${app.globalData.baseUrl}/api/orders/${orderId}/urge`,
    //   method: 'POST',
    //   success: res => {
    //     wx.showToast({
    //       title: '催单成功',
    //       icon: 'success'
    //     });
    //   }
    // })
    
    // 模拟催单成功
    wx.showToast({
      title: '催单成功，请耐心等待',
      icon: 'none',
      duration: 2000
    });
  },

  // 再来一单
  reorder: function(e) {
    const order = e.currentTarget.dataset.order;
    
    // 将订单中的菜品添加到购物车
    app.clearCart(); // 先清空购物车
    
    order.dishes.forEach(dish => {
      for (let i = 0; i < dish.count; i++) {
        app.addToCart({
          id: dish.id,
          name: dish.name,
          price: parseFloat(dish.price),
          image: `/images/dishes/dish${dish.id}.jpg` // 假设图片路径
        });
      }
    });
    
    // 跳转到点餐页面
    wx.switchTab({
      url: '/pages/menu/menu'
    });
  },

  // 更新订单状态
  updateOrderStatus: function(orderId, newStatus) {
    // 实际项目中应该发送请求到服务器更新状态
    // wx.request({
    //   url: `${app.globalData.baseUrl}/api/orders/${orderId}`,
    //   method: 'PUT',
    //   data: { status: newStatus },
    //   success: res => {
    //     this.fetchOrders(this.data.currentStatus);
    //   }
    // })
    
    // 模拟更新状态
    const orders = this.data.orders.map(order => {
      if (order.id === orderId) {
        order.status = newStatus;
        if (newStatus === 'completed') {
          order.completeTime = new Date().toLocaleString();
        }
      }
      return order;
    });
    
    this.setData({
      orders: orders
    });
  },

  // 跳转到点餐页面
  goToMenu: function() {
    wx.switchTab({
      url: '/pages/menu/menu'
    });
  }
});