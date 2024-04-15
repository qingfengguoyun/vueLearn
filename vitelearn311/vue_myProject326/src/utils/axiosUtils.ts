import axios ,{type AxiosResponse} from 'axios';
import { requestPrefix } from './commonUtils';

//封装axios的post方法，主要自动用来添加token
export async function postRequest(url:string,params:any):Promise<AxiosResponse> {

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
export async function getRequest(url: string, params?: any): Promise<AxiosResponse<any, any>> {
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

