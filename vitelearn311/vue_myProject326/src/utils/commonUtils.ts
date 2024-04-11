import axios from "axios";

const baseIP = import.meta.env.BASE_IP;
const serverPort=import.meta.env.SERVER_PORT

// axios请求的前缀，包括服务器地址和端口号
export let requestPrefix=baseIP+":"+serverPort+"/"

//获取本地components下图片
export function getImage(imgSrc: any) {
    // import.meta.url表示当前模块的url
    // let url = new URL(imgSrc, import.meta.url).href
    let url = `${imgSrc}`
    console.log("@@url:", url)
    return url;
}
