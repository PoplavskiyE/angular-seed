'use strict';
var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
var model = {
    items: [
        { reminder: "Купить хлеб", description: "Черный. <100руб." ,due_date : new Date().toLocaleString("en-US", options)},
        { reminder: "Заменить масло", description: "Позвонить 29 7071515, 10руб" ,due_date : new Date().toLocaleString("en-US", options)},
        { reminder: "купиь билеты в кино", description: "afisha.tut.by" ,due_date : new Date().toLocaleString("en-US", options)},
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
        
        var d =due_date.toLocaleString("en-US", options);
        $scope.list.items.push({ reminder: title, description: description,due_date : d});
    }
});