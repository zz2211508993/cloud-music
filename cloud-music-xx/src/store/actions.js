export default {
    singerItemClick(content,payload){
        return new Promise((resolve, reject)=>{
            content.commit('addDate',payload)
            resolve(payload)
        })
    }
}