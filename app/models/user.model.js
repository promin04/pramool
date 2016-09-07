var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
  firstname : String ,
  lastname : String ,
  username : {
               type: String ,
               unique: true,
               trim: true,
               required: 'Username is required'
   },
  email : {
            type: String ,
            index: true
          },
  password : {
              type: String,
              validate: [
                function (password) {
                  return password && password.length >= 6;
                },'Password must be at least 6'
              ]
  },
  salt: {
    type: String
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerId: String,
  providerData: {}
});

UserSchema.pre('save', function(next) {
  if(this.password){
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});

UserSchema.methods.hashPassword = function (password) {
  return crypto.pbkdf2Sync(password , this.salt , 10000 , 64).toString('base64');
};

UserSchema.methods.authenticate = function (password) {
  return this.password == this.hashPassword(password);
};

mongoose.model('User',UserSchema);
