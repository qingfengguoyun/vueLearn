import axios ,{type AxiosResponse} from 'axios';
import { requestPrefix } from './commonUtils';



//封装axios的post方法，主要自动用来添加token
export async function postRequest<T>(url:string,params:any):Promise<AxiosResponse<T>> {

    let token=sessionStorage.getItem('Authorization') as String || ""
    try {
        let headers={
            'Content-Type': 'application/json',
            'Authorization': `${token}`
            // 'token': `${token}`
            // 'token': token
        }
        const response = await axios.post(requestPrefix+url, params,{headers});
        return response;
    } catch (error) {
        // 处理错误
        console.error('Error in postRequest:', error);
        throw error;
    }
}


//封装axios的get方法，主要自动用来添加token
export async function getRequest<T>(url: string, params?: any): Promise<AxiosResponse<T, any>> {
    try {
        // 从sessionStorage中获取token
        const token = sessionStorage.getItem('Authorization');

        // 设置请求头部信息，包括token
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${token}`, 
        };

        const response = await axios.get(requestPrefix+url, { params, headers });
        return response;
    } catch (error) {
        // 处理错误
        console.error('Error in getRequest:', error);
        throw error;
    }

    // const response = await getRequest('https://example.com/api/data', { page: 1, limit: 10 });
}


//文件下载方法
export async function fileDownLoadRequest<T>(url: string, params?: any): Promise<AxiosResponse<T, any>> {
    try {
        // 从sessionStorage中获取token
        const token = sessionStorage.getItem('Authorization');

        // 设置请求头部信息，包括token
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${token}`, 
        };
        // 指定文件返回类型为blob
        const responseType="blob";

        const response = await axios.get(requestPrefix+url, { params, headers,responseType });
        return response;
    } catch (error) {
        // 处理错误
        console.error('Error in getRequest:', error);
        throw error;
    }

    // const response = await getRequest('https://example.com/api/data', { page: 1, limit: 10 });
}

//封装axios的post方法，主要自动用来添加token
export async function fileUploadRequest<T>(params:any):Promise<AxiosResponse<T>> {

    let token=sessionStorage.getItem('Authorization') as String || ""
    try {
        let headers={
            'Content-Type': 'multipart/form-data',
            'Authorization': `${token}`
            // 'token': `${token}`
            // 'token': token
        }
        const response = await axios.post(requestPrefix+"/api/file/uploadByBatch", params,{headers});
        return response;
    } catch (error) {
        // 处理错误
        console.error('Error in imageUploadRequest:', error);
        throw error;
    }
}

