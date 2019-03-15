Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  sweepIdCode: function() {
    wx.scanCode({
      success: (res) => {
          var idCode = res.result;
          var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          if (!regIdNo.test(idCode)) {
              wx.showToast({
                  title: '请扫描正确的身份证号',
                  icon: 'none',
                  duration: 2000
              });
              return false;
          } 
          wx.navigateTo({
            url: '../checkInfo/checkInfo?id=' + idCode
          })
      }
    })

  }
})