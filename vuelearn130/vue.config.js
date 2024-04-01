const {
	defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		port: 3000, // 启动端口号
		open: false // 启动后是否自动打开网页
	}
})