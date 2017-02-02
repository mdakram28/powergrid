'use strict';
import angular from 'angular';

let message = 'Hello from the entry file';
console.log(message);
alert(message);

let app = angular.module('app', []);
app.controller('controller', ($scope) => {
    $scope.name = 'mdakram28';
});
