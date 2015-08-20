'use strict';

angular.module('productos').filter('reverse', [
	function() {
		 return function(items) {
		 	if(items){
		 		 return items.slice().reverse();
		 		}else{
		 			return;
		 		}
		   
		  };
	}
]);