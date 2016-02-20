var express = require('express');
var router = express.Router();
var Url = require('../models/Urls');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/new', function(req, res, next) {
  var base_url = req.protocol + '://' + req.get('host');
  var url_param = req.query.url;
  
  Url.findOne({'original_url':url_param}, function(err,url){
      
      if (url) {
          res.json({"original_url":url.original_url,"short_url":base_url + '/' + url._id});
            
      }else{
          var newUrl = new Url({ original_url: url_param });
          newUrl.save(function (err) {
              if (err)
                console.log('meow');
              res.json({"original_url":url_param,"short_url":base_url + '/' + newUrl._id});
          });
      }
  })
  //res.json({"original_url":url,"short_url":"https://shurli.herokuapp.com/pZZZ"});
});


router.get('/:id', function(req, res, next) {
    
    Url.findOne({'_id':req.params.id}, function(err,url){
      
        if (url) {
           res.redirect(url.original_url);
        }
      
    });
})


module.exports = router;
