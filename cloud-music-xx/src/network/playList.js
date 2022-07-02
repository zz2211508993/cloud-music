import {request} from "./network";

export function playList(path){
    return request({
        url:'playlist/'+path,
    })
}
export function topPlayList(params={},path=''){
    return request({
        url:'top/playlist'+path,
        params:{
            offset:params.offset,
            limit:params.limit,
            cat:params.cat,
        }
    })
}