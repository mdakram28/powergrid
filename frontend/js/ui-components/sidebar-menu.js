import angular from 'angular';

let app = angular.module('app', []);

app.directive('menuItem', function() {
    return {
        replace: true,
        transclude: true,
        restrict: 'E',
        scope: {
            'href': '@',
            'icon': '@',
            'label': '@'
        },
        template: '<li>\
			<a ng-if="isNested">\
				<i class="fa fa-{{icon}}"></i> {{label}} <span class="fa fa-chevron-down"></span>\
			</a>\
			<a href="{{href}}" ng-if="!isNested">\
				<i class="fa fa-{{icon}}"></i> {{label}} \
			</a>\
		  	<ul ng-if="isNested" class="nav child_menu">\
		  		<li ng-repeat="item in menuItems"><a href="{{item.href}}">{{item.label}}</a></li>\
		  	</ul>\
			<ng-transclude></ng-transclude>\
		</li>',
        controller: function($scope) {
            $scope.menuItems = [];
            $scope.isNested = false;
            this.addSubItem = function(href, label) {
                $scope.isNested = true;
                console.log(href, label);
                $scope.menuItems.push({
                    href: href,
                    label: label
                });
            }
        }
    }
});

app.directive('menuSubitem', ()=>{
    return {
        replace: true,
        restrict: 'E',
        require: '^menuItem',
        scope: {
            'href': '@',
            'label': '@'
        },
        link: function(scope, elem, attr, menuItem) {
            menuItem.addSubItem(scope.href, scope.label);
        }
    }
})
