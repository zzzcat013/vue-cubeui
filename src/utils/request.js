import axios from 'axios'
//import router from '../route'

import { getToken } from '../utils/auth'
import Config from '../config'

// 创建axios实例
const service = axios.create({
    baseURL: this.$store.state.baseURL,    //process.env.BASE_API, // api 的 base_url
    timeout: Config.timeout // 请求超时时间
})


// request拦截器
service.interceptors.request.use(
    config => {
        alert("interceptors request")
        if (getToken()) {
            config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        config.headers['Content-Type'] = 'application/json'
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        alert("interceptors response")
        const code = response.status
        if (code < 200 || code > 300) {
            alert("request ok")
/*            const toast = this.$createToast({
                txt: response.data.message,
                type: 'correct'
            })
            toast.show()*/
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        let code = 0
        try {
            code = error.response.data.status
        } catch (e) {
            if (error.toString().indexOf('Error: timeout') !== -1) {
/*                const toast = this.$createToast({
                    txt: '网络请求超时',
                    type: 'error',
                    time: 2500
                })
                toast.show()*/
                return Promise.reject(error)
            }
            if (error.toString().indexOf('Error: Network Error') !== -1) {
/*                const toast = this.$createToast({
                    txt: '网络请求错误',
                    type: 'error',
                    time: 2500
                })
                toast.show()*/
                return Promise.reject(error)
            }
        }
        if (code === 401) {
/*            this.$createDialog({
                type: 'confirm',
                icon: 'cubeic-alert',
                title: '系统提示',
                content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
                confirmBtn: {
                    text: '重新登录',
                    active: true,
                    disabled: false,
                    href: 'javascript:;'
                },
                cancelBtn: {
                    text: '取消',
                    active: false,
                    disabled: false,
                    href: 'javascript:;'
                },
                onConfirm: () => {
                    store.dispatch('LogOut').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                },
                onCancel: () => {
                    this.$createToast({
                        type: 'warn',
                        time: 1000,
                        txt: '点击取消按钮'
                    }).show()
                }
            }).show()*/

        } else if (code === 403) {
            //router.push({ path: '/401' })
        } else {
/*            const errorMsg = error.response.data.message
            if (errorMsg !== undefined) {
                Notification.error({
                    title: errorMsg,
                    duration: 2500
                })
            }*/
        }
        return Promise.reject(error)
    }
)
export default service
