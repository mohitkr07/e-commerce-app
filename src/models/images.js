const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    id:{
        type: String
    },
    
    Image: {
        type: Buffer
    }

})

imageSchema.statics.getImage = async (id)=>{
    const products = await Image.findOne({id})
    return products
}

const ImageObj = mongoose.model('Image', imageSchema)

module.exports = ImageObj