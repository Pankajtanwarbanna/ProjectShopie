var mongoose = require('mongoose');
var titlize = require('mongoose-title-case');
mongoose.set('useCreateIndex', true);

var projectSchema = new mongoose.Schema({
    postedbyname : {
        type : String,
        required : true,
    },
    postedbyusername : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true,
    },
    projectname : {
        type : String,
        required : true,
    },
    demourl : {
        type : String,
        required : true
    },
    githuburl : {
        type : String,
        required : true
    },
    technology : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    projectline : {
        type: String,
        required: true
    },
    subscriber : {
        type : String,
        required : true
    },
    revenue : {
        type : Number,
        required : true,
    },
    projectprice : {
        type : Number,
        required : true,
    }
});


// Mongoose title case plugin
projectSchema.plugin(titlize, {
    paths: [ 'projectname','name'], // Array of paths
});


module.exports = mongoose.model('Project',projectSchema);