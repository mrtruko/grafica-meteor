'use strict';

// Empresas controller
angular.module('empresas').controller('EmpresasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Empresas','Ordenes',
	function($scope, $stateParams, $location, Authentication, Empresas, Ordenes) {
		$scope.authentication = Authentication;

		// Create new Empresa

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


		$scope.create = function(nose) {
			// Create new Empresa object
			var empresa = new Empresas ({
				rutEmpresa: this.rutEmpresa,
				nombreEmpresa: this.nombreEmpresa,
				direccionEmpresa: this.direccionEmpresa,
				giro: this.giro,
				ciudadEmpresa: this.ciudadEmpresa,
				fonoEmpresa: this.fonoEmpresa,
				rut: this.rut,
				nombrec: this.nombrec,
				apellidoc: this.apellidoc,
				email: this.email,
				fono: this.fono,
			mailempresa: this.mailempresa,
			
				

			});




	

			// Redirect after save
			empresa.$save(function(response) {
				$scope.rutEmpresa = '';
				$scope.nombreEmpresa = '';
				$scope.direccionEmpresa = '';
				$scope.giro = '';
				$scope.ciudadEmpresa = '';
				$scope.fonoEmpresa = '';
				$scope.rut = '';
				$scope.nombrec = '';
				$scope.apellidoc = '';
				$scope.email = '';
				$scope.fono = '';
				$scope.mailempresa = '';
				
				if(nose === 0){ // pIpe
					//$scope.success = "Guardado"; // pIpe
					//$scope.error = "";
					$scope.msgAlerta("Guardado","success");
				}else{
					$scope.msgAlerta("Guardado","success");
					$location.path('empresas'); // pIpe
				}
			}, function(errorResponse) {
				//$scope.success = ""; // pIpe
				//$scope.error = errorResponse.data.message;
				$scope.msgAlerta(errorResponse.data.message,"error");
			});
		};

		// Remove existing Empresa
		$scope.remove = function(empresa) {
			if ( empresa ) { 
				empresa.$remove();

				for (var i in $scope.empresas) {
					if ($scope.empresas [i] === empresa) {
						$scope.empresas.splice(i, 1);
					}
				}
			} else {
				$scope.empresa.$remove(function() {
					$location.path('empresas');
				});
			}
		};

		// Update existing Producto
		$scope.update = function(nose) {
			var empresa = $scope.empresa;
			empresa.$update(function() {
				if(nose === 0){
					//$scope.success = "Actualizado";

					$scope.msgAlerta("Actualizado","success");

				}else{
					$scope.msgAlerta("Actualizado","success");
					$location.path('empresas');
				}
				
			}, function(errorResponse) {
				//$scope.error = errorResponse.data.message;
				$scope.msgAlerta(errorResponse.data.message,"error");

			});
		};

		// Find a list of Empresas
		$scope.find = function() {
			$scope.empresas = Empresas.query();
			$scope.ordenes = Ordenes.query();

		};

		// Find existing Empresa
		$scope.findOne = function() {
			$scope.empresa = Empresas.get({ 
				empresaId: $stateParams.empresaId
			});
			
		};




		$scope.clienteAgenda = function(id){
			$scope.empresa = Empresas.get({ 

				empresaId: id

			});
			
		}
		$scope.alerta = function(empresa){
			alert(empresa);
		}
		$scope.handleSliderNav = function (empresa) {

		//$('#address-book').sliderNav();
			var contact_card = $('#contact-card');
			$('#contact-card').show();
			//Get the name clicked on

			//Set the name
			$scope.filtro = empresa._id;
			$('#contact-card .panel-title').html(empresa.nombreEmpresa);
			$('#contact-card #card-name').html(empresa.nombreEmpresa);
			$('#contact-card #card-rutEmpresa').html(empresa.rutEmpresa);
			$('#contact-card #card-direccionEmpresa').html(empresa.direccionEmpresa);
			$('#contact-card #card-giro').html(empresa.giro);
			$('#contact-card #card-ciudadEmpresa').html(empresa.ciudadEmpresa);
			$('#contact-card #card-rut').html(empresa.rut);
			$('#contact-card #card-nombrec').html(empresa.nombrec);
			$('#contact-card #card-apellidoc').html(empresa.apellidoc);
			$('#contact-card #card-email').html(empresa.email);
			$('#contact-card #card-fono').html(empresa.fono);
			$('#contact-card #card-mailempresa').html(empresa.mailempresa);
			
			
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