
let Order = require('../model').deliver;
let moment = require('moment')



exports.finishSend = function(order_id) {
  return Order.findOneAndUpdate({_id:order_id}, {stat:0}).then(count => {
    return {code:0}
  }).error(e => {
    return {code:1, msg:'unknown-1'}
  })
}


exports.listToBeFinishedOrder = function(openid) {
  return Order.find({openid: openid, $or: [{stat: 1}, {stat: 2}]}).then(orders => {
    if(orders) {
      return {code:0, data: orders}
    } else {
      return {code:1, msg:'查询数据库出错-1'}
    }
  }).error(e => {
      return {code:1, msg:'查询数据库出错-1', err:e}
  })
}


exports.listAllUserOrders = function(openid) {
  return Order.find({openid: openid}).then(orders => {
    if(orders) {
      return {code:0, data: orders}
    } else {
      return {code:1, msg:'查询数据库出错-1'}
    }
  }).error(e => {
      return {code:1, msg:'查询数据库出错-1', err:e}
  })
}

exports.queryByDay = function(date) {
  let d = Date.now()
  try{
    let dd = parseInt(date)
    dd = new Date(dd)
    d = dd
  } catch(e) {
    console.log('error when parse date')
  }

  let query = new Date(moment(d).format('YYYY/MM/DD'))
  let query2 = new Date(moment(query).add(1, 'days'))
  return Order.find({date: {$gte:query, $lt: query2}}).then(orders => {
    return {code:0, data:orders}
  }).error(e => {
    return {code:1, msg:'查询出错-1'}
  })
}

exports.queryByStat = function(stat) {
  return Order.find({stat: stat}).then(orders => {
    return {code:0, data:orders}
  }).error(e => {
    return {code:1, msg:'查询出错-1'}
  })
}

exports.queryByOpenid = function(id) {
  console.log('openid' + id)
  return Order.find({openid:id}).then(orders => {
    return {code:0, data:orders}
  }).error(e => {
    return {code:1, msg:'查询出错-1'}
  })
}

exports.getOrders = function(capacity, page) {
  return Order.count({}).then(count => {
    return Order.find({}).sort({date:-1}).skip(capacity * (page - 1)).limit(capacity).then(results => {
      if(results) {
        return {code:0, data:results, totalCount: count}
      } else {
        return {coe:1, msg:'查询出错'}
      }
    }).error(e => {
      return {coe:1, msg:'查询出错', err:e}
    })
  }).error(e => {
    return {coe:1, msg:'查询出错', err:e}
  })
}
