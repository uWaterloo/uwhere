angular.module('portalApp')
    //Tomas Sucks
    // Widget controller - runs every time widget is shown
    .controller('uwhereCtrl', ['$scope', '$http', '$q', 'uwhereFactory', function($scope, $http, $q, uwhereFactory) {

        // Widget Configuration
        $scope.portalHelpers.config = {
            // make 'widgetMenu.html' the template for the top right menu
            "widgetMenu": "widgetMenu.html"
        };

        // Import variables and functions from service
        $scope.data = uwhereFactory.data;




        $scope.selectData = {};
        $scope.resultList = {};
        $scope.printerList = {};
        $scope.atmList = {};
        //$scope.resultList.title = 'No Results';
        $scope.selectData.availableOptions = [{
                id: '1',
                name: 'Gender Neutral Washrooms',
                table: 'gNeutralBathrooms'
            }, {
                id: '2',
                name: 'Staplers',
                table: 'staplers'
            }, {
                id: '3',
                name: 'Printers',
                table: 'printers'
            }, {
                id: '4',
                name: 'Scanners',
                table: 'scanners'
            }, {
                id: '5',
                name: 'Changing Stations',
                table: 'changingStations'
            }, {
             	id: '6',
                name: 'ATM',
                table: 'atms'
            }

        ];

        /*$scope.portalHelpers.invokeServerFunction('privDataRead').then(function (apiKey) {
    	console.log('priv read result',apiKey);
        // http.get FUNCTION
		$http.get('/Develop/GetProxy?url=https://api.uwaterloo.ca/v2/buildings/list.json?key=' + apiKey)
            .success(function(result) {
				// Handle result
				console.dir(result);
		});
	});*/

        var distance = function(source_long, source_lat, dest_long, dest_lat) {
            var dist_hor = pow(source_long - dest_long, 2);
            var dist_vert = pow(source_lat - dest_lat, 2);
            return sqrt(dist_hor + dist_vert);
        };

        var getValues = function(optionType) {
            console.dir(optionType);
            if (optionType.id == '3') {
                $scope.portalHelpers.invokeServerFunction('privDataRead')
                    .then(function(apiKey) {
                        // http.get FUNCTION
                        $http.get('/Develop/GetProxy?url=https://api.uwaterloo.ca/v2/resources/printers.json?key=' + apiKey)
                            .success(function(result) {
                                // Handle result
                                console.dir(result);
                                $scope.printerList = result.data;
                            	$scope.portalHelpers.showView('printerView.html', 2);
                            	$scope.selectData.selectedOption = '';
                            });
                    });
            } else if (optionType.id == '6') {
                $scope.portalHelpers.invokeServerFunction('privDataRead')
                    .then(function(apiKey) {
                        // http.get FUNCTION
                        $http.get('/Develop/GetProxy?url=https://api.uwaterloo.ca/v2/poi/atms.json?key=' + apiKey)
                            .success(function(result) {
                                // Handle result
                                console.dir(result);
                                $scope.atmList = result.data;
                            	$scope.portalHelpers.showView('atmView.html', 2);
                            	$scope.selectData.selectedOption = '';
                            });
                    });
            }else {
                $scope.portalHelpers.invokeServerFunction('getLocations', {
                    value: optionType.table
                }).then(function(result) {
                    console.dir(result);
                    $scope.resultList = result;
                });
            } 
        };

        $scope.$watch('selectData.selectedOption', function(newValue, oldValue) {
            if (!newValue) {
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
    .factory('uwhereFactory', ['$http', '$rootScope', '$filter', '$q', function($http, $rootScope, $filter, $q) {

        var initialized = {
            value: false
        };

        // Your variable declarations
        var data = {
            value: null
        };

        var init = function($scope) {
            if (initialized.value)
                return;

            initialized.value = true;

            // Place your init code here:
            data.value = {
                message: "What do you need to find?"
            };

        };


        // Expose init(), and variables
        return {
            init: init,
            data: data
        };

    }])
    // Custom directive example
    .directive('uwhereDirectiveName', ['$http', function($http) {
        return {
            link: function(scope, el, attrs) {

            }
        };
    }])
    // Custom filter example
    .filter('uwhereFilterName', function() {
        return function(input, arg1, arg2) {
            // Filter your output here by iterating over input elements
            var output = input;
            return output;
        }
    });