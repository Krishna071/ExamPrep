const mongoose = require('mongoose')
const validator=require('validator')

const metaDataSchema = mongoose.Schema({
    year:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    }
})

const metaData = mongoose.model('metaData',metaDataSchema)


module.exports = metaData