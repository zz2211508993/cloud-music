import {request} from "./network";

export function search(params){
    return request({
        url:'search',
        params:{
            keywords:params.keywords,
            limit:params.limit,
            offset:params.offset,
            type:params.type,
        }
    })
}