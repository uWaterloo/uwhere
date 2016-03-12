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
    $scope.resultList = {};
    $scope.resultList.title = 'No Results';
    $scope.selectData.availableOptions = [
        {id: '1', name: 'Gender Neutral Washrooms', table: 'gNeutralBathrooms'},
        {id: '2', name: 'Staplers', table: 'staplers'},
        {id: '3', name: 'Printers', table: 'printers'},
        {id: '4', name: 'Scanners', table: 'scanners'},
        {id: '5', name: 'Changing Stations', table: 'changingStations'}

    ];
    
    $scope.portalHelpers.invokeServerFunction('privDataRead').then(function (result) {
    	console.log('priv read result',result);
	});

    var distance = function(source_long, source_lat, dest_long, dest_lat){
    	var dist_hor = pow(source_long - dest_long, 2);
        var dist_vert = pow(source_lat - dest_lat, 2);
        return sqrt(dist_hor + dist_vert);
    };

    var getValues = function (optionType){
      console.dir(optionType);
      $scope.portalHelpers.invokeServerFunction('getLocations', {
        value: optionType.table
      }).then(function(result) {
          console.dir(result);
          $scope.resultList = result;
        }
      );
    };

    $scope.$watch('selectData.selectedOption', function(newValue, oldValue){
      if(!newValue) {
        console.dir('Not Yet Selected!');
        return;
      }

      getValues(newValue);
      /*switch(newValue.id) {
        case '1':
          console.dir('Gender Neutral');
          $scope.resultList.title = 'Gener Neutral Washrooms';
          break;
        case '2':
          console.dir('Staplers');
          break;
        case '3':
          console.dir('Printers');
          break;
        case '4':
          console.dir('Scanners');
          break;
        case '5':
          console.dir('Changin Stations');
          break;
        default:
          console.error('No ID!');
      }*/
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

    var gNeutralBathrooms = [
        {id: '1', buildingName: 'E2', roomNumber: '3418A'},
        {id: '2', buildingName: 'ECH', roomNumber: '1113'},
        {id: '3', buildingName: 'EIT', roomNumber: '1906'},
        {id: '4', buildingName: 'EIT', roomNumber: '2905'},
        {id: '5', buildingName: 'EIT', roomNumber: '3901'},
        {id: '6', buildingName: 'ESC', roomNumber: '128'},
        {id: '7', buildingName: 'ESC', roomNumber: '339A'},
        {id: '8', buildingName: 'EV1', roomNumber: '321'},
        {id: '9', buildingName: 'EV2', roomNumber: '1032'},
        {id: '10', buildingName: 'LHI', roomNumber: '1665'},
        {id: '11', buildingName: 'NH', roomNumber: '0100'},
        {id: '12', buildingName: 'OPT', roomNumber: '1032'},
        {id: '13', buildingName: 'OPT', roomNumber: '3040'},
        {id: '14', buildingName: 'QNC', roomNumber: 'B917'},
        {id: '15', buildingName: 'QNC', roomNumber: '1917'},
        {id: '16', buildingName: 'QNC', roomNumber: '2917'},
        {id: '17', buildingName: 'QNC', roomNumber: '3917'},
        {id: '18', buildingName: 'QNC', roomNumber: '3943'},
        {id: '19', buildingName: 'QNC', roomNumber: '3944'},
        {id: '20', buildingName: 'QNC', roomNumber: '3946'},
        {id: '21', buildingName: 'QNC', roomNumber: '3947'},
        {id: '22', buildingName: 'QNC', roomNumber: '4917'},
        {id: '23', buildingName: 'QNC', roomNumber: '4943'},
        {id: '24', buildingName: 'QNC', roomNumber: '4944'},
        {id: '25', buildingName: 'QNC', roomNumber: '4946'},
        {id: '26', buildingName: 'QNC', roomNumber: '4947'},
        {id: '27', buildingName: 'QNC', roomNumber: '5943'},
        {id: '27', buildingName: 'QNC', roomNumber: '5944'},
        {id: '29', buildingName: 'QNC', roomNumber: '5946'},
        {id: '30', buildingName: 'QNC', roomNumber: '5947'},
        {id: '31', buildingName: 'RCH', roomNumber: '126'},
        {id: '32', buildingName: 'REN', roomNumber: '1801'},
        {id: '33', buildingName: 'REN', roomNumber: '1802'},
        {id: '34', buildingName: 'REN', roomNumber: '1824A'},
        {id: '35', buildingName: 'REN', roomNumber: '1824B'},
        {id: '36', buildingName: 'REV', roomNumber: '120'},
        {id: '37', buildingName: 'SLC', roomNumber: '1815'},
        {id: '38', buildingName: 'SLC', roomNumber: '1816'},
        {id: '39', buildingName: 'STC', roomNumber: '5904'},
     	{id: '40', buildingName: 'STC', roomNumber: '5906'},
        {id: '41', buildingName: 'STP', roomNumber: '335'},
        {id: '42', buildingName: 'STP', roomNumber: '534'},
        {id: '43', buildingName: 'TC', roomNumber: '2906'},
        {id: '44', buildingName: 'TC', roomNumber: '3906'},
        {id: '45', buildingName: 'V1', roomNumber: '123'},
        {id: '46', buildingName: 'V1', roomNumber: '177'},
        {id: '47', buildingName: 'V1', roomNumber: '205'}
 ];

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