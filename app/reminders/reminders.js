'use strict';

var remindersApp = angular.module('myApp.reminders', ['ngRoute']);

remindersApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/reminders', {
        templateUrl: 'reminders/reminders.html',
        controller: 'RemindersCtrl'
    });
}]);

remindersApp.controller('RemindersCtrl', function ($scope) {

    var saved = localStorage.getItem('items');
    $scope.items = (saved != null) ? JSON.parse(saved) : [];

    var localSet = function () {
        try {
            localStorage.setItem('items', JSON.stringify($scope.items));
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert("Превышен лимит localStorage");
            }
        }
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

    $scope.delete = function (itemForDelete) {
        var rusure = confirm("Are you sure you want to remove the task from the list?");
        if (rusure) {
            // $scope.items.splice(idx, 1);
            // $scope.items.splice($scope.items.indexOf(item), 1);
            $scope.items = $scope.items.filter(function (item) { return item.id != itemForDelete.id });
            localSet();
        }
    }
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
        var day = due_date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        var month = due_date.getMonth();
        if (month < 10) {
            month = "0" + month;
        }
        var year = due_date.getFullYear();

        var date = day + "/" + month + "/" + year;

        $scope.items.push({
            id: new Date().getMilliseconds(),
            reminder: title,
            description: description,
            due_date: date
        });

        // clear input field after saving
        $scope.title = '';
        $scope.description = '';
        $scope.due_date = '';
        localSet();
    }
});