<div class="row">
    <div class="col-sm-8">
        {!! BootForm::text('ffbe_id', _t("Code ami"), ['required' => true] ) !!}
        {!! BootForm::select('server',  _t('Serveur'), ['GLOBAL' => 'GLOBAL', 'JAPAN' => 'JAPAN'])  !!}
        {!! BootForm::text('rank', _t('Rank'), ['required' => true]) !!}

        <div class="form-group form-select">
            <label for="shared_unit" class="col-sm-3 control-label">{{ _t('Unité partagée') }}</label>
            <div class="col-sm-9">
                {!!  UnitsTool::selectUnits('current_unit_id', $account->current_unit_id, ['class' => 'form-control chosen', 'width' => '100%']) !!}
            </div>
        </div>
        {!! BootForm::textarea('current_unit_description', _t('Décrivez votre unité partagée'), ['required' => true]) !!}
        <hr />
        <div class="form-group form-select">
            <label for="desired_unit" class="col-sm-3 control-label">{{ _t('Unité désirée') }}</label>
            <div class="col-sm-9">
                {!!  UnitsTool::selectUnits('desired_unit_id', $account->desired_unit_id, ['class' => 'form-control chosen', 'width' => '100%']) !!}
            </div>
        </div>
        {!! BootForm::textarea('desired_unit_comments', _t('Que cherchez vous chez cette unité ?'), ['required' => true]) !!}

        <div class="text-center margin-bottom-10">
            {!! BootForm::submit(_t('Valider')) !!}
        </div>
    </div>

</div>

@section('script')
    <script type="text/javascript">
        $(".chosen").chosen({width: "100%"});
    </script>
@endsection