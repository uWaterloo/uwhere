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
        {id: '1', name: 'Gender Neutral Washrooms', table: 'gNeutralBathrooms'},
        {id: '2', name: 'Staplers', table: 'staplers'},
        {id: '3', name: 'Printers', table: 'printers'},
        {id: '4', name: 'Scanners', table: 'scanners'},
        {id: '5', name: 'Changing Stations', table: 'changingStations'}

    ];

    $scope.$watch('selectData.selectedOption', function(newValue, oldValue){
      console.dir('New Value');
      console.dir(newValue);
      console.dir('Old Value');
      console.dir(oldValue);
      switch(newValue.id) {
        case 1:
          console.dir('Gender Neutral');
          break;
        case 2:
          console.dir('Staplers');
          break;
        case 3:
          console.dir('Printers');
          break;
        case 4:
          console.dir('Scanners');
          break;
        case 5:
          console.dir('Changin Stations');
          break;
        default:
          console.dir('Not Selected');
      }
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

  var changingStations = [
    {id: '1', buildingName: 'OPT', roomNumber: '1032'},
    {id: '2', buildingName: 'QNC', roomNumber: 'B917'},
    {id: '3', buildingName: 'QNC', roomNumber: '1917'},
    {id: '4', buildingName: 'QNC', roomNumber: '2917'},
    {id: '5', buildingName: 'QNC', roomNumber: '3917'},
    {id: '6', buildingName: 'QNC', roomNumber: '4917'},
    {id: '7', buildingName: 'REN', roomNumber: '1824B'}
  ];

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