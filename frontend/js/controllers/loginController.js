module.exports = function(app) {
    app.controller('loginController', ['$scope', 'AuthService',
	function($scope, AuthService) {
		$scope.errorMessage = '';
		$scope.attemptLogin = function(){
			AuthService.authenticate($scope.username,$scope.password,function(err){
				if(err){
					$scope.errorMessage = err;
					$scope.isLoggedIn = false;
				}else{
					$('#loginModal').modal('hide');
					$scope.isLoggedIn = true;
				}
			});
		};
	}]);
}
