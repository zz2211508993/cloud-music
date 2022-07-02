import axios from 'axios';
import axiosRetry from "axios-retry";

export function request(options){
    return new Promise((resolve, reject) => {
        //1.创建实例
        const instance = axios.create({
            baseURL:'https://lianghj.top:3000',
            retry: 10,
            retryDelay: 1000,
            timeout:10000,
        });
        //2.拦截发送出去之后还没接收到的
        instance.interceptors.response.use((res)=>{
            return res.data;
        },error => {

            return error
        })
        //4.通过实例发送网络请求
        instance(options).then(res=>{
            //执行传进来的那个
            resolve(res);
        },).catch(error=>{
            reject(error);
        })
    })

}