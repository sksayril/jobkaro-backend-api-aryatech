let mongoose = require('mongoose')

let schema = new mongoose.Schema({
    CategoryName: {
        type: String,
        require: true
    },
    CategoryEmoji: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('category', schema)
