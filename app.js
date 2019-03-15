//app.js
const updateManager = wx.getUpdateManager();
App({
    onLaunch: function () {
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            // console.log(res.hasUpdate);
            if (res.hasUpdate) {
                wx.showLoading({
                    title: '请稍后...',
                });

                updateManager.onUpdateReady(function () {
                    updateManager.applyUpdate();
                    wx.showToast({
                        title: '下载成功',
                        icon: 'success',
                        duration: 1000
                    });
                });

                updateManager.onUpdateFailed(function () {
                    // 新版本下载失败
                    wx.showToast({
                        title: '下载失败',
                        icon: 'none',
                        duration: 1000
                    });
                });
            }

        })
    },
    globalData: {
        SERVER_URL: "https://www.jachrcx.com/miniProgram/"
        // SERVER_URL: "http://localhost:8080/"
    }

})