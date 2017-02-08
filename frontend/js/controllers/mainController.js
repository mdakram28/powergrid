module.exports = function(app) {
    app.controller('controller', ['$scope', 'AuthService',
		function($scope, AuthService) {
            $scope.isLoggedIn = false;
            $scope.requireLogin = function() {
                AuthService.syncIsLoggedIn(function(isLoggedIn) {
                    $scope.isLoggedIn = isLoggedIn;
					console.log("isLoggedIn : ",isLoggedIn)
                    if (!isLoggedIn) {
                        $('#loginModal').modal({
                            backdrop: 'static',
                            keyboard: false
                        });
                    }
                });
            };
			$scope.logout = function(){
				AuthService.logout(function(err){
					$scope.requireLogin();
				});
			};
            setTimeout($scope.requireLogin, 100);
			console.log("controller initialized");
	}]);
}
