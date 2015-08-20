'use strict';

//Setting up route
angular.module('productos').config(['$stateProvider',
	function($stateProvider) {
		// Productos state routing
		$stateProvider.
		state('incremento', {
			url: '/incremento/:productoId/edit',
			templateUrl: 'modules/productos/views/incremento.client.view.html'
		}).
		state('descuento', {
			url: '/descuento/:productoId/edit',
			templateUrl: 'modules/productos/views/descuento.client.view.html'
		}).
		state('listProductos', {
			url: '/productos',
			templateUrl: 'modules/productos/views/list-productos.client.view.html'
		}).
		state('createProducto', {
			url: '/productos/create',
			templateUrl: 'modules/productos/views/create-producto.client.view.html'
		}).
		state('viewProducto', {
			url: '/productos/:productoId',
			templateUrl: 'modules/productos/views/view-producto.client.view.html'
		}).
		state('editProducto', {
			url: '/productos/:productoId/edit',
			templateUrl: 'modules/productos/views/edit-producto.client.view.html'
		});
	}
]);