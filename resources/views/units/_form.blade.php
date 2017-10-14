<input type="hidden" name="icon_file" value="{{ $icon }}" />
<input type="hidden" name="max_stars" value="{{ $maxstars }}" />
<div class="row">
    <div class="col-sm-1 col-sm-offset-5">
        <div>
            <img src="{{ asset( 'storage/'.$icon) }}">
        </div>
    </div>
</div>
<div class="row">
    <div class="col-sm-3">
        {!! BootForm::text('name', _t("Nom") , ['class' => 'submit_on_enter', 'required', 'autofocus']) !!}
    </div>
    <div class="col-sm-3">
        {!! BootForm::text('japan_name', _t('Nom japonais')) !!}
    </div>
    <div class="col-sm-3">
        {!! BootForm::text('description', _t('Description')) !!}
    </div>
</div>
<div class="row">
    <div class="text-center col-sm-1 col-sm-offset-11">
        {!! BootForm::submit(_t('Valider')) !!}
    </div>
</div>


