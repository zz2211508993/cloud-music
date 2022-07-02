import {request} from "./network";

export function lyric(params){
    return request({
        url:'lyric',
        params:{
            id:params.id,
        }
    })
}

