/* 
* @Author: UnS
* @Date:   2015-02-03 10:26:25
* @Last Modified by:   UnS
* @Last Modified time: 2015-03-18 15:10:37
*/

define(['app'], function(app) {
	app.controller('testCtrl', 
	['$scope', '$timeout', '$http' , '$mdToast',
	function ($scope, $timeout, $http, $mdToast) {
		$scope.appName = 'Service Worker on web app (angularJS & requireJS)';
		$scope.todos = [];
	 	$scope.date = new Date();
	 	$scope.isLoad = false;
	 	$scope.save = false;
	 	$scope.t_length =  function () {
	 		return $scope.todos.length;
	 	};
	 	$scope.newTodo = '';
	 	$scope.addTodo = function() {
	 		if ($scope.newTodo === '')
	 			return;
	 		$scope.todos.push({name: $scope.newTodo,done: false});
	 		$scope.newTodo = '';
	 		$scope.saveTodo();
	 	};
	 		

	 	$scope.removeDone = function() {
	 		$scope.todos = _.filter($scope.todos, function(todo) {
	 			return todo.done === false;
	 		});
	 		 
	 	};
	 	$scope.autoLoad = false;
	 	$scope.$watch('autoLoad', function (nv) {
	 		!!nv && $scope.getTodo();
	 	})
	 	$scope.getTodo = function() {
	 		$http({
	 			method: 'GET',
	 			url: 'http://localhost:3000/demo/todo'
	 		}).then(function (res) {
	 			$scope.todos = res.data.todos;
	 			$scope.isLoad = true;
	 		});
	 	};

	 	var toast;
	 	$scope.saveTodo = function () {
	 		$http({
	 			method: 'PUT',
	 			url: 'http://localhost:3000/demo/todo',
	 			headers: {
	 				'Content-Type': 'application/json'
	 			},
	 			data: {todos: $scope.todos}
	 		}).then(function (res) {
	 			toast = $mdToast.simple().textContent('Saved!').position('top left').hideDelay(5000);
	 			$mdToast.show(toast);
	 			$scope.getTodo();
	 		}, function (error) {
	 			toast = $mdToast.simple().textContent("Cannot save, you're being OFFLINE!").position('top left').hideDelay(5000);
	 			$mdToast.show(toast);
	 		})
	 	};
	}]);
});