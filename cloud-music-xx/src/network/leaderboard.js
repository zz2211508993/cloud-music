import {request} from "./network";

export function leaderboard(path){
    return request({
        url:'toplist/'+path,
    })
}

export function playlist(params){
    return request({
        url:'playlist/detail',
        params:{
            id:params.id,
        }
    })
}