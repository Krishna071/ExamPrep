const mongoose = require('mongoose')
const validator=require('validator')

const documentSchema = mongoose.Schema({
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
    },
    document:{
        type:Buffer,
        required:true,
    }
})

const Document = mongoose.model('Document',documentSchema)


module.exports = Document