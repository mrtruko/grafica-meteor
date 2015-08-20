'use strict';

//Ordenes service used to communicate Ordenes REST endpoints
angular.module('ordenes').factory('Ordenes', ['$resource',
	function($resource) {
		return $resource('ordenes/:ordeneId', { ordeneId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);