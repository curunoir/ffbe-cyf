<?php

function get_single_class($model)
{
    if ($model) {
        return substr(get_class($model), strrpos(get_class($model), '\\') + 1);
    }
}