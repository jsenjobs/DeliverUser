let log4js = require('log4js');
let logger = log4js.getLogger('ControllerClient');

/**
    @name login
    @link /login/:account/:password
    @method GET
    @desc 用户登入
    @param {'name':'account','type':'string','des':'用户注册'}
    @param {'name':'password','type':'string','des':'用户密码', 'necessary':false}
**/
exports.login = function(req, res) {
    logger.info('login Api Call');

    let params = req.params
    let account = params.account
    let password = params.password
    if(!account || !password) {
      return res.status(200).json({code:1, msg:'参数错误'})
    }

    req.models.client.login(account, password).then(result => {
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(200).json({code:1, 'msg':'unknown'})
        }
    });
}
