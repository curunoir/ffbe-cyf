<div class="col-md-4">
    <div class="panel panel-default">
        <div class="panel-heading">Votre profil</div>
        <div class="panel-body">
            {!! BootForm::open(['method' => 'put'])->action(route('profile.update'))->put() !!}
            {!! BootForm::bind(Auth::getUser()) !!}
            {!! BootForm::text("Nom", 'name') !!}
            {!! BootForm::text("Email", 'email') !!}
            {!! BootForm::submit("Mettre à jour") !!}
            {!! BootForm::close() !!}

        </div>
    </div>
</div>