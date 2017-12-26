/**
 * Created by jsen on 2017/4/19.
 */
let log4js = require('log4js');
let logger = log4js.getLogger('ServiceServer');


let UserServer = require('../model').userServer;
let UserClient = require('../model').userClient;
let Enc = require('../utils/Enc.js')
let JWTUtils = require('../utils/JWTUtils.js')

exports.createUser = function(_id, password, name, address) {
	return Enc.Enc(password).then(hash => {
		let date = Date.now()
		return new UserClient({
			_id: _id,
			password: hash,
			name: name,
			address: address,
			register_date: date,
			last_login: date
		}).save().then(ok => {
			if(ok) {
				return {code:0}
			} else {
				return {code:1, msg:'保存用户数据失败'}
			}
		}).catch(e => {
			return {code:1, msg:'用户存在'}
		})
	}).catch(e => {
		return {code:1, msg:'加密密码失败'}
	})
}

exports.resetPassword = function(_id, password) {
	return Enc.Enc(password).then(hash => {
		console.log(_id)
		return UserClient.findOneAndUpdate({_id:_id}, {password:hash}).then(eff => {
			console.log(eff)
			if(eff) {
				return {code:0}
			} else {
				return {code:0, msg:'没有更改'}
			}
		})
	}).catch(e => {
		return {code:1, msg:'加密密码失败'}
	})
}

exports.resetAddress = function(_id, address) {
	return UserClient.findOneAndUpdate({_id:_id}, {address:address}).then(eff => {
		if(eff) {
			return {code:0}
		} else {
			return {code:0, msg:'没有更改'}
		}
	}).catch(e => {
		return {code:1, msg:'更新用户失败'}
	})
}


exports.login = function(_id, password) {
	return UserServer.findOne({_id: _id}).then(obj => {
		if(obj) {
			return Enc.compare(password, obj.password).then(ok => {
				if(ok) {
					UserServer.findOneAndUpdate({_id:_id}, {last_login:Date.now()})
					let token = JWTUtils.createToken({_id:_id, password:obj.password})
					return {code:0, token:token}
				}
				return {code:1, msg:'登入失败'}
			}).catch(e => {
				return {code:1, msg:'处理出错-1'}
			})
		} else {
			return {code:1, msg:'用户不存在'}
		}
	}).catch(e => {
		return {code:1, msg:'处理出错-2'}
	})
}
