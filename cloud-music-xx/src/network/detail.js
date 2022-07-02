import {request} from "./network";

//评论
export function comment(params){
    return request({
        url:'comment/playlist',
        params:{
            id:params.id,
            type:params.type,
            limit:params.limit,
            offset:params.offset,
        }
    })
}
//详情
export function detail(params,path){
    return request({
        url:'playlist/'+path,
        params:{
            id:params.id,
            limit:params.limit,
        }
    })
}

export class Detail{
    constructor() {

    }
}

export class playMusic{
    constructor(url,song,lyric) {
        this.url=url;
        this.name=song.name;
        this.artist=song.ar[0].name;
        this.cover=song.al.picUrl;
        this.lrc = lyric;
        this.id=song.id;
    }
}

export function songDetail(params){
    return request({
        url:'song/detail',
        params:{
            ids:params.ids,
        }
    })
}

export function playSong(params){
    return request({
        url:'song/url',
        params:{
            id:params.id,
        }

    })
}



