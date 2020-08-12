import instance from './index';

const preUrlPath = '';

const articles = {
    ps: ['get, /articles'],
    $http: params => {
        return instance.get(`${preUrlPath}/articles`, {params})
    }
};
const articleDetaile = {
    ps: ['get, /articleDetaile'],
    $http: params => {
        return instance.get(`${preUrlPath}/articleDetaile`, {params})
    }
};

export {
    articles,
    articleDetaile
}