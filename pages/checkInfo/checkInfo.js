const app = getApp();
Page({

    data: {
        idCodes: '',
        images: [],
        answers: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        remark: '', //新增部分19年3月1号
        checkMethod: ['车辆外检', '路况外检'],
        checkMethodIndex: 0, //新增至此
        uuid: '',
        array: [{
                id: '0',
                firstTitle: '一、仪容仪表',
                message: [{
                    id: '0',
                    secondTitle: '1.整洁、端庄、得体，穿工作服并扣好衣扣',
                    statusYes: '1.1.1',
                    statusNo: '1.1.0'
                }, {
                    id: '1',
                    secondTitle: '2.不穿露趾凉鞋、拖鞋、高跟鞋，不留长胡须',
                    statusYes: '1.2.1',
                    statusNo: '1.2.0'
                }]
            },
            {
                id: '1',
                firstTitle: '二、外观',
                message: [{
                    id: '2',
                    secondTitle: '1.车窗不得张贴深色太阳膜，不准使用毛巾、报纸等物品遮阳，后窗张贴公益广告',
                    statusYes: '2.1.1',
                    statusNo: '2.1.0'
                }, {
                    id: '3',
                    secondTitle: '2.外观洁净，完好有效，牌照清晰，中网不松动，无大于5厘米划痕和2平方厘米掉漆、凹凸，外饰件间隙不超过5毫米',
                    statusYes: '2.2.1',
                    statusNo: '2.2.0'
                }, {
                    id: '4',
                    secondTitle: '3.雨过2小时后无泥垢',
                    statusYes: '2.3.1',
                    statusNo: '2.3.0'
                }, {
                    id: '5',
                    secondTitle: '4.四门内外把手，车窗能正常使用',
                    statusYes: '2.4.1',
                    statusNo: '2.4.0'
                }, {
                    id: '6',
                    secondTitle: '5.前发动机盖，后备箱盖能正常开启，后备箱内整洁，后备箱垫干净不破裂',
                    statusYes: '2.5.1',
                    statusNo: '2.5.0'
                }]
            }, {
                id: '2',
                firstTitle: '三、内饰',
                message: [{
                    id: '7',
                    secondTitle: '1.车内无杂物、小广告、垃圾、异味',
                    statusYes: '3.1.1',
                    statusNo: '3.1.0'
                }, {
                    id: '8',
                    secondTitle: '2.脚垫、坐垫套整洁，无脱落，完好不破裂',
                    statusYes: '3.2.1',
                    statusNo: '3.2.0'
                }]
            }, {
                id: '3',
                firstTitle: '四、营运设施、标识',
                message: [{
                    id: '9',
                    secondTitle: '1.发票无拖挂',
                    statusYes: '4.1.1',
                    statusNo: '4.1.0'
                }, {
                    id: '10',
                    secondTitle: '2.内外摄像头无遮挡',
                    statusYes: '4.2.1',
                    statusNo: '4.2.0'
                }, {
                    id: '11',
                    secondTitle: '3.顶灯、终端GPS信号正常',
                    statusYes: '4.3.1',
                    statusNo: '4.3.0'
                }, {
                    id: '12',
                    secondTitle: '4.终端不得连接数据线，显示当班电子服务监督卡界面',
                    statusYes: '4.4.1',
                    statusNo: '4.4.0'
                }, {
                    id: '13',
                    secondTitle: '5.内外摄像头无遮挡',
                    statusYes: '4.5.1',
                    statusNo: '4.5.0'
                }]
            }, {
                id: '4',
                firstTitle: '五、安全技术状况',
                message: [{
                    id: '14',
                    secondTitle: '1.灭火器合格',
                    statusYes: '5.1.1',
                    statusNo: '5.1.0'
                }, {
                    id: '15',
                    secondTitle: '2.轮胎无明显磨损、鼓包、缺气现象，备胎、轮罩无缺损、污垢',
                    statusYes: '5.2.1',
                    statusNo: '5.2.0'
                }, {
                    id: '16',
                    secondTitle: '3.钢瓶固定可靠，无晃动',
                    statusYes: '5.3.1',
                    statusNo: '5.3.0'
                }]
            }
        ]
    },

    radioChange(e) {
        var key = parseInt(e.detail.value.split("-")[0]);
        var value = parseInt(e.detail.value.split("-")[1]);
        this.data.answers[key] = value;
    },

    //车辆外检和路况外检的切换
    checkMethodChange: function(e) {
        wx.setStorageSync('checkMethodIndex', e.detail.value);
        this.setData({
            checkMethodIndex: e.detail.value
        })
    },
    //获取备注信息内容
    getMessage: function(e) {
        var logs = e.detail.value;
        this.setData({
            remark: e.detail.value
        });
    },

    //拍照模块
    imgDelete1: function(e) {
        let that = this;
        let index = e.currentTarget.dataset.deindex;
        let images = this.data.images;
        images.splice(index, 1)
        that.setData({
            images: images
        });
    },

    // 上传图片 
    addPic1: function(e) {
        var that = this;
        if (that.data.images.length >= 3) {
            wx.showToast({
                title: '上传图片不得超过三张',
                icon: 'none',
                duration: 2000
            });
            return false;
        }
        //console.log(n)
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有'album',
            success: function(res) {
                if (that.data.images.length < 3) {
                    that.data.images.push(res.tempFilePaths);
                    that.setData({
                        images: that.data.images
                    });
                }
            }
        });
    },

    submitInfo: function() {
        if (this.data.images.length > 0) {
            this.uploadPhoto();
        }
        this.uploadData();
    },

    uploadData: function() {
        var that = this;
        if (that.data.idCodes==null || that.data.idCodes=='') {
            wx.showToast({
                title: "驾驶员信息扫码失败",
                icon: 'none',
                duration: 2000
            });
            wx.navigateTo({
                url: '../login/login',
            });
            return false;
        }
        if (that.data.uuid == null || that.data.uuid == '') {
            wx.showToast({
                title: "请重新登录",
                icon: 'none',
                duration: 2000
            });
            return false;
        }
        wx.showLoading({
            title: '正在上传'+this.data.checkMethod[this.data.checkMethodIndex]+'结果',
            mask: true
        });
        
        var data = {
            "idCard": that.data.idCodes,
            "answers": that.data.answers,
            "description": that.data.remark,
            "toSpeciton": that.data.checkMethod[that.data.checkMethodIndex]
        };
        var paramMap = {
            'APPLICATION': 'app63925646350352384',
            'INTERFACE_TYPE': 'DATA_UPLOAD',
          "APP_ID": "wx6826d44ced7e9d8a",
            "PAGE_NAME": "checkInfo",
            "UUID": that.data.uuid,
            "DATA": data
        };
        wx.request({
            url: app.globalData.SERVER_URL + 'data_upload',
            data: {
                "paramMap": JSON.stringify(paramMap)
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: (res) => {
                var result = res.data;
                if (result.flag) {
                    wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 3000
                    });
                    //清空数据
                    that.setData({
                        'uuid': ''
                    })
                    //跳转到登录扫码页
                  wx.navigateBack({
                        url: '../login/login',
                    })
                } else {
                    wx.showToast({
                        title: "失败" + res.data.message,
                        icon: 'none',
                        duration: 2000
                    });
                }
                
            },
            fail: (res) => {
                wx.showToast({
                    title: '数据上传失败',
                    icon: 'none',
                })
            }
        });

    },

    //上传照片
    uploadPhoto: function() {
        var that = this;
        if (that.data.uuid == null || that.data.uuid == '') {
            wx.showToast({
                title: "请重新登录",
                icon: 'none',
                duration: 2000
            });
            return false;
        }
        var paramMap = {
            'APPLICATION': 'app63925646350352384',
            'INTERFACE_TYPE': 'FILE_UPLOAD',
            'APP_ID': 'wx6826d44ced7e9d8a',
            'PAGE_NAME': 'checkInfo',
            'UUID' : that.data.uuid
        };
        for (var i = 0; i < that.data.images.length; i++) {
            wx.showLoading({
                title: '正在上传第' + (i+1) + '张图片',
                mask: true
            });
            var path = that.data.images[i] + "";
            wx.uploadFile({
                url: app.globalData.SERVER_URL + 'file_upload',
                filePath: path,
                name: 'file',
                formData: {
                    'paramMap': JSON.stringify(paramMap)
                },
                success: function(res) {
                    var result = JSON.parse(res.data);
                    if (!result.flag) {
                        wx.showToast({
                            title: "失败" + result.message,
                            icon: 'none',
                            duration: 2000
                        });
                    }
                },
                fail: function(res) {
                    console.log(res);
                    wx.showToast({
                        title: "图片上传失败",
                        icon: 'none',
                        duration: 2000
                    });
                }
            });
        }
        wx.hideLoading();
    },

    onLoad: function(options) {
        this.setData({
            idCodes: options.id,
            uuid: this.guid().replace(/\-/g, '')
        });
        var checkMethodIndex = wx.getStorageSync('checkMethodIndex');

        if (checkMethodIndex != null && checkMethodIndex != '') {
            this.setData({
                checkMethodIndex: checkMethodIndex
            });
        }
    },

    guid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
})