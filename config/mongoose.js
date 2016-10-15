var mongoose = require('mongoose');
mongoose.set('debug',true);

var uri = 'mongodb://localhost/pramool';
var db = mongoose.connect(uri);

require('../app/models/product.model.js');
require('../app/models/user.model.js');
require('../app/models/following.model.js');
require('../app/models/notification.model.js');
