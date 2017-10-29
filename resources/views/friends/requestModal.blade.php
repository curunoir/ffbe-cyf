<article>
    <div class="modal-header bg-gray-light">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
            <i class="fa fa-times"></i>
        </button>
        <h4 class="modal-title " id="myModalLabel">Demande d\'ami à '+ami+'</h4>
    </div>
    <div class="modal-body modalwidgets bg-gray-light" id="myModalContent">
        <div>
            <mark class="text-info">Vous pourrez voir son code ami et communiquer avec lui si il accepte.</mark>
        </div>
        <hr/>
        <div class="form-group form-select"><label for="" class="control-label">{{ _t('Pour lequel de vos comptes ?') }}</label>
            <select class="form-control" id="requester_account_id" name="requester_account_id">
                @foreach($user->accounts as $account)
                    <option value="{{ _c($account->id) }}">{{ $account->name }}</option>
                @endforeach
            </select>
        </div>
        <hr/>
        <div>
            <label for="message" class="col-sm-3 control-label">Message pour le joueur {{ $requestedName }}</label>
            <textarea required="" class="form-control" name="message" cols="10" rows="4" id="request_message"></textarea>
        </div>
        <div class="text-center pad-top">
            <button class="btn btn-primary btn-labeled text-bold confirm_send_request" data-id="{{ $requestedId  }}"> Envoyer la
                requête <i class="fa fa-question"> </i></button>
        </div>
    </div>
    <div class="modal-footer clearfix">
             <span class="btn btn-default pull-left" data-dismiss="modal"> 
         Fermer 
         </span>
    </div>
</article>