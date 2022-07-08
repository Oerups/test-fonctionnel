const diskModel = require('../models/disks');
module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    diskModel.findById(req.params.diskId, function (err, diskInfo) {
      if (err) {
        next(err);
      } else {
        res.json({ status: "success", message: "Disk found !!", data: { disks: diskInfo } });
      }
    });
  },
  getAll: function (req, res, next) {
    let disksList = [];
    diskModel.find({}, function (err, disks) {
      if (err) {
        next(err);
      } else {
        for (let disk of disks) {
          disksList.push({ id: disk._id, name: disk.name, released_on: disk.released_on });
        }
        res.json({ status: "success", message: "Disks list found !!", data: { disks: disksList } });
      }
    });
  },
  updateById: function (req, res, next) {
    diskModel.findByIdAndUpdate(req.params.diskId, { name: req.body.name }, function (err, diskInfo) {
      if (err)
        next(err);
      else {
        res.json({ status: "success", message: "Disk updated !!", data: null });
      }
    });
  },
  deleteById: function (req, res, next) {
    diskModel.findByIdAndRemove(req.params.diskId, function (err, diskInfo) {
      if (err)
        next(err);
      else {
        res.json({ status: "success", message: "Disk deleted !!", data: null });
      }
    });
  },
  create: function (req, res, next) {
    diskModel.create({ name: req.body.name, released_on: req.body.released_on }, function (err, result) {
      if (err)
        next(err);
      else
        res.json({ status: "success", message: "Disk added !!", data: null });
    });
  },
}