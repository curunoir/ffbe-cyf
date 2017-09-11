<div class="panel-title">Your accounts</div>
<div class="row">
    @foreach( $accounts as $account)
        <div class="col-md-3">
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">FFBE ID = {{ $account->ffbe_id }}</h3>
                </div>
                <div class="panel-body">
                    <p>Server = {{ $account->server }}</p>
                    <p>Rank = {{ $account->rank }}</p>
                    <p>Created at = {{ $account->created_at }}</p>
                </div>
            </div>
        </div>
    @endforeach
</div>

@if(session()->has('success'))
    <div data-alert="success" data-title="{{'Succès'}} !" data-content="{!!session('success')!!}"><zfzefezfezefef/div>
@endif