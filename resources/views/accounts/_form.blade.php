

{!! BootForm::text('ffbe_id', _t("Code ami") ) !!}

{!! BootForm::select('server',  _t('Serveur'), ['GLOBAL' => 'GLOBAL', 'JAPAN' => 'JAPAN'])  !!}

{!! BootForm::text('rank', _t('Rank')) !!}


<div class="text-center margin-bottom-10">
    {!! BootForm::submit(_t('Valider')) !!}
</div>