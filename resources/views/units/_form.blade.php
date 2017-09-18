

{!! BootForm::text('name', _t("Nom") , ['required']) !!}

{!! BootForm::text('japan_name', _t('Nom japonais'), ['required']) !!}
{!! BootForm::textLang('description', _t('Description'), ['required']) !!}

<div class="text-center margin-bottom-10">
    {!! BootForm::submit(_t('Valider')) !!}
</div>