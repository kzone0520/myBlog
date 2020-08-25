import instance from './index';

const preUrlPath = '';

const register = {
    ps: ['post, /register'],
    $http: params => {
        return instance.post(`${preUrlPath}/register`, params)
    }
};
const verify = {
    ps: ['get, /verify'],
    $http: params => {
        return instance.get(`${preUrlPath}/verify`, {params})
    }
};
const login = {
    ps: ['post, /login'],
    $http: params => {
        return instance.post(`${preUrlPath}/login`, params)
    }
};
const upload = {
    ps: ['post, /upload'],
    $http: params => {
        return instance.post(`${preUrlPath}/upload`, params)
    }
}
const loginOut = {
    ps: ['get, /loginOut'],
    $http: params => {
        return instance.get(`${preUrlPath}/loginOut`, {params})
    }
};
export {
    register,
    verify,
    login,
    upload,
    loginOut
}