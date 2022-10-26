// import axios from "axios";
// import Qs from "qs";
// // import store from '../store/index';

// const request = axios.create({
//   timeout: 200000,
//   transformRequest: [
//     (data, headers) => {
//       headers["token"] = 'token_1111111'
//       if (headers["Content-Type"]) {
//         if (headers["Content-Type"] === "multipart/form-data") {
//           return data;
//         } else if (headers["Content-Type"].includes("application/json")) {
//           return JSON.stringify(data);
//         }
//       }
//       // 对 data 进行任意转换处理
//       return Qs.stringify(data);
//     }
//   ]
// });
// // request拦截器
// request.interceptors.request.use(config => {
//   // 实现返回上一页取消当前未完成的接口请求功能
//   config.cancelToken = new axios.CancelToken(cancel => {
//     // store.commit('pushToken', { cancelToken: cancel });
//   });
//   return config;
// });
// // 响应拦截器
// request.interceptors.response.use(
//   res => res.data,
//   e => {
//     console.log(e, "错误接口");
//     Toast.clear();
//     if (e.message !== "路由跳转取消请求") {
//       Toast.fail("网络开小差了,\n请稍后再试");
//     }
//     return Promise.reject(e);
//   }
// );

// export default request;