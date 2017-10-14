

{!! Form::text('ffbe_id', _t("Code ami") ) !!}

{!! BootForm::select('server',  _t('Serveur'), ['GLOBAL' => 'GLOBAL', 'JAPAN' => 'JAPAN'])  !!}

{!! BootForm::text('rank', _t('Rank')) !!}

<div class="form-group form-text">
    <label for="unit" class="col-sm-3 control-label">{{ _t('Unité partagée') }}</label>
    <div class="col-sm-6">
        <div class="input-group mar-btm">
            <span class="input-group-btn">
                <button class="btn btn-mint " type="button"><i class="fa fa-search"></i></button>
            </span>
            <input placeholder="{{ _t('Chercher une unité...') }}" class="form-control input_search_units" id="">
            <span class="input-group-btn">
                <button class="btn btn-mint " type="button"><i class="fa fa-plus"></i></button>
            </span>
        </div>
    </div>
</div>

<div class="form-group form-text">
    <label for="unit" class="col-sm-3 control-label">{{ _t('Unité désirée') }}</label>
    <div class="col-sm-6">
        <div class="input-group mar-btm">
            <span class="input-group-btn">
                <button class="btn btn-mint " type="button"><i class="fa fa-search"></i></button>
            </span>
            <input placeholder="{{ _t('Chercher une unité...') }}" class="form-control input_search_units" id="">
            <span class="input-group-btn">
                <button class="btn btn-mint " type="button"><i class="fa fa-plus"></i></button>
            </span>
        </div>
    </div>
</div>

<div class="text-center margin-bottom-10">
    {!! BootForm::submit(_t('Valider')) !!}
</div>

@include('friends._searchForm')