var mongoose = require('mongoose');
mongoose.set('debug',true);

var uri = 'mongodb://127.0.0.1/pramool';
var db = mongoose.connect(uri);
mongoose.Promise = global.Promise;

require('../app/models/product.model.js');
require('../app/models/user.model.js');
require('../app/models/following.model.js');
require('../app/models/comment.model.js');
