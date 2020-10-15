/*
 * 酱茄小程序开源版 v1.1.8
 * Author: 酱茄
 * Help document: https://www.jiangqie.com/ky
 * github: https://github.com/longwenjunjie/jiangqie_kafei
 * gitee: https://gitee.com/longwenjunj/jiangqie_kafei
 * License：MIT
 * Copyright ️ 2020 www.jiangqie.com All rights reserved.
 */

const Auth = require('./utils/auth.js');

App({

    appName: 'Maxwell',

    onLaunch: function () {
        Auth.checkSession();
    },
    onLaunch () {
        wx.cloud.init({
          env: 'envid',
          traceUser: true,
        })
        wx.getSystemInfo({
          success: (res) => {
            this.globalData.systeminfo = res
            this.globalData.isIPhoneX = /iphonex/gi.test(res.model.replace(/\s+/, ''))
          },
        })
      },
      globalData: {
        // 是否保持常亮，离开小程序失效
        keepscreenon:false,
        systeminfo: {},
        isIPhoneX: false,
        key: '',//这里替换成个人和风天气注册应用的key   https://console.heweather.com
        weatherIconUrl: 'https://cdn.heweather.com/cond_icon/',
        requestUrl: {
          weather: 'https://free-api.heweather.com/s6/weather',
          hourly: 'https://free-api.heweather.com/s6/weather/hourly',
        },
      },
})


