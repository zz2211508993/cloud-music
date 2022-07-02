import {request} from "./network";

export function artistLeaderBoard(params){
    return request({
        url:'toplist/artist',
        params:{
            type:params.type,
        }
    })
}