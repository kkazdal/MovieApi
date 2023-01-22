const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        unique:true,
        maxlength:[50, '`{PATH}` alanı (`{VALUE}`) ({MAXLENGTH}) karakterden az olmalıdır'],
        minlength:[2, '`{PATH}` alanı (`{VALUE}`) ({MINLENGTH}) karakterden büyük olmalıdır'],
    },
    password:{
        type: String,
        maxlength:[100, '`{PATH}` alanı (`{VALUE}`) ({MAXLENGTH}) karakterden az olmalıdır'],
        minlength:[2, '`{PATH}` alanı (`{VALUE}`) ({MINLENGTH}) karakterden büyük olmalıdır'],
    },
});

module.exports = mongoose.model('user', UserSchema);