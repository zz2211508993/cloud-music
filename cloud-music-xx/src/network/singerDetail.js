import {request} from "./network";

export function artist(url,params){
    return request({
        url:'artist/'+url,
        params:{
            id:params.id,
        }
    })
}

//相似歌手信息
export function simiArtist(params){
    return request({
        url:'simi/artist',
        params:{
            id:params.id,
        }
    })
}

//专辑信息
export function album(params){
    return request({
        url:'album',
        params:{
            id:params.id,
        }
    })
}