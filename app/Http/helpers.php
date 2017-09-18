<?php

function get_single_class($model)
{
    if ($model) {
        return substr(get_class($model), strrpos(get_class($model), '\\') + 1);
    }
}

/**
 * Returns if current user is admin
 * @return mixed
 */
function admin() {
    $user = Auth::getUser();
    if($user)
        return Auth::getUser()->admin;
    else
        return false;
}