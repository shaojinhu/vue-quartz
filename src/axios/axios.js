import axios from 'axios'

//const baseURL = process.env.NODE_ENV !== 'production' ? config.baseUrl.dev : config.baseUrl.pro;
//设置axios的baseUrl
const baseURL = "http://localhost:9001";


class HttpRequest {
  constructor(baseUrl = baseURL){
    this.baseUrl = baseUrl;
    this.queue = {};
  }


  //配置config
  getInSideConfig(){
    const config = {
        baseURL:this.baseUrl,
        timeout:50000, //设置axios的超时时间
        headers:{   //设置请求头中的token
          
        }
    };
    return config;
  }

  //配置拦截
  interceptors(instance,url){ //instance是axios的实例, url是请求的地址
    //请求拦截
    instance.interceptors.request.use(config=>{
          if(!Object.keys(this.queue).length){
            //TODO 添加全局的loading
          }
          this.queue[url] = true; // 标记: 确认
          return config;
        },
        error=>{
          return Promise.reject("请求前出现错误,错误是:"+error);
        });

    //响应拦截
    instance.interceptors.response.use(res=>{
          delete this.queue[url];
          return res;
        },
        error=>{
          delete this.queue[url];
          return Promise.reject("请求后出现错误,错误是:"+error);
        });
  }

  //实例化axios
  request(options){
    const instance = axios.create();
    options = Object.assign(this.getInSideConfig(),options);//合并配置
    this.interceptors(instance,options.url);
    return instance(options);
  }
}

export default HttpRequest;
