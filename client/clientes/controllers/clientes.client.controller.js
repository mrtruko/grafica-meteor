'use strict';

// Clientes controller
angular.module('clientes').controller('ClientesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clientes','Ordenes',
	function($scope, $stateParams, $location, Authentication, Clientes, Ordenes) {
		$scope.authentication = Authentication;

		//if(Authentication.user.roles[0]!=="Recepcionista") $location.path('/#!/');


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


		// Create new Cliente
		$scope.create = function(nose) {
			// Create new Cliente object
			var cliente = new Clientes ({
				rut: this.rut,
				nombreCliente: this.nombreCliente,
				apellidoCliente: this.apellidoCliente,
				email: this.email,
				fono: this.fono,
				direccion: this.direccion,
			});


	
			// Redirect after save
			cliente.$save(function(response) {
				$scope.rut = '';
				$scope.nombreCliente = '';
				$scope.apellidoCliente = '';
				$scope.email = '';
				$scope.fono = '';
				$scope.direccion = '';
				
				if(nose === 0){ // pIpe
					//$scope.success = "Guardado"; // pIpe
					//$scope.error = "";
					$scope.msgAlerta("Guardado","success");
				}else{
					$scope.msgAlerta("Guardado","success");
					$location.path('clientes'); // pIpe
				}
			}, function(errorResponse) {
				//$scope.success = ""; // pIpe
				//$scope.error = errorResponse.data.message;
				$scope.msgAlerta(errorResponse.data.message,"error");
			});
		};


		

		// Remove existing Cliente
		$scope.remove = function(cliente) {
			if ( cliente ) { 
				cliente.$remove();
				
				for (var i in $scope.clientes) {
					if ($scope.clientes [i] === cliente) {
						$scope.clientes.splice(i, 1);
					}
				}
			} else {
				$scope.cliente.$remove(function() {
					$location.path('clientes');
				});
			}
		};

		// Update existing Cliente
		
		$scope.update = function(nose) {
			var cliente = $scope.cliente;
			cliente.$update(function() {
				if(nose === 0){
					//$scope.success = "Actualizado";
					$scope.msgAlerta("Actualizado","success");
				}else{
					$scope.msgAlerta("Actualizado","success");
					$location.path('clientes');
				}
				
			}, function(errorResponse) {
				//$scope.error = errorResponse.data.message;
				$scope.msgAlerta(errorResponse.data.message,"error");

			});
		};


		$scope.remove = function(cliente) {
			if ( cliente ) { 
				cliente.$remove();

				for (var i in $scope.clientes) {
					if ($scope.clientes [i] === cliente) {
						$scope.clientes.splice(i, 1);
					}
				}
			} else {
				$scope.cliente.$remove(function() {
					$location.path('clientes');
				});
			}
		};

		// Find a list of Clientes
		$scope.find = function() {
			$scope.clientes = Clientes.query();
			$scope.ordenes = Ordenes.query();
		};

		// formulario cliente

		$scope.formVisibility=false;
		$scope.ShowForm=function(){
			$scope.formVisibility=true;
			console.log($scope.formVisibility)



		}

		$scope.formVisibility=false;
		$scope.HideForm=function(){
			$scope.formVisibility=false;
			console.log($scope.formVisibility)



		}

		// Find existing Cliente
		$scope.findOne = function() {
			$scope.cliente = Clientes.get({ 
				clienteId: $stateParams.clienteId
			});
		};
		
		$scope.clienteAgenda = function(id){
			$scope.cliente = Clientes.get({ 

				clienteId: id

			});
			
		}


	
		$scope.handleSliderNav = function (cliente) {
		//$('#address-book').sliderNav();

  
			var contact_card = $('#contact-card');
			$('#contact-card').show();
			//Get the name clicked on

			//Set the name
			$scope.filtro = cliente._id;
			$('#contact-card .panel-title').html(cliente.nombreCliente);
			$('#contact-card #card-name').html(cliente.nombreCliente);
			$('#contact-card #card-rut').html(cliente.rut);
			$('#contact-card #card-apellidoCliente').html(cliente.apellidoCliente);
			$('#contact-card #card-email').html(cliente.email);
			$('#contact-card #card-fono').html(cliente.fono);
			$('#contact-card #card-direccion').html(cliente.direccion);


			//Randomize the image
			var img_id = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
			//Set the image
			$('#contact-card .headshot img').attr('src', '/modules/core/img/addressbook/'+img_id+'.jpg');
			contact_card.removeClass('animated fadeInUp').addClass('animated fadeInUp');
			var wait = window.setTimeout( function(){
				contact_card.removeClass('animated fadeInUp')},
				1300
			);

	}





	






	
	}
]);