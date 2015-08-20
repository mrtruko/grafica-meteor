'use strict';

(function() {
	// Ordenes Controller Spec
	describe('Ordenes Controller Tests', function() {
		// Initialize global variables
		var OrdenesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Ordenes controller.
			OrdenesController = $controller('OrdenesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Ordene object fetched from XHR', inject(function(Ordenes) {
			// Create sample Ordene using the Ordenes service
			var sampleOrdene = new Ordenes({
				name: 'New Ordene'
			});

			// Create a sample Ordenes array that includes the new Ordene
			var sampleOrdenes = [sampleOrdene];

			// Set GET response
			$httpBackend.expectGET('ordenes').respond(sampleOrdenes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ordenes).toEqualData(sampleOrdenes);
		}));

		it('$scope.findOne() should create an array with one Ordene object fetched from XHR using a ordeneId URL parameter', inject(function(Ordenes) {
			// Define a sample Ordene object
			var sampleOrdene = new Ordenes({
				name: 'New Ordene'
			});

			// Set the URL parameter
			$stateParams.ordeneId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/ordenes\/([0-9a-fA-F]{24})$/).respond(sampleOrdene);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ordene).toEqualData(sampleOrdene);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Ordenes) {
			// Create a sample Ordene object
			var sampleOrdenePostData = new Ordenes({
				name: 'New Ordene'
			});

			// Create a sample Ordene response
			var sampleOrdeneResponse = new Ordenes({
				_id: '525cf20451979dea2c000001',
				name: 'New Ordene'
			});

			// Fixture mock form input values
			scope.name = 'New Ordene';

			// Set POST response
			$httpBackend.expectPOST('ordenes', sampleOrdenePostData).respond(sampleOrdeneResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Ordene was created
			expect($location.path()).toBe('/ordenes/' + sampleOrdeneResponse._id);
		}));

		it('$scope.update() should update a valid Ordene', inject(function(Ordenes) {
			// Define a sample Ordene put data
			var sampleOrdenePutData = new Ordenes({
				_id: '525cf20451979dea2c000001',
				name: 'New Ordene'
			});

			// Mock Ordene in scope
			scope.ordene = sampleOrdenePutData;

			// Set PUT response
			$httpBackend.expectPUT(/ordenes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/ordenes/' + sampleOrdenePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid ordeneId and remove the Ordene from the scope', inject(function(Ordenes) {
			// Create new Ordene object
			var sampleOrdene = new Ordenes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Ordenes array and include the Ordene
			scope.ordenes = [sampleOrdene];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/ordenes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOrdene);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.ordenes.length).toBe(0);
		}));
	});
}());