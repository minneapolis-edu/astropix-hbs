var express = require('express');
var router = express.Router();

/* GET favorites page */
router.get('/', function(req, res, next){
  res.render('favorites', { favorites: req.session.favorites });
});

/* POST to add a new favorite to user's favorites */
router.post('/add', function(req, res, next){

  // If a favorites array does not exist in this session, create it
  if (!req.session.favorites) {
    req.session.favorites = [];
  }

  // Is this image already a favorite? Filter the favorites array for images with this date
  var favorite_on_date = req.session.favorites.filter(function(fav) {
    return fav.date == req.body.date
  });

  // If no favorite found with this date, then add to the session's favorites array
  if (favorite_on_date.length == 0) {
    req.session.favorites.push(req.body);
  }

  // Redirect to the favorites page.
  res.redirect('/favorites');
});


module.exports = router;
