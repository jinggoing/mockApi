// 使用 Mock
var Mock = require('mockjs')
//mock使用参考 https://github.com/nuysoft/Mock/wiki/Basic 
var Random =Mock.Random;


module.exports = {
    userInfo(){
        //设置返回成功概率 3/10
        var code = Random.boolean(7, 3, true)? 1:0; 
        if(code===0){
            return {
                code:code,
                msg:'error'
            }
        }       
        return Mock.mock({
            code: code,    
			userId: Random.string( 15 ), 
			userName: Random.cname(), 
			userType: 104
		})
    },
    login(){
        return Mock.mock({ 
            code: 1,   
			token: Random.string( 15 )
		})
    }
}