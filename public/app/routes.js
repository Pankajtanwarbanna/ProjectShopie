var app = angular.module('userRoutes', ['ngRoute'])

    .config(function ($routeProvider, $locationProvider) {
        $routeProvider

            /*
            .when('/register', {
                templateUrl : '/app/views/users/register.html',
                controller : 'regCtrl',
                controllerAs : 'register',
                authenticated : false
            })

            .when('/logout', {
                templateUrl : '/app/views/users/logout.html',
                authenticated : false,
                controller : 'editCtrl',
                controllerAs : 'edit'
            })

            .when('/users/:username', {
                templateUrl : '/app/views/users/userProfile.html',
                authenticated : true,
                controller : 'profileCtrl',
                controllerAs : 'profile'
            })
            */

            .when('/logout', {
                templateUrl : '/app/views/users/logout.html',
                authenticated : false
            })

            .when('/admin-login', {
                templateUrl : 'app/views/users/admin-login.html',
                authenticated : false,
                controller : 'regCtrl',
                controllerAs : 'register'
            })

            .when('/contact', {
                templateUrl : '/app/views/pages/contact.html',
                authenticated : false,
                controller : 'ContactCtrl',
                controllerAs : 'contact'
            })

            .when('/services', {
                templateUrl : '/app/views/pages/services.html',
                authenticated : false
            })

            .when('/activate/:token', {
                templateUrl : '/app/views/users/activation/activate.html',
                authenticated : false,
                controller : 'emailCtrl',
                controllerAs : 'email'
            })

            .when('/resend', {
                templateUrl : '/app/views/users/activation/resend.html',
                authenticated : false,
                controller : 'resendCtrl',
                controllerAs : 'resend'
            })

            .when('/forgot', {
                templateUrl : '/app/views/users/forgot.html',
                authenticated : false,
                controller : 'forgotCtrl',
                controllerAs : 'forgot'
            })

            .when('/forgotPassword/:token', {
                templateUrl : 'app/views/users/resetPassword.html',
                authenticated : false,
                controller : 'resetCtrl',
                controllerAs : 'reset'
            })

            .when('/management', {
                templateUrl : 'app/views/admin/management.html',
                authenticated : true,
                controller : 'managementCtrl',
                controllerAs : 'management',
                permission : 'admin'
            })

            .when('/project-management', {
                templateUrl : 'app/views/admin/project-management.html',
                authenticated : true,
                controller : 'projectManagementCtrl',
                controllerAs : 'projectmanagement',
                permission : 'admin'
            })

            .when('/edit/:id', {
                templateUrl : 'app/views/admin/edit.html',
                authenticated : true,
                controller : 'editCtrl',
                controllerAs : 'edit',
                permission : 'admin'
            })

            .when('/sell-project', {
                templateUrl : 'app/views/users/sell-project.html',
                authenticated : true,
                controller : 'sellProjectCtrl',
                controllerAs : 'sellProject'
            })

            .when('/projectposted' , {
                templateUrl : 'app/views/users/projectposted.html',
                authenticated : true
            })

            .when('/explore' , {
                templateUrl : 'app/views/users/explore.html',
                controller : 'exploreCtrl',
                controllerAs : 'explore'
            })

            .when('/project/:id', {
                templateUrl : 'app/views/users/project.html',
                controller : 'projectCtrl',
                controllerAs : 'project'
            })

            .otherwise( { redirectTo : '/'});

        $locationProvider.html5Mode({
            enabled : true,
            requireBase : false
        })
    });

app.run(['$rootScope','auth','$location', 'user', function ($rootScope,auth,$location,user) {

    $rootScope.$on('$routeChangeStart', function (event, next, current) {

        if(next.$$route) {

            if(next.$$route.authenticated === true) {

                if(!auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/');
                } else if(next.$$route.permission) {

                    user.getPermission().then(function (data) {

                        if(next.$$route.permission !== data.data.permission) {
                            event.preventDefault();
                            $location.path('/');
                        }

                    });
                }

            } else if(next.$$route.authenticated === false) {

                if(auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/profile');
                }

            } /*else {
                console.log('auth doesnot matter');
            }
            */
        } /*else {
            console.log('Home route is here');
        }
*/
    })
}]);

