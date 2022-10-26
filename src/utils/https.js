import axios from "axios"
import { Message } from 'element-ui'

// 添加一个请求拦截器，回调函数会在发出请求时执行
// config:请求配置
axios.interceptors.request.use(config => {
    // Do something before request is sent

    // console.log(config)
    let token = window.sessionStorage.getItem("token") ? window.sessionStorage.getItem("token") : "";
    // config.headers.token = token;
    config.headers.Authorization = 'Bearer' + token;
    return config;
}, error => {
    console.log('error>>>>>>>>', error)
    // Do something with request error
    return Promise.reject(error);
});


// 响应拦截器

axios.interceptors.response.use(response => {
    // Do something before response is sent
    return response.data;
}, error => {

    switch (error.response.status) {
        case 401:
            Message.error("登录状态过期，请重新登录")
            setTimeout(() => {
                window.location.href = '/login'
                // const that = this;
                // that.$router.push({ path: "/login" });
            }, 2000)
            break;
        case 400:
            break;
        default:
            break;
    }
    // Do something with response error
    return Promise.reject(error);
});


function get(url, params = {}) {

    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url,
            params
        }).then((data) => {
            resolve(data)
        }).catch(err => {
            reject(err);
        })
    })
}

function post(url, data = {}) {

    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url,
            data
        }).then((data) => {
            resolve(data)
        }).catch(err => {
            reject(err);
        })
    })
}
function patch(url, params = {}) {

    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url,
            params
        }).then((data) => {
            resolve(data)
        }).catch(err => {
            reject(err);
        })
    })
}

export { get, post, patch }

