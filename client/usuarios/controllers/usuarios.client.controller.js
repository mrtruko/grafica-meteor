'use strict';

// Usuarios controller
angular.module('usuarios').controller('UsuariosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Usuarios',
	function($scope, $stateParams, $location, Authentication, Usuarios) {
		$scope.authentication = Authentication;

		

	$scope.msgAlerta = function(msg,tipo){
    		Messenger.options = {
			extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
			theme: "future"
			}
			//Call
			Messenger().post({
				message:msg,
				showCloseButton: true,
				type: tipo
			});

    	}


		// Create new Usuario
		$scope.create = function(nose) {
			// Create new Usuario object
			$scope.displayName = $scope.firstName +" " +$scope.lastName;
			var usuario = new Usuarios ({
				firstName: this.firstName,
				lastName: this.lastName,
				email: this.email,
				telefono: this.telefono,
				direccion: this.direccion,
				rut: this.rut,
				username : this.username,
				password : this.password,
				displayName : $scope.displayName,
				


			});




			// Redirect after save
			usuario.$save(function(response) {
				$scope.firstName = '';
				$scope.lastName = '';
				$scope.email = '';
				$scope.username = '';
				$scope.password = '';
				$scope.direccion = '';
				$scope.telefono = '';
				$scope.rut = '';
				
				if(nose === 0){ // pIpe
					//$scope.success = "Guardado"; // pIpe
					//$scope.error = "";
					$scope.msgAlerta("Guardado","success");
				}else{
					$scope.msgAlerta("Guardado","success");
					$location.path('usuarios'); // pIpe
				}
			}, function(errorResponse) {
				$scope.success = ""; // pIpe
				//$scope.error = errorResponse.data.message;
				$scope.msgAlerta(errorResponse.data.message,"error");
			});
		};





		// Remove existing Usuario
		$scope.remove = function(usuario) {
			if ( usuario ) { 
				usuario.$remove();

				for (var i in $scope.usuarios) {
					if ($scope.usuarios [i] === usuario) {
						$scope.usuarios.splice(i, 1);
					}
				}
			} else {
				$scope.usuario.$remove(function() {
					$location.path('usuarios');
				});
			}
		};

		// Update existing Usuario
		$scope.update = function(nose) { // pIpe
			var usuario = $scope.usuario;
			usuario.$update(function() {
				if(nose === 0){ // pIpe
					//$scope.success = "Actualizado"; // pIpe
					//$scope.error = "";
					$scope.msgAlerta("Actualizado","success");
				}else{
					$scope.msgAlerta("Actualizado","success");
					$location.path('usuarios'); // pIpe
				}
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Usuarios
		$scope.find = function() {
			$scope.usuarios = Usuarios.query();
		};

		// Find existing Usuario
		$scope.findOne = function() {
			$scope.usuario = Usuarios.get({ 
				usuarioId: $stateParams.usuarioId
			});
		};
	}
]);