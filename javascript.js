angular.module('portalApp')
//Tomas Sucks
// Widget controller - runs every time widget is shown
.controller('uwhereCtrl', ['$scope', '$http', '$q', 'uwhereFactory', function ($scope, $http, $q, uwhereFactory) {

    // Widget Configuration
    $scope.portalHelpers.config = {
        // make 'widgetMenu.html' the template for the top right menu
        "widgetMenu": "widgetMenu.html"
    };

    // Import variables and functions from service
    $scope.data = uwhereFactory.data;

    $scope.selectData = {};
    $scope.selectData.availableOptions = [
        {id: '1', name: 'Option A'},
        {id: '2', name: 'Option B'}
    ];

    $scope.$watch('selectData.selectedOption', function(newValue, oldValue){
      console.dir('New Value', newValue);
      console.dir('Old Value', oldValue);
    });

    // initialize the service
    uwhereFactory.init($scope);

	// Show main view in the first column
	$scope.portalHelpers.showView('main.html', 1);

}])
// Factory maintains the state of the widget
.factory('uwhereFactory', ['$http', '$rootScope', '$filter', '$q', function ($http, $rootScope, $filter, $q) {

	var initialized = {value: false};

	// Your variable declarations
	var data = {value: null};

	var init = function ($scope) {
		if (initialized.value)
			return;

		initialized.value = true;

		// Place your init code here:
		data.value={message:"What do you need to find?"};
	};


	// Expose init(), and variables
	return {
		init: init,
		data: data
	};

}])
// Custom directive example
.directive('uwhereDirectiveName', ['$http', function ($http) {
	return {
		link: function (scope, el, attrs) {

		}
	};
}])
// Custom filter example
.filter('uwhereFilterName', function () {
	return function (input, arg1, arg2) {
		// Filter your output here by iterating over input elements
		var output = input;
		return output;
	}
});