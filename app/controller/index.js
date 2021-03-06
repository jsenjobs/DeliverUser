let appC = require('./app.js')
let clientcontrollerC = require('./clientcontroller.js')
let orderCRUDControllerC = require('./orderCRUDController.js')
let servercontrollerC = require('./servercontroller.js')
// @require

let ejwt = require('express-jwt');
let jwts = require('jsonwebtoken');

let JWT_SECRET = process.env.JWTJWT_SECRET
let secret = process.env.JWTACTIVE + JWT_SECRET
let jwtCheck = ejwt({
  // 获取secret
  secret: (req, payload, done) => {
    console.log(payload)
    req.headers.uid = JSON.parse(payload.sub).id
    done(null, secret)
    /*
    if (req.headers.principal) {
      redis.GetValue(req.headers.principal).then(v => done(null, v)).catch(e => done(null, ''))
    } else if(req.query && req.query.principal)  {
      redis.GetValue(req.query.principal).then(v => done(null, v)).catch(e => done(null, ''))
    }
    */
    /*
    if(req.headers.token) {
      redis.GetValue(req.headers.token).then(v => done(null, v)).catch(e => done(null, ''));
    } else if(req.query && req.query.token) {
      redis.GetValue(req.query.token).then(v => done(null, v)).catch(e => done(null, ''));
    }
    */
  },
  credentialsRequired:true,
  getToken: (req) => {
    if(req.headers.token) {
      return req.headers.token;
    }/* else if(req.query && req.query.token) {
      return req.query.token;
    }
    */
    return null;
  }
});

exports.boot = function(app) {
  app.use('/xxv1/1vxx/admin/user', jwtCheck)
  // @start
  app.get('/app/status',appC.status)
  app.get('/app/listinfo',appC.listinfo)
  app.get('/app/getLog',appC.getLog)
  app.get('/login/:account/:password',clientcontrollerC.login)
  app.get('/order/sended/:order',orderCRUDControllerC.finishSend)
  app.get('/order/list/tobe/:openid',orderCRUDControllerC.listToBeFinishedOrder)
  app.get('/order/listall/:openid',orderCRUDControllerC.listAllUserOrders)
  app.get('/order/query/day/:date',orderCRUDControllerC.queryByDay)
  app.get('/order/query/stat',orderCRUDControllerC.queryByStat)
  app.get('/order/query/id/:id',orderCRUDControllerC.queryByOpenid)
  app.get('/order/get/:capacity/:page',orderCRUDControllerC.getOrders)
  app.get('/xxv1/1vxx/admin/login/:account/:password',servercontrollerC.adminLogin)
  app.get('/xxv1/1vxx/admin/user/create/:account/:password/:name/:address',servercontrollerC.createUser)
  app.get('/xxv1/1vxx/admin/user/reset/password/:account/:password',servercontrollerC.resetPassword)
  app.get('/xxv1/1vxx/admin/user/reset/address/:account/:address',servercontrollerC.resetAddress)
  // @end

}
