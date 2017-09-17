<div class="row">
    @foreach( $accounts as $account)
        <div class="col-md-3">
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">{{ _t('Code FFBE') }} = {{ $account->ffbe_id }}</h3>
                </div>
                <div class="panel-body">
                    <p>{{ _t('Serveur') }} = {{ $account->server }}</p>
                    <p>{{ _t('Rang') }} = {{ $account->rank }}</p>
                    <p>{{ _t('Créé le ') }} = {{ $account->created_at }}</p>
                </div>
            </div>
        </div>
    @endforeach
</div>