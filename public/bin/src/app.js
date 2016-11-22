
require("moment");

require("../../lib/angular/angular.min.js");
require("../../lib/angular-animate/angular-animate.min.js");
require("../../lib/angular-bootstrap/ui-bootstrap-tpls.min.js");
require("../../lib/ng-file-upload/ng-file-upload-all.min.js");
require("../../lib/angular-ui-router/release/angular-ui-router.min.js");
require("../../lib/angular-sanitize/angular-sanitize.min.js");
require("../../lib/masonry/dist/masonry.pkgd.min.js");

require("../../modules/search/search-app.js");
require("../../modules/search/search-config.js");
require("../../modules/search/services/search-service.js");
require("../../modules/search/controllers/search-controller.js");
require("../../modules/search/controllers/searchPage-controller.js");
require("../../modules/search/directives/search-directive.js");
require("../../modules/search/directives/searchPage-directive.js");

require("../../modules/header/config/header-config.js");
require("../../modules/header/directives/header-directive.js");
require("../../modules/header/directives/scroll-directive.js");

require("../../modules/addProduct/addProduct-app.js");
require("../../modules/addProduct/controllers/addProduct-controller.js");
require("../../modules/addProduct/controllers/sidebarReview-controller.js");
require("../../modules/addProduct/directives/addProduct.js");
require("../../modules/addProduct/directives/imageonload.js");

require("../../modules/comment/directives/comment-directive.js");
require("../../modules/comment/directives/contenteditable-directive.js");
require("../../modules/comment/directives/heigthFix-directive.js");
require("../../modules/comment/controllers/comment-controller.js");
require("../../modules/comment/directives/answer-directive.js");
require("../../modules/comment/controllers/answer-controller.js");

require("../../modules/store/config/store-config.js");
require("../../modules/store/controllers/main-controller.js");
require("../../modules/store/controllers/side-controller.js");
require("../../modules/store/controllers/bottom-controller.js");
require("../../modules/store/config/store-config-run.js");
require("../../modules/store/services/following.js");
require("../../modules/store/services/notification.js");
require("../../modules/store/store.js");
require("../../modules/store/store-completed.js");

require("../../modules/dashboard/config/dashboard-config.js");
require("../../modules/dashboard/services/followedProduct.js");
require("../../modules/dashboard/services/deleteProduct.js");
require("../../modules/dashboard/controllers/profile-controller.js");

require("../../modules/timer/timer.js");
require("../../modules/gallery/directives/gallery.js");
require("../../modules/gallery/controllers/gallery-controller.js");

require("../../modules/main/main.js");
require("../../modules/main/config/main-config.js");
require("../../modules/main/services/modal-service.js");
require("../../modules/main/services/modalAuth-service.js");
require("../../modules/main/services/user-service.js");
require("../../modules/main/services/imgur-service.js");
