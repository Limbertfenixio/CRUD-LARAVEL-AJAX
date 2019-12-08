<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Metadatos de http y csrf_token -->
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CRUD LARAVEL - AJAX</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <script src="{{ url('js/ajax.js') }}"></script>
</head>
<body>
    <div class="container">
        <h2 class="alert alert-success">Laravel 6</h2>
        <div class="row">
            <div class="col-lg-12">
                <a href="javascript:void(0)" class="btn btn-success mb-2" id="create-user">Añadir</a>
                <a href=""></a>
                <table class="table table-bordered" id="laravel_crud">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody id="users-table-body">
                        @foreach ($users as $user)
                            <tr id="user_id_{{$user->id}}">
                                <td>{{$user->id}}</td>
                                <td>{{$user->name}}</td>
                                <td>{{$user->email}}</td>
                                <td colspan="2">
                                    <button id="edit-users" class="btn btn-warning" data-id="{{ $user->id}}">Editar</button>
                                    <a href="javascript:void(0)" id="delete-user" class="btn btn-danger" data-id="{{ $user->id }}">Eliminar</a>
                                </td>
                            </tr>
                        @endforeach    
                    </tbody>
                </table>
                {{ $users->links() }}
            </div>
        </div>
    </div>
    <div class="modal fade" id="ajax-crud-modal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="userCrudModal"></h4>
                </div>
                <form class="form-horizontal" name="userForm" id="userForm">
                    <div class="modal-body">
                        <input type="hidden" name="user_id" id="user_id">
                        <div class="form-group">
                            <label for="name" class="col-sm-2 control-label">Name</label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" id="name" name="name" placeholder="Ingrese su nombre" value="" maxlength="50" required="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="name" class="col-sm-2 control-label">Password</label>
                            <div class="col-sm-12">
                                <input type="password" class="form-control" id="pass" name="pass" placeholder="Ingrese su Contraseña" value="" maxlength="50" required="">
                            </div>
                        </div>
               
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Email</label>
                            <div class="col-sm-12">
                                <input type="email" class="form-control" id="email" name="email" placeholder="Ingrese su Email" value="" required="">
                            </div>
                        </div>    
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-success" id="btn-save" value="Guardar">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>