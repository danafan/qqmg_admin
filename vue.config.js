module.exports = {	
	devServer: {
		proxy: {
			'/admin': {
				// target: 'http://cs.gxk8090.com',
				target: 'http://114.67.110.57',
				ws: true,
				changOlrigin: true,		//是否跨域
			}
		}
	},
	assetsDir: "admin"
}