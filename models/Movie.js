const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MoviewSchema = new Schema({
    director_id:Schema.Types.ObjectId,
    title:{
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength:[15, '`{PATH}` alanı (`{VALUE}`) ({MAXLENGTH}) karakterden az olmalıdır'],
        minlength:[1, '`{PATH}` alanı (`{VALUE}`) ({MINLENGTH}) karakterden büyük olmalıdır'],
    },
    category:{
        type:String,
        maxlength:[30, '`{PATH}` alanı (`{VALUE}`) ({MAXLENGTH}) karakterden az olmalıdır'],
        minlength:[1, '`{PATH}` alanı (`{VALUE}`) ({MINLENGTH}) karakterden büyük olmalıdır'],
    },
    country:{
        type:String,
        maxlength:[30, '`{PATH}` alanı (`{VALUE}`) ({MAXLENGTH}) karakterden az olmalıdır'],
        minlength:[1, '`{PATH}` alanı (`{VALUE}`) ({MINLENGTH}) karakterden büyük olmalıdır'],
    },
    year:Number,
    imdb_score:Number,
    createdDate: {
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('movie', MoviewSchema);