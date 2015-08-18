Meteor.startup(function(){
    $("#rut").Rut({
        on_error: function(){ alert('El rut ingresado es incorrecto'); }
    })

});