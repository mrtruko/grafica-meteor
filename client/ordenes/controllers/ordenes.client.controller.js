'use strict';

// Ordenes controller
angular.module('ordenes').controller('OrdenesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ordenes', 'Clientes', 'Empresas','Productos',
	function($scope, $stateParams, $location, Authentication, Ordenes, Clientes, Empresas, Productos) {
		$scope.Math = window.Math;
		$scope.productosOrdenObjs = [];
		$scope.authentication = Authentication;
		$scope.productosOrden = [];
		$scope.fecha = moment().format("DD-MM-YYYY");
		$scope.hora = moment().format("HH:mm");
		$scope.mostrarCliente = true;
		$scope.observacion ="";
		$scope.vendedora = $scope.authentication.user.displayName;
		$scope.fechaCompromiso ="";
		$scope.total = 0;
		$scope.neto = 0;
		$scope.abono1 = 0;
		$scope.iva = 0;
		$scope.saldo = 0;

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
    	$scope.terminada = function(ordene1){
    		ordene1.estado = "Finalizada";
    		ordene1.$update(function(response) {
				
				$scope.msgAlerta("Actualizada","Success");
				// Clear form fields
			}, function(errorResponse) {
				$scope.msgAlerta(errorResponse.data.message,"error");
			});
				

    	}
		// Create new Ordene
		$scope.create = function() {
			// Create new Ordene object
			var ordene = new Ordenes ({
				cliente:$scope.cliente,
				empresa:$scope.empresa,
				productos:$scope.productosOrden,
				observacion:$scope.observacion,
				fecha:$scope.fecha,
				hora:$scope.hora,
				fechaCompromiso:$scope.fechaCompromiso,
				estado:"Inicial",
				abono:$scope.abono1,
				neto:$scope.neto,
				iva:$scope.iva,
				total:$scope.total,
				responsable:$scope.vendedora,
				saldo:$scope.saldo,
				mostrarCliente:$scope.mostrarCliente,

			});
			// Redirect after save
			ordene.$save(function(response) {
				$location.path('ordenes/' + response._id);
				angular.forEach($scope.productosOrdenObjs, function(value, key) {
				angular.forEach($scope.productosOrden, function(valuePro, keyPro) {
					if(value.codigo===valuePro.codigo){
						console.log("descontar");
						value.cantidad = value.cantidad - valuePro.cantidad;
						value.movimientos.push({
				            "responsable":Authentication.user.displayName,
				            "cantidad":valuePro.cantidad,
				            "fecha" : moment().format("DD/MM/YYYY HH:mm"),
				            "motivo":"Orden de Trabajo",
				            "tipo":"orden"
				        });
					}

				});
				value.$update(function(response) {
				console.log(1);
				$scope.msgAlerta("Guardado","Success");
				// Clear form fields
			}, function(errorResponse) {
				$scope.msgAlerta(errorResponse.data.message,"error");
			});
				
			});
				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.msgAlerta(errorResponse.data.message,"error");
			});
		};

		// Remove existing Ordene
		$scope.remove = function(ordene) {
			if ( ordene ) { 
				ordene.$remove();
				for (var i in $scope.ordenes) {
					if ($scope.ordenes [i] === ordene) {
						$scope.ordenes.splice(i, 1);
					}
				}
			} else {
				$scope.ordene.$remove(function() {
					$location.path('ordenes');
				});
			}
		};
		// Update existing Ordene
		$scope.update = function() {
			var ordene = $scope.ordene;

			ordene.$update(function() {
				$location.path('ordenes/' + ordene._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		// Find a list of Ordenes
		$scope.find = function() {
			$scope.find2();
			$scope.find3();
			$scope.find4();
			$scope.ordenes = Ordenes.query();
		};
		$scope.find2 = function() {
			$scope.empresas = Empresas.query();
		};
		$scope.find3 = function() {
			$scope.clientes = Clientes.query();
		};

		$scope.find4= function()   {

			$scope.productos = Productos.query();
		};

		// Find existing Ordene
		$scope.findOne = function() {
			$scope.ordene = Ordenes.get({ 
				ordeneId: $stateParams.ordeneId
			});
		};

		$scope.formWizard = function() {	

			$(".uniform").uniform();
				FormWizard.init();
		};
		$scope.alerta = function(empresa){
			$scope.empresa = empresa;
		}
		$scope.alerta1 = function(cliente){
			$scope.cliente = cliente;
		}
		$scope.alerta3 = function(ordene){
			$scope.ordene = ordene;
			$scope.mostrar = true;
		}
		$scope.motrarCliente = function(){
			$scope.mostrarCliente = true;
		}
		$scope.mostrarEmpresa = function(){
			$scope.mostrarCliente = false;
		}
		$scope.alerta2 = function(producto){
			$scope.agregar = true;
			$scope.seguir = true;
			angular.forEach($scope.productosOrden, function(value, key) {
				if($scope.seguir){
					if(producto.codigo===value.codigo){
			 		console.log("No Agregar");
			 		$scope.agregar = false;
			 		$scope.seguir = false;
			 	}else{
			 		$scope.agregar = true;
			 		console.log("Agregar");
			 	}
				}
			 	
			});
			if($scope.agregar){
				$scope.productosOrdenObjs.push(producto);
				$scope.productosOrden.push({'id':producto._id, 'codigo':producto.codigo, 'nombreProducto': producto.nombreProducto,'precio':0, 'cantidad':0,'precioComercial':producto.precioComercial,'precioAgencia':producto.precioAgencia,'cantidadP':producto.cantidad });
			}
			$scope.calcularTotal();
		}
		$scope.calcularTotal =  function(){
			$scope.total = 0;
			angular.forEach($scope.productosOrden, function(value, key) {
				$scope.total = $scope.total + value.precio;
			 	console.log($scope.total);
			});
			$scope.neto = window.Math.round($scope.total / 1.19);
			$scope.iva = $scope.total - $scope.neto;
			$scope.abono();
		}
		$scope.calcular = function(precio,cantidad){
			if(cantidad === "") cantidad = 0;
			$scope.calcularTotal();
			return precio * cantidad;
		}
		 $scope.eliminar = function(index){
		    // remove the row specified in index
		    $scope.productosOrden.splice( index, 1);
		    $scope.productosOrdenObjs.splice( index, 1);
		    // if no rows left in the array create a blank array
		    if ($scope.productosOrden.length === 0){
		      $scope.productosOrden = [];
		      $scope.productosOrdenObjs = []
		    }
		    $scope.calcularTotal();
		  };
		 $scope.abono = function(abono1){
		 	$scope.saldo = $scope.total - abono1;
		 }
		   $scope.print = function () {
    console.log('modal print');
    var table = document.querySelector('#impresion').innerHTML;
    var myWindow = window.open('', 'Bodega', 'height=700,width=1200');
        myWindow.document.write('<html><head><title>Bodega</title>');
        myWindow.document.write('<link rel="stylesheet" href="http://127.0.0.1:3000/tema/css/cloud-admin.css" type="text/css" />');
        myWindow.document.write('<style>.codigo {display: none;}</style>');
        myWindow.document.write('<img src="http://stwg.cl/img/freeze/logo.png" alt="Cloud Admin Logo" class="img-responsive" height="30" width="120">');
        myWindow.document.write('</head><body>');
        myWindow.document.write(table);
        myWindow.document.write('<script>window.print();</script>');
        myWindow.document.write('</body></html>');
  };






	}
]);