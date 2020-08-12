import axios from 'axios'
import { Loading, Message } from 'element-ui';

let baseURL = process.env.apiUrl;
const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    withCredentials: true
});

var loadingInstance;
// 拦截器
instance.interceptors.request.use( config => {
    loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    return config;
}, error =>{
    return Promise.reject(error);
});

instance.interceptors.response.use( res => {
    loadingInstance.close();
    if (res.data.error == 0) {
        return res.data;
    } else {
        Message.error(res.data.msg)
        return false
    }
    
}, error => {
    loadingInstance.close();
    return Promise.reject(error);
});

export default instance;