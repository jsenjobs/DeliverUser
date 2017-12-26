let log4js = require('log4js');
let logger = log4js.getLogger('ControllerDeliver');

/**
    @name finishSend
    @link /order/sended/:order
    @method GET
    @param {'name':'order','type':'string','des':'订单id'}
    @desc 标记完成订单，客户端调用
**/
exports.finishSend = function(req, res) {
    logger.info('finishSend Api Call');

    let order = req.params.order

    if(!order) {
      return res.status(200).json({code:0, msg:'参数错误'})
    }

    req.models.queryorder.finishSend(order).then(result => {
      return res.status(200).json(result);
    }).error(e => {
      return res.status(200).json({code:1, msg:'unknown'});
    })
}

/**
    @name listToBeFinishedOrder
    @link /order/list/tobe/:openid
    @method GET
    @param {'name':'openid','type':'string','des':'用户id'}
    @desc 列出用户未确认订单
**/
exports.listToBeFinishedOrder = function(req, res) {
    logger.info('listToBeFinishedOrder Api Call');

    let openid = req.params.openid

    if(!openid) {
      return res.status(200).json({code:0, msg:'参数错误'})
    }

    req.models.queryorder.listToBeFinishedOrder(openid).then(result => {
      return res.status(200).json(result);
    }).error(e => {
      return res.status(200).json({code:1, msg:'unknown'});
    })
}

/**
    @name listAllUserOrders
    @link /order/listall/:openid
    @method GET
    @param {'name':'openid','type':'string','des':'用户id'}
    @desc 列出所有用户订单
**/
exports.listAllUserOrders = function(req, res) {
    logger.info('listAllUserOrders Api Call');

    let openid = req.params.openid

    if(!openid) {
      return res.status(200).json({code:0, msg:'参数错误'})
    }

    req.models.queryorder.listAllUserOrders(openid).then(result => {
      return res.status(200).json(result);
    }).error(e => {
      return res.status(200).json({code:1, msg:'unknown'});
    })
}




/**
    @name queryOrderByDay
    @link /order/query/day/:date
    @method GET
    @param {'name':'date','type':'string','des':'查询的时间'}
    @header {'name':'token','type':'string','des':'用户Token'}
    @desc 根据时间查询订单
**/
exports.queryByDay = function(req, res) {
    logger.info('queryByDay Api Call');

    let date = req.params.date

    if(!date) {
      return res.status(200).json({code:0, msg:'参数错误'})
    }

    req.models.queryorder.queryByDay(date).then(result => {
      return res.status(200).json(result);
    }).error(e => {
      return res.status(200).json({code:1, msg:'unknown'});
    })
}
/**
    @name queryOrderByStat
    @link /order/query/stat
    @method GET
    @param {'name':'stat','type':'number','des':'查询的状态'}
    @header {'name':'token','type':'string','des':'用户Token'}
    @desc 根据状态查询订单
**/
exports.queryByStat = function(req, res) {
    logger.info('queryByStat Api Call');

    let stat = req.query.stat

    if(!stat) {
      return res.status(200).json({code:0, msg:'参数错误'})
    }
    try {
      stat = parseInt(stat)
    } catch(e) {
      stat =1
    }

    req.models.queryorder.queryByStat(stat).then(result => {
      return res.status(200).json(result);
    }).error(e => {
      return res.status(200).json({code:1, msg:'unknown'});
    })
}

/**
    @name queryOrderById
    @link /order/query/id/:id
    @method GET
    @param {'name':'id','type':'string','des':'查询的用户id （openid）'}
    @header {'name':'token','type':'string','des':'用户Token'}
    @desc 根据时间查询订单
**/
exports.queryByOpenid = function(req, res) {
    logger.info('queryByOpenid Api Call');

    let id = req.params.id

    if(!id) {
      return res.status(200).json({code:0, msg:'参数错误'})
    }

    req.models.queryorder.queryByOpenid(id).then(result => {
      return res.status(200).json(result);
    }).error(e => {
      return res.status(200).json({code:1, msg:'unknown'});
    })
}

/**
    @name getOrders
    @link /order/get/:capacity/:page
    @method GET
    @param {'name':'capacity','type':'number','des':'每页大小'}
    @param {'name':'page','type':'number','des':'第几页 1 开始'}
    @header {'name':'token','type':'string','des':'用户Token'}
    @desc 分页获取订单，根据时间
**/
exports.getOrders = function(req, res) {
    logger.info('getOrders Api Call');

    let capacity = req.params.capacity
    let page = req.params.page

    if(!capacity || !page) {
      return res.status(200).json({code:0, msg:'参数错误'})
    }
    try {
      capacity = parseInt(capacity)
    } catch(e) {
      capacity = 100
    }
    try {
      page = parseInt(page)
    } catch(e) {
      page = 1
    }

    req.models.queryorder.getOrders(capacity, page).then(result => {
      return res.status(200).json(result);
    }).error(e => {
      return res.status(200).json({code:1, msg:'unknown'});
    })
}
