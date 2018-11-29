/*
    Controller written by - Pankaj tanwar
*/
angular.module('userCtrl',['userServices'])

.controller('regCtrl', function ($scope, $http, $timeout, $location,user) {

    var app = this;

    this.regUser = function (regData) {

        app.successMsg = '';
        app.errorMsg = '';
        app.loading = true;

        user.create(app.regData).then(function (data) {

            //console.log(data);
            if(data.data.success) {
                app.loading = false;
                app.successMsg = data.data.message + ' Redirecting to home page...';
                $timeout(function () {
                    $location.path('/');
                }, 2000);
                
            } else {
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
    };
})

.controller('usersCtrl', function (user) {
    var app = this;

    user.getUsers().then(function (data) {

        if(data.data.success) {
            //console.log(app.users);
            app.users = data.data.users;
        } else {
            app.errorMsg = data.data.message;
        }
    });
})

.controller('sellProjectCtrl', function (user, $location) {
    //console.log('Sell your project');
    var app = this;

    app.step = 1;

    app.active = "is-active";
    app.active2 = false;
    app.active3 = false;
    app.active4 = false;

    app.start = function () {
        app.step = 2;
        app.active = false;
        app.active2 = "is-active";
    };
    app.details = function () {
        app.step = 3;
        app.active2 = false;
        app.active3 = "is-active";
    };
    app.price = function () {
        app.step = 4;
        app.active3 = false;
        app.active4 = "is-active";
    };
    app.summary = function () {
        app.step = 1;
    };
    app.detailsback = function () {
        app.step = 1;
        app.active = "is-active";
        app.active2 = false;
    };
    app.priceback = function () {
        app.step = 2;
        app.active2 = "is-active";
        app.active3 = false;
    };

    app.submitProject = function () {
        //console.log('Project Posted Successfully.')
        var projectData = {};

        projectData.projectname = app.projectname;
        projectData.name = app.name;
        projectData.email = app.email;
        projectData.contact = app.contact;
        projectData.demourl = app.demourl;
        projectData.githuburl = app.githuburl;
        projectData.technology = app.technology;
        projectData.description = app.description;
        projectData.projectline = app.projectline;
        projectData.subscriber = app.subscriber;
        projectData.revenue = app.revenue;
        projectData.projectprice = app.projectprice;

        user.submitProject(projectData).then(function (data) {
            //console.log(data);
            if(data.data.success) {
                $location.path('/projectposted')
            } else {
                app.errorMsg = data.data.message;
            }
        });


    }
})

.controller('exploreCtrl', function (user) {
    //console.log('explore project');

    var app = this;

    app.load = false;

    user.getProjects().then(function (data) {
        //console.log(data);
        if(data.data.success) {
            app.projects = data.data.projects;
            app.load = true;
        }
    });
})

.controller('projectCtrl', function (user, $routeParams) {
   //console.log($routeParams.id);

   var app = this;

   user.getProjectInfo($routeParams.id).then(function (data) {
       //console.log(data);
       if(data.data.success) {
           app.projectname = data.data.project.projectname;
           app.description = data.data.project.description;
           app.demourl = data.data.project.demourl;
           app.githuburl = data.data.project.githuburl;
           app.contact = data.data.project.contact;
           app.email = data.data.project.email;
           app.postedbyname = data.data.project.postedbyname;
           app.postedbyusername = data.data.project.postedbyusername;
           app.projectprice= data.data.project.projectprice;
           app.revenue = data.data.project.revenue;
           app.subscriber = data.data.project.subscriber;
           app.sold = data.data.project.sold;
           app.technology = data.data.project.technology;
           app.boughtby = data.data.project.boughtby;

       }
   });
})

.controller('ContactCtrl', function (user, $timeout) {

    var app = this;

    app.sendInfo = function (sendData) {
        //console.log(app.sendData);

        user.sendInfo(app.sendData).then(function (data) {
            //console.log(data);
            if(data.data.success) {
                app.successMsg = data.data.message;
                $timeout(function () {
                    app.successMsg = '';
                    app.sendData.name = '';
                    app.sendData.email = '';
                    app.sendData.message = '';
                }, 1500);
            } else {
                app.errorMsg = data.data.message;
                $timeout(function () {
                    app.errorMsg = '';
                    app.sendData.name = '';
                    app.sendData.email = '';
                    app.sendData.message = '';
                }, 1500);
            }

        });
    }
})

.controller('profileCtrl', function (user,$routeParams, $timeout,$location) {

    var app = this;

    app.pageExist = false;

    //console.log($routeParams.username);
    user.checkUser($routeParams.username).then(function (data) {
        //console.log(data);
        if(data.data.success) {
            app.successMsg = data.data.message;
            app.pageExist = true;
        } else {
            app.errorMsg = data.data.message + ' Redirecting to home page...';
            app.pageExist = false;
            $timeout(function () {
                $location.path('/');
            }, 2000);
        }
    });
});