var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var connection =mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '123456' ,
  database:'item'
})

/* GET home page. */
router.get('/list', function(req, res, next) {
  res.header('Access-Control-Allow-Origin',"*")
  connection.query('SELECT * FROM jingguanran',function(err, rows, fields) {
    if(err) throw err
    res.send(rows)
  })
});
router.post('/delete',function(req, res, next) {
  res.header('Access-Control-Allow-Origin',"*")
  connection.query('DELETE FROM jingguanran WHERE id='+req.body.abc,function(err, rows, fields) {    //SELECT语句
    if(err) throw err
    res.send(rows)
  })
});
router.post('/jia',function(req, res, next) {
  var a=req.body.a
  var b=req.body.b
  console.log(a,b)
  res.header('Access-Control-Allow-Origin',"*")
  connection.query("INSERT INTO jingguanran (title,time) VALUES ('"+a+"','"+b+"')",function(err, rows, fields) {
    if(rows !=""||rows!=null) {
      connection.query('SELECT * FROM jingguanran',function(err, rows, fields) {
        res.send(rows)
      })
    }
    //res.send(rows)
  })
});

module.exports = router;
