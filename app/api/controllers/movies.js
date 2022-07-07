const movieModel = require('../models/movies');
module.exports = {
  getById: function (req, res, next) {
    movieModel.findById(req.params.movieId, function (err, movieInfo) {
      if (err) {
        next(err);
      } else {
        res.json(movieInfo);
      }
    });
  },
  getAll: function (req, res, next) {
    let moviesList = [];
    movieModel.find({}, function (err, movies) {
      if (err) {
        next(err);
      } else {
        for (let movie of movies) {
          moviesList.push({ id: movie._id, name: movie.name, released_on: movie.released_on });
        }
        res.json(moviesList);

      }
    });
  },
  updateById: function (req, res, next) {
    movieModel.findByIdAndUpdate(req.params.movieId, { name: req.body.name }, function (err, movieInfo) {
      if (err)
        next(err);
      else {
        res.json(movieInfo);
      }
    });
  },
  deleteById: function (req, res, next) {
    movieModel.findByIdAndRemove(req.params.movieId, function (err, movieInfo) {
      if (err)
        next(err);
      else {
        res.sendStatus(204)
      }
    });
  },
  create: function (req, res, next) {
    movieModel.create({ name: req.body.name, released_on: req.body.released_on }, function (err, result) {
      if (err)
        next(err);
      else
        res.status(201).json(result);
    });
  },
}