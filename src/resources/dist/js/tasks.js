angular.module('APP', [])

.service('$tasks', [ "$http", "$q", function ($http, $q) {
    this.get = function (id) {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: '/rest/tasks/' + id,
        }).then(
            function (response ) { defer.resolve(response .data); },
            function (err) { defer.reject(err)}
        );
        return defer.promise;
    };

    this.getAll = function (id) {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: '/rest/tasks',
        }).then(
            function (response ) { defer.resolve(response .data); },
            function (err) { defer.reject(err)}
        );
        return defer.promise;
    };

    this.post = function (task) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: '/rest/tasks',
            data: task
        }).then(
            function (response ) { defer.resolve(response .data); },
            function (err) { defer.reject(err)}
        );
        return defer.promise;
    };

    this.delete = function (id) {
        var defer = $q.defer();
        $http({
            method: 'DELETE',
            url: '/rest/tasks/' + id,
        }).then(
            function (response ) { defer.resolve(response .data); },
            function (err) { defer.reject(err)}
        );
        return defer.promise;
    };
}])

.controller("tasksCTRL", [ "$scope", "$tasks", function($scope, $tasks){
    const updateList = function () {
        $tasks.getAll().then(function(tasks){
            $scope.tasks = tasks;
        });
    };

    let copy;

    $scope.tasks = [];
    $scope.task = undefined;

    $scope.views = {
        task : false,
        edit : false
    };

    $scope.newTask = () => {
        $scope.views.edit = true;
        $scope.views.task = true;

        $scope.task = {};
    };

    $scope.viewTask = (id) => {
        $scope.edit = false;
        $tasks.get(id).then(function(task){
            $scope.views.task = true;
            $scope.task = task;
        },function(){
            alert("Task MIA");
        })
    };

    $scope.cancelEdit = () => {
        if ( $scope.task.id === undefined ){
            //New Task
            $scope.closeTask();
        } else {
            $scope.task = angular.copy(copy);
            $scope.views.edit = false;
        }

    };

    $scope.editTask = () => {
        copy = angular.copy($scope.task);
        $scope.views.edit = true;
    };

    $scope.saveTask = () => {
        $tasks.post($scope.task).then(function(){
            updateList();
            $scope.closeTask();
        })
    };

    $scope.closeTask = () => {
        $scope.views.edit = false;
        $scope.views.task = false;
        $scope.task = undefined;
    };

    $scope.taskComplete = () => {
        $tasks.delete($scope.task.id).then(
            // Success
            () => {
                $scope.closeTask();
                updateList();
            },
            // Failure
            () => {
                alert("Failed to complete");
            }
        )
    };






    updateList();
}]);