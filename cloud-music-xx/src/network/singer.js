import {request} from "./network";

export function singer(params){
    return request({
        url:'artist/list',
        params:{
            type:params.type,
            area:params.area,
            limit:params.limit,
            offset:params.offset,
            initial:params.initial,
        },
    })
}