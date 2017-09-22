'use strict';
var model = {
    items: [
        { reminder: "Купить хлеб", done: false, description: "Черный. <100руб." ,due_date : '01.07.1991'},
        { reminder: "Заменить масло", done: false, description: "Позвонить 29 7071515, 10руб" ,due_date : '01.07.1991'},
        { reminder: "купиь билеты в кино", done: true, description: "afisha.tut.by" ,due_date : '01.07.1991'},
    ]
};
var remindersApp = angular.module('myApp.reminders', ['ngRoute']);

remindersApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/reminders', {
    templateUrl: 'reminders/reminders.html',
    controller: 'RemindersCtrl'
  });
}]);

remindersApp.controller('RemindersCtrl', function($scope) {
    $scope.list = model;
    $scope.addItem = function (title, description, due_date) {
        if(title == null || title == ""){
            alert("Please Fill Title Field");
            return;
        }
        if(description==null || description == ""){
            alert("Please Fill Description Field");            
            return;
        }
        if(due_date==null || due_date == ""){
            alert("Please, set due date");            
            return;
        }
        $scope.list.items.push({ reminder: title, description: description, done: false ,due_date : due_date});
    }
});