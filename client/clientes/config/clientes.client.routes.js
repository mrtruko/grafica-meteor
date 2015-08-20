'use strict';

//Setting up route
angular.module('clientes').config(['$stateProvider',
	function($stateProvider) {
		// Clientes state routing
		$stateProvider.
		state('agenda', {
			url: '/agenda',
			templateUrl: 'client/clientes/views/agenda.client.ng.html'
		}).
		state('listClientes', {
			url: '/clientes',
			templateUrl: 'client/clientes/views/list-clientes.client.ng.html'
		}).
		state('createCliente', {
			url: '/clientes/create',
			templateUrl: 'client/clientes/views/create-cliente.client.ng.html'
		}).
		state('viewCliente', {
			url: '/clientes/:clienteId',
			templateUrl: 'client/clientes/views/view-cliente.client.ng.html'
		}).
		state('editCliente', {
			url: '/clientes/:clienteId/edit',
			templateUrl: 'client/clientes/views/edit-cliente.client.ng.html'
		});
	}
]);