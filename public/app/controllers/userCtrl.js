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
            console.log(app.users);
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
        console.log('Project Posted Successfully.')
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
            console.log(data);
            if(data.data.success) {
                $location.path('/projectposted')
            } else {
                app.errorMsg = data.data.message;
            }
        });


    }
});