/*
    Services written by - Pankaj tanwar
*/
angular.module('userServices',[])

.factory('user', function ($http) {
    var userFactory = {};

    // user.create(regData);
    userFactory.create = function (regData) {
        return $http.post('/api/register' , regData);
    };

    // user.activateAccount(token);
    userFactory.activateAccount = function (token) {
        return $http.put('/api/activate/'+token);
    };

    // user.resendLink(logData);
    userFactory.checkCredientials = function (logData) {
        return $http.post('/api/resend',logData);
    };

    // user.resendEmail(username);
    userFactory.resendEmail = function (username) {
        return $http.put('/api/sendlink', username);
    };

    // user.forgotUsername(email);
    userFactory.forgotUsername = function (email) {
        return $http.post('/api/forgotUsername', email);
    };

    // user.forgotPasswordLink(username);
    userFactory.forgotPasswordLink = function (username) {
        return $http.put('/api/forgotPasswordLink', username);
    };

    // user.forgotPasswordCheckToken(token);
    userFactory.forgotPasswordCheckToken = function (token) {
        return $http.post('/api/forgotPassword/'+token);
    };

    // user.resetPassword(token,password);
    userFactory.resetPassword = function (token,password) {
        return $http.put('/api/resetPassword/'+token, password);
    };

    // user.getPermission();
    userFactory.getPermission = function () {
        return $http.get('/api/permission');
    };

    // get users from database
    userFactory.getUsers = function () {
        return $http.get('/api/management/');
    };

    // get user from id
    userFactory.getUser = function(id) {
        return $http.get('/api/edit/' + id);
    };

    //delete user from database
    userFactory.deleteUser = function (username) {
        return $http.delete('/api/management/'+username);
    };

    // edit details of user
    userFactory.editUser = function (id) {
        return $http.put('/api/edit/', id);
    };

    // Submit project
    userFactory.submitProject = function (projectData) {
        return $http.post('/api/submitProject', projectData);
    };

    // get all successfully posted projects
    userFactory.getProjects = function () {
        return $http.get('/api/getProjects');
    };

    // get project info
    userFactory.getProjectInfo = function (id) {
        return $http.get('/api/getProjectInfo/'+ id);
    };

    // contact page send info to me
    userFactory.sendInfo  = function (sendData) {
        return $http.post('/api/sendInfo', sendData);
    };

    // verify user profile page
    userFactory.checkUser = function (username) {
        return $http.post('/api/checkUser/'+ username);
    };

    // delete project by admin
    userFactory.deleteProject = function (id) {
        return $http.post('/api/deleteProject/'+ id);
    };

    return userFactory;
});