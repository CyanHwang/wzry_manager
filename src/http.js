import Vue from 'vue'
import axios from 'axios'

 const http = axios.create({
     baseURL:'http://localhost:3000/admin/api/'
 })

 http.interceptors.request.use(config=> {
     config.headers.Authorization = 'Bearer '+ localStorage.token
    return config;
  }, error=> {
    return Promise.reject(error);
  });

 http.interceptors.response.use(response=>{
     return response
 },error=>{
     if(error.response.data.message){
        Vue.prototype.$message({
            type:'error',
            message:error.response.data.message
        })
     }
 })

 export default http;