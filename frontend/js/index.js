import angular from 'angular';
let app = angular.module('app',[require('angular-cookies')]);

//include ui components first
require('./ui-components/sidebar-menu.js')(app);
require('./ui-components/common.js')(app);

//then include service and factories
require('./services/authService.js')(app);

//then finally the controllers
require('./controllers/mainController.js')(app);
require('./controllers/loginController.js')(app);
