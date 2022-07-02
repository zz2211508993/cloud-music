import {request} from "./network";

export function song(params){
    return request({
        url:'top/song',
        params:{
            type:params.type,
        }
    })
}

