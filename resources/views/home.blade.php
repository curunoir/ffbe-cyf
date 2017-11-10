@extends('layouts.app')

@section('content')
    <div id="page-content">
        <div id="page-title">
            <h1 class="page-header text-overflow">{{ _t('Tableau de bord de Final Fantasy Brave Exvius') }} <span class="text-success"> - Choose Your Friends</span></h1>
        </div>
        <ol class="breadcrumb">
            <li class="active"><a href="{{ action('HomeController@index') }}">{{ _t('Accueil') }}</a></li>
        </ol>
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-bordered-primary">
                    <div class="panel-heading">
                        <div class="panel-title"><h2>{{ _t('Liste de vos amis') }}</h2></div>

                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-12 text-2x">
                                <p class="">{{ _t("Etre ami avec d'autres joueurs vous permet :") }}</p>
                                <div>
                                    <li> {{ _t("de voir l'identifiant de leur compte de jeu FFBE vous permettant de l'ajouter ensuite comme ami dans le jeu") }}</li>
                                    <li> {{ _t('de discuter avec eux en direct !') }}</li>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            @forelse($friends as $friend)
                            <div class="col-md-4">
                                <div class="panel panel-primary">
                                    <div class="panel-heading">
                                        <span>
                                            <img src="{{ asset( 'storage/'.$friend->friend_account->current_unit->icon_file) }}" class=" img-circle img-border mar-btm">
                                        </span>
                                        <span class="panel-title">{{ $friend->friend_account->name }}</span>
                                        <span class="text-warning text-main text-2x">{{ $friend->friend_account->ffbe_id }}</span>
                                        <div class="panel-control">
                                            <button class="demo-panel-ref-btn btn btn-default" data-target="#demo-panel-ref" data-toggle="panel-overlay">
                                                <i class="demo-psi-repeat-2 icon-fw"></i>
                                            </button>
                                            <div class="btn-group">
                                                <button data-toggle="dropdown" class="dropdown-toggle btn">
                                                    <i class="caret"></i>
                                                </button>
                                                <ul class="dropdown-menu dropdown-menu-right">
                                                    <li><a href="{{ action('ChatsController@talk', _c($friend->user_friend->id)) }}" class="list-group-item gochat" data-id="{{ _c($friend->user_friend->id) }}">{{ _t('Parler') }}</a></li>

                                                    {{--<li><a href="#">{{ _t('Supprimer') }}</a></li>--}}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel-body">
                                        <dl class="dl-horizontal">
                                            <dt>{{ _t('Joueur') }}</dt>
                                            <dd>{{ $friend->user_friend->name }}</dd>
                                            <dt><i class="fa fa-star" aria-hidden="true"></i> {{ _t('Rang') }}</dt>
                                            <dd>{{ $friend->friend_account->rank }}</dd>
                                            <dt>{{ _t('Unité partagée') }}</dt>
                                            <dd>{{ $friend->friend_account->current_unit->name }}</dd>
                                            <dt>{{ _t('Unité désirée') }}</dt>
                                            <dd>{{ $friend->friend_account->desired_unit->name }}</dd>
                                            <dt><i class="fa fa-globe" aria-hidden="true"></i> {{ _t('Serveur') }}</dt>
                                            <dd>{{ $friend->friend_account->server }}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            @empty
                                <p>{{ _t("Vous n'avez pas encore d'amis. Essayez la recherche") }}</p>
                            @endforelse
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <a href="{{ action('AccountsController@index') }}">{{ _t("Pour pouvoir ajouter des amis pensez à enregistrer au moins un compte.") }}</a>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>

        </div>
    </div>
@endsection


@section('script')
    <script type="text/javascript">

    </script>
@endsection