mitt可以理解为一个第三方存储仓库，传参方式接近“自定义事件传参”

1，首先通过
improt mitt from 'mitt'
export default const emitter=mitt()
创建仓库

在需要使用仓库时 import emitter 即可

2，通过emitter.emit('事件名'，数据)将数据发送到仓库

3，在需要获取数据的组件中，通过emmiter.on('事件名'，(value:any)=>{})获取数据

4，**在使用数据的组件取消挂载时，最好调用onUnMounted( emmiter.off('事件名'))取消对事件的监听