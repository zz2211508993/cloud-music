import {request} from "./network";

export function mvUrl(params){
    return request({
        url:'/mv/url',
        params:{
            id:params.id,
        }
    })
}

export function MvDetail(params){
    return request({
        url:'/mv/detail',
        params:{
            mvid:params.mvid,
        }
    })
}

export function SimiMV(params){
    return request({
        url:'/simi/mv',
        params:{
            mvid:params.mvid,
        }
    })
}

export function CommentMv(params){
    return request({
        url:'/comment/mv',
        params:{
            id:params.id,
            limit:params.limit,
        }
    })
}