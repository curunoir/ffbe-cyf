<div class="row">
    @foreach( $accounts as $account)
        <div class="col-md-3">
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        {{ _t('Code FFBE') }} = <a  href="{{action('AccountsController@edit', _c($account->id))}}">{{ $account->ffbe_id  }} <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>

                    </h3>

                </div>
                <div class="panel-body">
                    <p><i class="fa fa-globe" aria-hidden="true"></i> {{ _t('Serveur') }} = {{ $account->server }}</p>
                    <p><i class="fa fa-star" aria-hidden="true"></i> {{ _t('Rang') }} = {{ $account->rank }}</p>
                    <p><i class="fa fa-calendar-plus-o" aria-hidden="true"></i> {{ _t('Créé le ') }} = {{ $account->created_at }}</p>
                </div>
            </div>
        </div>
    @endforeach
</div>