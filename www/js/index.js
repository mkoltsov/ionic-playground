angular.module('ionicApp', ['ionic', 'chart.js'])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('eventmenu', {
                url: "/event",
                abstract: true,
                templateUrl: "templates/event-menu.html"
            })
            .state('eventmenu.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home.html"
                    }
                }
            })
            .state('eventmenu.checkin', {
                url: "/check-in",
                views: {
                    'menuContent': {
                        templateUrl: "templates/check-in.html",
                        controller: "CheckinCtrl"
                    }
                }
            })
            .state('eventmenu.attendees', {
                url: "/attendees",
                views: {
                    'menuContent': {
                        templateUrl: "templates/attendees.html",
                        controller: "AttendeesCtrl"
                    }
                }
            });

        $urlRouterProvider.otherwise("/event/home");
    })

    .controller('MainCtrl', function ($scope, $ionicSideMenuDelegate, $http, $ionicModal, $timeout, $location,$interval) {
        $scope.hide = true;
        $scope.coloredText = 'regular-text';

        $interval(function () {
            $scope.coloredText = 'danger-text blink';
            //$cordovaToast.show('this is a test', 'long', 'center').then(function (success) {
            //    console.log("The toast was shown");
            //}, function (error) {
            //    console.log("The toast was not shown due to " + error);
            //});
        }, 130000);
        $scope.config = {
            tooltips: false,
            labels: false,
            mouseover: function () {
            },
            mouseout: function () {
            },
            click: function () {
            },
            legend: {
                display: false,
                //could be 'left, right'
                position: 'right'
            }
        };
        $scope.labels = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00'];
        //$scope.attendees = [
        //    {firstname: 'Nataliya', lastname: 'Biletska', arrived: false},
        //    {firstname: 'Bogdan', lastname: 'Bibikov', arrived: false},
        //    {firstname: 'Bogdan', lastname: 'Koltsov', arrived: true},
        //    {firstname: 'Andrey', lastname: 'Osockii', arrived: true}
        //];
        $scope.genLightness= 5;
        //function(){return 70+Math.random()*10;};
        $scope.genHeartRate=79;
        $interval(function(){$scope.genLightness= Math.floor($scope.genLightness +Math.random()*5,2);}, Math.random()*40000);
        $interval(function(){$scope.genHeartRate= Math.floor($scope.genHeartRate +Math.random()*10,2);}, Math.random()*90000);
        //function(){return 92+Math.random()*10;};

        $scope.parameters = [{lightness:89,heartrate:99,pulse:56, overall:77, lastname:'Nataliya Biletska', arrived:true},
            {lightness:"n/a",heartrate:"n/a",pulse:"n/a", overall:"n/a", lastname:'Bogdan Bibikov', arrived:false},
            {lightness:"n/a",heartrate:"n/a",pulse:"n/a", overall:"n/a", lastname:'Mikhail Koltsov', arrived:false},
            {lightness:"n/a",heartrate:"n/a",pulse:"n/a", overall:"n/a", lastname:'Andrey Osockii', arrived:false}
        ];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40]];

        //function getData(id){
        //    var data = [
        //        [65, 59, 80, 81, 56, 55, 40],
        //        [28, 48, 40, Math.random() * 100, 86, 27, 90]];
        //    if ($scope.parameters[id].arrived === true){
        //        return data[id];
        //    }
        //    return [];
        //};



        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
                $scope.modal.hide();
            $scope.hide = true;
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
                $scope.hide = false;
            }, 1000);
        };

        //$scope.showActionsheet = function(){
        //    $http.get('http://api.clickatell.com/http/sendmsg?user=mkoltsov&password=ZHLBZKeVdPEJBd&api_id=3539102&to=48731383784&text=chef');
        //};
        $timeout(function () {
            $scope.login();
        }, 1000);
        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
        $location.path('/event/home');
    })

    .controller('CheckinCtrl', function ($scope) {
        $scope.showForm = true;

        $scope.shirtSizes = [
            {text: 'Polish', value: 'L'},
            {text: 'English', value: 'M'},
            {text: 'Deutsch', value: 'S'}
        ];
        $scope.firstName='Mikhail';
        $scope.lastName='Koltsov';
        $scope.attendee = {};
        $scope.submit = function () {
            if (!$scope.attendee.firstname) {
                alert('Info required');
                return;
            }
            $scope.showForm = false;
            $scope.attendees.push($scope.attendee);
        };

    })

    .controller('AttendeesCtrl', function ($scope) {

        $scope.activity = [];
        $scope.arrivedChange = function () {
            $scope.data.push([Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100]);
        };

    })

    .run(function ($rootScope, $ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
        //$rootScope.login();
    });