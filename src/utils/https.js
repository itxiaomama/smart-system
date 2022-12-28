import axios from "axios"
import { message } from 'ant-design-vue'
import store from '@/store'
import router from "@/router";
import storage from '../utils/storage'

// 添加一个请求拦截器，回调函数会在发出请求时执行
// config:请求配置
axios.interceptors.request.use(config => {
    // Do something before request is sent
    // console.log(config)
    if (store.state.token) {
        config.headers.Authorization = 'Bearer' + ' ' + store.state.token;
    }
    // let token = window.sessionStorage.getItem("token") ? window.sessionStorage.getItem("token") : "";
    // // config.headers.token = token;
    // config.headers.Authorization = 'Bearer' + ' ' + token;
    return config;
}, error => {
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
            store.commit('del_token');
            // storage.removeAll();
            message.error("登录状态过期，请重新登录")
            router.replace({
                path: '/login'
            })
            break;
        // case 400:
        //     store.commit('del_token');
        //     // storage.removeAll();
        //     message.error("请先登录")
        //     router.replace({
        //         path: '/login'
        //     })
        //     break;
        case 422:
            message.error(error.response.data.message);
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
            method: 'patch',
            url,
            params
        }).then((data) => {
            resolve(data)
        }).catch(err => {
            reject(err);
        })
    })
}
function deleteApi(url, params = {}) {

    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            url,
            params
        }).then((data) => {
            resolve(data)
        }).catch(err => {
            reject(err);
        })
    })
}

export { get, post, patch, deleteApi }

