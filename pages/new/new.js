// pages/new/new.js
const app = getApp()
const date = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    countId:'',
    title: '',
    sort:'',
    Idate:'',
    reason:'',
    money:0
  },

 /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid,
      })
    }
  },
  /*
    *input事件
    */
  inputtitle(e){
    this.setData({
      title:e.detail.value
    })
  },inputsort(e){
    this.setData({
      sort:e.detail.value
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      Idate:date.getFullYear
    })
  },inputreason(e){
    this.setData({
      reason:e.detail.value
    })
  },inputmoney(e){
    this.setData({
      money:e.detail.value
    })
  },
  onAdd: function () {
    wx.cloud.init({
      env: 'man-5gx3zren715a5c84',
      traceUser:true
    })
    const db = wx.cloud.database()
    db.collection('bill').add({
      data: {
        title:this.data.title,
        sort:this.data.sort,
        date:this.data.date,
        reason:this.data.reason,
        money:this.data.money
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          countId: res._id,
          title,
          sort,
          date,
          reason,
          money
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  }
})