'use strict';

//Empresas service used to communicate Empresas REST endpoints
angular.module('empresas').factory('Empresas', ['$resource',
	function($resource) {
		return $resource('empresas/:empresaId', { empresaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);