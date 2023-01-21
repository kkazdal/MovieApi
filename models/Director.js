const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name:{
        type: String,
        maxlength:[50, '`{PATH}` alanı (`{VALUE}`) ({MAXLENGTH}) karakterden az olmalıdır'],
        minlength:[2, '`{PATH}` alanı (`{VALUE}`) ({MINLENGTH}) karakterden büyük olmalıdır'],
    },
    surname:{
        type: String,
        maxlength:[50, '`{PATH}` alanı (`{VALUE}`) ({MAXLENGTH}) karakterden az olmalıdır'],
        minlength:[2, '`{PATH}` alanı (`{VALUE}`) ({MINLENGTH}) karakterden büyük olmalıdır'],
    },
    bit:{
        type: String,
        maxlength:[1000, '`{PATH}` alanı (`{VALUE}`) ({MAXLENGTH}) karakterden az olmalıdır'],
        minlength:[60, '`{PATH}` alanı (`{VALUE}`) ({MINLENGTH}) karakterden büyük olmalıdır'],
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("director",DirectorSchema);
