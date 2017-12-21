/**
 * Created by jsen on 2017/4/19.
 */
let log4js = require('log4js');
let logger = log4js.getLogger('ServiceClient');

let UserClient = require('../model').userClient;
let Enc = require('../utils/Enc.js')

exports.login = function(_id, password) {
	return UserClient.findOne({_id: _id}).then(obj => {
		if(obj) {
			return Enc.compare(password, obj.password).then(ok => {
				if(ok) {
					UserClient.findOneAndUpdate({_id:_id}, {last_login:Date.now()})
					return {code:0}
				}
				return {code:1, msg:'登入失败'}
			}).catch(e => {
				return {code:1, msg:'处理出错-1'}
			})
		}
	}).catch(e => {
		return {code:1, msg:'处理出错-2'}
	})
}
