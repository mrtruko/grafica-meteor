'use strict';

// Productos controller
angular.module('productos').controller('ProductosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Productos','$timeout',
	function($scope, $stateParams, $location, Authentication, Productos,$timeout) {

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


		// Create new Producto
		$scope.create = function(nose) {
			// Create new Producto object
			var producto = new Productos ({
				nombreProducto: this.nombreProducto,
				codigo: this.codigo,
				precioComercial: this.precioComercial,
				precioAgencia: this.precioAgencia,
				cantidad: this.cantidad,
				tipo: this.tipo,
				comerciable: this.comerciable,
				estado: this.estado,
				descripcion: this.descripcion,
				movimientos:{},
			});




			// Redirect after save
			producto.$save(function(response) {
				$scope.nombreProducto = '';
				$scope.codigo = '';
				$scope.precioComercial = '';
				$scope.precioAgencia = '';
				$scope.cantidad = '';
				$scope.tipo = false;
				$scope.comerciable = true;
				$scope.estado = '';
				$scope.descripcion = '';
				if(nose === 0){ // pIpe
					//$scope.success = "Guardado"; // pIpe
					//$scope.error = "";
					$scope.msgAlerta("Guardado","success");
				}else{
					$scope.msgAlerta("Guardado","success");
					$location.path('productos'); // pIpe
				}
			}, function(errorResponse) {
				//$scope.success = ""; // pIpe
				//$scope.error = errorResponse.data.message;
				$scope.msgAlerta(errorResponse.data.message,"error");

			});
		};

		// Remove existing Producto
		$scope.remove = function(producto) {
			if ( producto ) { 
				producto.$remove();

				for (var i in $scope.productos) {
					if ($scope.productos [i] === producto) {
						$scope.productos.splice(i, 1);
					}
				}
			} else {
				$scope.producto.$remove(function() {
					$location.path('productos');
				});
			}
		};

		// Update existing Producto 
		$scope.update = function(nose) { // pIpe
			var producto = $scope.producto;
			producto.$update(function() {
				if(nose === 0){ // pIpe
					//$scope.success = "Actualizado"; // pIpe
					//$scope.error = "";

				$scope.msgAlerta("Actualizado","success");
				}else{
					$location.path('productos'); // pIpe
					$scope.msgAlerta("Actualizado","success");
				}
				
			}, function(errorResponse) {
				//$scope.error = errorResponse.data.message;
				$scope.msgAlerta(errorResponse.data.message,"error");

			});
		};
		$scope.movimientos = function(nose) {
			$scope.stock = true;
			if (this.cantidad % 1 === 0){
				if(this.tipo=== "Descuento" || this.tipo ==="Incremento"){
					if(this.motivo !==""){
						var producto = $scope.producto;
						if(this.cantidad > producto.cantidad){
							$scope.stock = false;
						}
			if(this.tipo==="Descuento"){
				if($scope.stock){
					producto.cantidad = producto.cantidad - this.cantidad;
				}
				
			}else{
				producto.cantidad = parseInt(producto.cantidad) + parseInt(this.cantidad);
				$scope.stock = true;
			}
			if($scope.stock){
				producto.movimientos.push({
            "responsable":Authentication.user.displayName,
            "cantidad":this.cantidad,
            "tipo":this.tipo,
            "fecha" : moment().format("DD/MM/YYYY HH:mm"),
            "motivo":this.motivo
        });
			
			
			producto.$update(function() {
				if(nose === 0){ // pIpe
					//$scope.success = "Actualizado"; // pIpe
					//$scope.error = "";
					$scope.msgAlerta("Actualizado","success");
					$scope.cantidad = "";
					$scope.motivo = "";
					$scope.tipo = false;
				}else{
					$scope.msgAlerta("Actualizado","success");
					$location.path('productos'); // pIpe
				}
				
			}, function(errorResponse) {
				//$scope.success = ""; // pIpe
				//$scope.error = errorResponse.data.message;
				$scope.msgAlerta(errorResponse.data.message,"error");
				});
		}else{
			//$scope.error = "Stock Insuficiente";
			//$scope.success = ""; // pIpe
			$scope.msgAlerta("Stock Insuficiente","error");
		}
			
					}else{
						//$scope.error = "Debe Ingresar el motivo"; // pIpe
						//$scope.success = ""; // pIpe
						
						$scope.msgAlerta("Debe Ingresar el motivo","error");
					}
					
				}else{
					//$scope.error = "Ingrese El Tipo de Movimiento"; // pIpe
					//$scope.success = ""; // pIpe
					
						$scope.msgAlerta("Ingrese El Tipo de Movimiento","error");
				
				}

			}else{
				//$scope.error = "Ingrese Un Numero"; // pIpe
				//$scope.success = ""; // pIpe
				$scope.msgAlerta("Ingrese Un Numero","error");
			}

			
		};

		// Find a list of Productos
		$scope.find = function() {
			$scope.productos = Productos.query();

		};

		// Find existing Producto
		$scope.findOne = function() {
			$scope.producto = Productos.get({ 
				productoId: $stateParams.productoId
			});

		};

		 $scope.print = function () {
    console.log('modal print');

    var table = document.querySelector('#imprimir').innerHTML;
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