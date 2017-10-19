@if(isset($errors) && $errors->any())
    <div class="mar-all">
        <div class="alert alert-danger fade in">
            <button class="close" data-dismiss="alert">
                ×
            </button>
            <i class="fa-fw fa fa-times"></i><strong>Erreur !</strong>
            <ul>

                @foreach($errors->all() as $error)
                    <li>{!! $error !!}</li>
                @endforeach
            </ul>
        </div>
    </div>

@endif
@if(session()->has('info'))
    <div data-alert="info" data-title="{{'Informations'}} !" data-content="{!!session('info')!!}"></div>
@endif
@if(session()->has('error'))
    <div data-alert="danger" data-title="{{'Erreur'}} !" data-content="{!!session('error')!!}"></div>
@endif
@if(session()->has('success'))
    <div data-alert="success" data-title="{{'Succès'}} !" data-content="{!!session('success')!!}"></div>
@endif
@if(session()->has('warning'))
    <div data-alert="warning" data-title="{{'Attention'}} !" data-content="{!!session('warning')!!}"></div>
@endif
