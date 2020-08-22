var express = require('express');
var router = express.Router();
var models = require('../models');


/* GET home page. */
router.get('/', async function(req, res, next) {
  var wpgs = await models.webpages.findAll( {  order: [ ['createdAt', 'DESC' ]] })
  res.render('index', { title: 'Homepage', wpgs: wpgs });
});

router.get('/addwpgs', async function(req, res, next) {
  res.render('addwpgs', { title: 'Add webpage'});
});

router.post('/addwpgs', async function(req, res, next) {
  var name = req.body.name;
  var url = req.body.url;
  var timing = req.body.timing;

  if ( timing < 100 )
    return res.json({status: 'error', message: 'Minimun time: 100ms.'});

  try {
      var webpage = await models.webpages.create({
          name: name,
          url: url,
          timing: timing
      });
  } catch (err) {
      console.log(err);
      return res.json({status: 'error', message: err});
  }

  if (webpage) {
      res.json({status: 'ok'});
  } else {
      res.json({status: 'error', message: 'Unexplained error. Retry.'})
  }
});

router.get('/delete/:id', async function(req, res, next) {
  await models.webpages.update( {deleted: true} , { where: { id: req.params.id } } );
  res.redirect('/')
});

router.get('/udelete/:id', async function(req, res, next) {
  await models.webpages.update( {deleted: false} , { where: { id: req.params.id } } );
  res.redirect('/')
});

router.get('/run/:id', async function(req,res,next) {
  var wpg = await models.webpages.findOne( {where: {id: req.params.id}});
  res.render('run', {title: wpg.name, wpg: wpg});
})

module.exports = router;
