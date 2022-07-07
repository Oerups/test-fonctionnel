const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const DiskSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    released_on: {
        type: Date,
        trim: true,
        required: true
    }
});
module.exports = mongoose.model('Disk', DiskSchema)