let log4js = require('log4js');
let logger = log4js.getLogger('ControllerServer');

/**
    @name adminUserLogin
    @link /xxv1/1vxx/admin/login/:account/:password
    @method GET
    @desc 管理员登入
    @param {'name':'account','type':'string','des':'用户id'}
    @param {'name':'password','type':'string','des':'用户密码'}
**/
exports.adminLogin = function(req, res) {
    logger.info('adminLogin Api Call')

    let params = req.params
    let account = params.account
    let password = params.password
    if(!account || !password) {
      return res.status(200).json({code:1, msg:'参数错误'})
    }
    req.models.server.login(account, password).then(result => {
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(200).json({code:1, 'msg':'unknown'})
        }
    });
}

/**
    @name adminCreateUser
    @link /xxv1/1vxx/admin/user/create/:account/:password/:name/:address
    @method GET
    @desc 创建用户
    @param {'name':'account','type':'string','des':'用户id'}
    @param {'name':'password','type':'string','des':'用户密码'}
    @param {'name':'name','type':'string','des':'用户名字'}
    @param {'name':'address','type':'string','des':'用户送货地址'}
    @header {'name':'token','type':'string','des':'用户密码'}
**/
exports.createUser = function(req, res) {
    logger.info('createUser Api Call');

    let params = req.params
    let account = params.account
    let password = params.password
    let name = params.name
    let address = params.address
    if(!account || !password || !name || !address) {
      return res.status(200).json({code:1, msg:'参数错误'})
    }

    req.models.server.createUser(account, password, name, address).then(result => {
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(200).json({code:1, 'msg':'unknown'})
        }
    });
}

/**
    @name adminResetPassword
    @link /xxv1/1vxx/admin/user/reset/password/:account/:password
    @method GET
    @desc 重置用户密码
    @param {'name':'account','type':'string','des':'用户id'}
    @param {'name':'password','type':'string','des':'用户密码'}
    @header {'name':'token','type':'string','des':'用户密码'}
**/
exports.resetPassword = function(req, res) {
    logger.info('resetPassword Api Call');

    let params = req.params
    let account = params.account
    let password = params.password
    if(!account || !password) {
      return res.status(200).json({code:1, msg:'参数错误'})
    }

    req.models.server.resetPassword(account, password).then(result => {
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(200).json({code:1, 'msg':'unknown'})
        }
    })
}

/**
    @name adminResetAddress
    @link /xxv1/1vxx/admin/user/reset/address/:account/:address
    @method GET
    @desc 重置用户密码
    @param {'name':'account','type':'string','des':'用户id'}
    @param {'name':'address','type':'string','des':'用户送货地址'}
    @header {'name':'token','type':'string','des':'用户密码'}
**/
exports.resetAddress = function(req, res) {
    logger.info('resetAddress Api Call');

    let params = req.params
    let account = params.account
    let address = params.address
    if(!account || !address) {
      return res.status(200).json({code:1, msg:'参数错误'})
    }

    req.models.server.resetAddress(account, address).then(result => {
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(200).json({code:1, 'msg':'unknown'})
        }
    })
}
