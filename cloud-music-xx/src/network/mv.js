import {request} from "./network";

export function mv(params){
    return request({
        url:'mv/all',
        params:{
            area:params.area,
            type:params.type,
            order:params.order,
            limit:params.limit,
            offset:params.offset,
            total:params.total,
            num:params.num,
        }
    })
}