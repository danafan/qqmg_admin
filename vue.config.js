module.exports = {	
	devServer: {
		proxy: {
			'/admin': {
				// target: 'http://cs.gxk8090.com',
				target: 'http://localhost:8089',
				ws: true,
				changOlrigin: true,		//是否跨域
			}
		}
	},
	assetsDir: "admin"
}