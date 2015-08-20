'use strict';

//Setting up route
angular.module('ordenes').config(['$stateProvider',
	function($stateProvider) {
		// Ordenes state routing
		$stateProvider.
		state('listOrdenes', {
			url: '/ordenes',
			templateUrl: 'modules/ordenes/views/list-ordenes.client.view.html'
		}).
		state('createOrdene', {
			url: '/ordenes/create',
			templateUrl: 'modules/ordenes/views/create-ordene.client.view.html'
		}).
		state('viewOrdene', {
			url: '/ordenes/:ordeneId',
			templateUrl: 'modules/ordenes/views/view-ordene.client.view.html'
		}).
		state('editOrdene', {
			url: '/ordenes/:ordeneId/edit',
			templateUrl: 'modules/ordenes/views/edit-ordene.client.view.html'
		});
	}
]);