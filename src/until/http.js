import axios from 'axios'
import router from '../router/index'
let instance = axios.create({
    timeout: 10000,
    baseURL: '/api',
})
instance.interceptors.request.use(req => {
    let token = sessionStorage.getItem('token')
    token && (req.headers['Token'] = `${token}`)
    return req
}, error => Promise.reject(error))
instance.interceptors.response.use(response => {
    response.headers.token && sessionStorage.setItem('token', response.headers.token)
    return response
}, error => {
    let _response = error.response
    let repoInfo = JSON.parse(sessionStorage.getItem('repoInfo'))
    let path = repoInfo.repo_id ? `/sign/${repoInfo.platform}/${repoInfo.org_id}/${repoInfo.repo_id}` : `/sign/${repoInfo.platform}/${repoInfo.org_id}`
    switch (_response.status) {
        case 401:
        case 403:
            sessionStorage.clear();
            alert('token expired, please login again')
            return router.replace({
                path: path,
            })
    }
    return Promise.reject(error.response.data)
})
export default instance