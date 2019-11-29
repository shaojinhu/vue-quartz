import axios from "@/axios/api.request.js"

//获取任务列表
export const getJobList = data =>{
    return axios.request({
        url:"job/getJobList",
        method:"post",
        data:data
    })
}

//获得全部的任务类
export const getClassList = () =>{
    return axios.request({
        url:"class/getClassList",
        method:"post",
        data:null
    })
}

//检查是否存在该任务
export const checkJob = data =>{
    return axios.request({
        url:"job/checkJob",
        method:"post",
        data:data
    })
}

//添加任务
export const addJob = data =>{
    return axios.request({
        url:"job/addJob",
        method:"post",
        data:data
    })
}

//触发任务
export const startJob = data =>{
    return axios.request({
        url:"job/startJob",
        method:"post",
        data:data
    })
}

//暂停定时任务
export const stopJob = data =>{
    return axios.request({
        url:"job/stopJob",
        method:"post",
        data:data
    })
}

//恢复任务
export const regainJob = data =>{
    return axios.request({
        url:"job/regainJob",
        method:"post",
        data:data
    })
}

//移除任务
export const removeJob = data =>{
    return axios.request({
        url:"job/removeJob",
        method:"post",
        data:data
    })
}