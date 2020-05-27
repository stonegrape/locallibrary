let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let moment = require('moment');
let AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});
//Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
    let fullname = '';
    if(this.first_name && this.family_name) {
        fullname = this.family_name + ', '+ this.first_name;
    }
    if (!this.first_name || !this.family_name) {
        fullname = '';
    }
    return fullname;
});
// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function(){
    return(this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});
//Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function(){
    //this._id?
    return '/catalog/author/' + this._id;
});
//Virtual for author's date of birth
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function(){
    return moment(this.date_of_birth).format('YYYY-MM-DD');
});
//Virtual for author's date of death
AuthorSchema
.virtual('date_of_death_formatted')
.get(function(){
    return moment(this.date_of_death).format('YYYY-MM-DD');
});
AuthorSchema
.virtual('lifespan_formatted')
.get(function(){
    return (moment(this.date_of_birth).format('YYYY-MM-DD') - moment(this.date_of_death).format('YYYY-MM-DD')).toString();
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);