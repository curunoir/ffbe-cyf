<div class="row">
    <div class="col-sm-8">
        {!! BootForm::text('ffbe_id', _t("Code ami"), ['required' => true] ) !!}
        {!! BootForm::select('server',  _t('Serveur'), ['GLOBAL' => 'GLOBAL', 'JAPAN' => 'JAPAN'])  !!}
        {!! BootForm::text('rank', _t('Rank'), ['required' => true]) !!}

        <hr/>

        <div class="row">
            <div class="col-sm-6">
                <div class="form-group form-text">
                    <label for="unit" class="control-label">{{ _t('Unité partagée') }}</label>
                    <div class="input-group mar-btm">
                        <span class="input-group-btn">
                            <button class="btn btn-mint " type="button"><i class="fa fa-search"></i></button>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                {!! BootForm::textarea('description', _t('Description')) !!}
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

    </div>

</div>

