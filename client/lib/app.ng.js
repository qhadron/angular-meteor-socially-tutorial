/* global app */
/// <reference path="../../typings/angular-meteor/angular-meteor.d.ts"/>

/** Angluar */
app = angular.module('socially', [
	'angular-meteor',
	'ui.router',
	'angularUtils.directives.dirPagination'
]);


app.config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('client/common/views/pagination.ng.html');
});
