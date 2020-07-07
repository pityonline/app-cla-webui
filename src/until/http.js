//封装axios
import axios from 'axios'
import router from '../router/index'
//封装axios为了防止服务器报401错误

let instance = axios.create({
    timeout:10000,//请求时间超过10000ms就中断
    baseURL:'/api',
})
//设置post请求头
// instance.defaults.headers.post['Content-type'] = 'application'//判断是否需要json格式
//请求拦截，每次发起请求之前获取token
//如果有token，将token保存在请求的header上，给后台验证
instance.interceptors.request.use(req=>{
    //获取token的方式，一从vuex，二从本地
    let token = sessionStorage.getItem('token')
    token && (req.headers['Authorization']=`Bearer ${token}`)
    /*if(token !==undefined){
        //console.log(token)
        config.headers['Authorization']=`Bearer ${token}`
    }*/
    return req
},error => Promise.reject(error))
//请求后
instance.interceptors.response.use(response=>{
    //封装时与后台沟通，获取token的方式，保存在本地或者vuex中
    response.data.token &&sessionStorage.setItem('token',response.data.token)
    /* if(response.data.token){
         localStorage.setItem('token',response.data.loginToken)
     }*/
    return response
},error => {
    let _response = error.response
    switch (_response.status) {
        case 401:
            sessionStorage.removeItem('userName')
            sessionStorage.removeItem('userId')
            sessionStorage.removeItem('loginTime')
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('power')
            alert('身份过期，请重新登录')
            return router.push('/login')
        /*return router.replace({
            //跳转到login，此时login不会被记录
            path:'login',
            query:{redirect:router.currentRoute.fullPath}//将跳转的路由路径作为参数，登录成功后跳转到该路由
        })*/
    }
    return Promise.reject(error.response.data)
})
export default instance