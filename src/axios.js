import axios from "axios"
import Element from 'element-ui'
import store from './store'
import router from './router'
//拦截

axios.defaults.baseURL='http://localhost:8848'

//前置拦截
axios.interceptors.request.use(config => {
    return config
})


//后置拦截
axios.interceptors.response.use(response =>{
    let res = response.data;

    console.log("==============")
    console.log(res)
    console.log("==============")

    if (res.code === 200){
        return response
    }else{
        Element.Message.error("登录失败!", {duration:3*1000})
        return Promise.reject(response.data.msg)
    }
},
    error => {
        console.log(error)

        //展示后端的错误信息
        if (error.response.data){
            error.message = error.response.data.msg
        }

        if (error.response.status === 401){
            store.commit("REMOVE_INFO")
            router.push("/login")
        }
        Element.Message.error(error.message, {duration:3*1000})
        return Promise.reject(error)
    })