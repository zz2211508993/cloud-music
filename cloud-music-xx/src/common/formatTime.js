
export function FormatTime(times) {
    let t;
    if (times > -1) {
        var hour = Math.floor(times / 3600);
        var min = Math.floor(times / 60) % 60;
        var sec = times % 60;
        t = hour < 10 ? '0' + hour +':' : hour + ':'
        t = min < 10 ? '0' + min +':' : min + ':'
        //不让sec等于字符串，因为那样就无法使用toFixed了
        if(sec < 10){
            t +=  + '0';
        }
        t += sec.toFixed(2);
    }
    //截取0-5 不包含:
    t = t.substring(0, t.length -3);
    return t;
}
export function setTimes(timer){
    let time =new Date(timer);
    let year = time.getFullYear();
    let mon = time.getMonth() +1;
    let day = time.getDay();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    return {
        secs:sec,
        mins:min,
        hours:hour,
        days:day,
        mons:mon,
        year:year,
    }
}