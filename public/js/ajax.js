$(function (){
    /* Configuraciones de cabeceras de ajax para la peticion http */
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    });
    /* Cuando el usuario hace click en el boton añadir */
    $('#create-user').click( function(){
        //Cambiamos el valor del boton del modal
        $('#btn-save').val("Guardar");
        //Reseteamos el formulario
        $('#userForm').trigger('reset');
        //Cambiamos el titulo del modal
        $('#userCrudModal').html("Adicionar nuevo Usuario");
        //Mostramos el modal
        $('#ajax-crud-modal').modal('show');
    });

    /* Cuando el usuario hace click en el boton editar */
    $('button[id=edit-users]').on('click', function(){
        /* Obtenemos una referencia del id actual */
        var user_id = $(this).data("id");
        /* Realizamos la petición de tipo get a la url edit del Controlador y este nos retorna una función con los datos */
        $.get('Users/' + user_id + '/edit', function(data){
            //Cambiamos el titulo del modal
            $('#userCrudModal').html('Editar Usuario');
            //Cambiamos el valor del boton del modal
            $('#btn-save').val('Editar Usuario');
            //Mostramos el modal
            $('#ajax-crud-modal').modal('show');
            //Cambiamos el valor de la fila actual
            $('#user_id').val(data.id);
            //Cambiamos el valor en el input name
            $('#name').val(data.name);
            //Cambiamos el valor en el input password
            $('#pass').val(data.password);
            //Cambiamos el valor en el input email
            $('#email').val(data.email);
        });
    });

    /* Cuando el usuario hace click en el boton eliminar */
    $('body').on('click', '#delete-user', function(){
        //Obtenemos una referencia del id actual
        var user_id = $(this).data('id');
        //Si el usuario confirma eliminar el registro
        if(confirm("Esta seguro que desea eliminar al usuario " + user_id + "?")){
            //Realizamos la peticion de tipo Delete a la url del controlodaor delete con el id actual del usuario seleccionado
            $.ajax({
                type : "DELETE",
                url : "{{ url('Users') }}" + '/'+ user_id,
                //Si la petición fue exitosa eliminamos al usuario de la tabla
                success : (data) => {
                    $('#user_id_' + user_id).remove()
                },
                error : (data) => {
                    console.log('Error' + data.error)
                }
            });
        }
    });

    //Si el formulario tiene al menos un dato
    if($('#userForm').length > 0){
        //Validamos el formulario
        $('#userForm').validate({
            //Manejador del evento submit del formulario
            submitHandler : (form) => {
                //Obtenemos el tipo de acción que tiene el boton del modal
                var actionType = $('#btn-save').val();
                //Cambiamos el texto del boton del modal
                $('#btn-save').html('Enviando');

                /* Realizamos la peticion de tipo POSTa la ruta del controlador store con todos los datos del formulario del modal  */
                $.ajax({
                    //Obtenemos todos los datos del formulario y lo mandamos como data
                    data : $('#userForm').serialize(),
                    //Usamos la ruta store del controlador para enviar los datos
                    url : "{{route('Users.store')}}",
                    type :  'POST',
                    //Establecemos el tipo de dato json
                    dataType : 'json',
                    //Si la petición fue exitosa creamos una nueva fila con los datos del nuevo registro
                    success: (data) => {
                        var user = '<tr id="user_id_' + data.id + '"><td>' + data.id + '</td><td>' + data.name + '</td><td>' + data.email + '</td><td colspan="2"><a href="javascript.void(0)" id="edit-user" data-id="' + data.id + '" class="btn btn-warning mr-2">Editar</a><a href="javascript.void(0)" class="btn btn-danger ml-1" data-id="' + data.id + '" id="delete-user">Eliminar</a></td></tr>';
                        
                        //Si la acción es Guardar adicionamos la fila a la tabla y si no remplazamos los datos de la fila
                        if(actionType == "Guardar"){
                            //alert(actionType)
                            $('#users-table-body').prepend(user);
                        }else{
                            $('#user_id_' + data.id).replaceWith(user);
                        }

                        //Reseteamos el formulario
                        $('#userForm').trigger('reset');
                        //Ocultamos el modal
                        $('#ajax-crud-modal').modal('hide');
                        //Cambiamos el texto del boton del modal
                        $('#btn-save').html('Guardar Cambios');
                    },
                    error : (data) => {
                        console.log('Error' + data.error);
                        $('btn-save').html('Guardar Cambios');
                    }
                });
            }
        });
    }
});