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
export {
    register,
    verify,
    login
}