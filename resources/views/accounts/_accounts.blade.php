<div class="row">
    @foreach( $accounts as $account)
        <div class="col-md-4">
            <div class="panel panel-bordered-mint">
                <div class="panel-title panel-heading">
                    <h3 class="panel-title">
                        <a href="{{action('AccountsController@edit', _c($account->id))}}">{{ $account->name }} ({{ $account->ffbe_id  }}) <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                    </h3>
                    <i class="fa fa-calendar-plus-o" aria-hidden="true"></i> {{ _t('Créé le ') }} {{ $account->created_at }}
                </div>
                <div class="panel-body">
                    <p><i class="fa fa-globe" aria-hidden="true"></i> {{ _t('Serveur') }} = {{ $account->server }}</p>
                    <p><i class="fa fa-star" aria-hidden="true"></i> {{ _t('Rang') }} = {{ $account->rank }}</p>

                    <div><h4>{{ _t('Unité partagée') }}</h4>
                        <div class="panel-body text-center">
                            <img alt="Avatar" class=" img-circle img-border mar-btm" src="{{ asset( 'storage/'.$account->current_unit->icon_file) }}">
                        </div>
                        <div class=" text-center">
                            <p class="text-semibold text-lg ">{{ $account->current_unit->name }}</p>
                            <p class=" text-semibold mar-no">{{ $account->current_unit_description }}</p>
                        </div>
                    </div>

                    <div><h4>{{ _t('Unité désirée') }}</h4>
                        <div class="panel-body text-center">
                            <img alt="Avatar" class=" img-circle img-border mar-btm" src="{{ asset( 'storage/'.$account->desired_unit->icon_file) }}">
                        </div>
                        <div class=" text-center">
                            <p class="text-semibold text-lg ">{{ $account->desired_unit->name }}</p>
                            <p class=" text-semibold mar-no">{{ $account->desired_unit_description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endforeach
</div>