import {request} from "./network";

export function banner(){
    return request({
        url:'/banner'
    })
}
export function personalized(params,path){
    return request({
        url:'/personalized/'+path,
        params:{
            limit:params.limit,
        }
    })
}

