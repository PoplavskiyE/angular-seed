'use strict';
var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
};

var remindersApp = angular.module('myApp.reminders', ['ngRoute']);

remindersApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/reminders', {
        templateUrl: 'reminders/reminders.html',
        controller: 'RemindersCtrl'
    });
}]);

remindersApp.controller('RemindersCtrl', function ($scope) {
    var localSet = function () {
        localStorage.setItem('items', JSON.stringify($scope.items));
    }
    var setMinDate = function () {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        var today = year + "-" + month + "-" + day;
        document.getElementById("theDate").min = today;
    }
    setMinDate();

    $scope.saved = localStorage.getItem('items');
    $scope.items = ($scope.saved != null) ? JSON.parse($scope.saved) : [];

    $scope.addItem = function (title, description, due_date) {
        if (title == null || title == "") {
            alert("Please Fill Title Field");
            return;
        }
        if (description == null || description == "") {
            alert("Please Fill Description Field");
            return;
        }
        if (due_date == null || due_date == "") {
            alert("Please, set due date");
            return;
        }

        var d = due_date.toLocaleString("en-US", options);

        $scope.items.push({
            reminder: title,
            description: description,
            due_date: d
        });

        // clear input field after saving
        $scope.title = '';
        $scope.description = '';
        $scope.due_date = '';
        localSet();
    }
});