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

/**
 * Created by PhpStorm.
 * Userded: damien
 * Date: 15/05/17
 * Time: 15:48
 */
function getjQueryUI()
{
    \Assets::add('libs/jquery-ui-1.10.3.min.js');
}

function getValidate()
{
    \Assets::add('plugins/jquery-validate/jquery.validate.min.js');
    \Assets::add('plugins/jquery-validate/fr_FR.js');
}

function getDatePicker()
{
    \Assets::add('libs/jquery-ui-1.10.3.min.js');
    \Assets::add('jquery-ui.min.css');
    \Assets::add('plugins/datepicker/datepicker_fr.js');
}

function getColorPicker()
{
    \Assets::add('bootstrap-colorpicker.min.css');
    \Assets::add('plugins/colorpicker/bootstrap-colorpicker.min.js');
}

function getXEditable()
{
    \Assets::add('plugins/x-editable/css/bootstrap-editable.css');
    \Assets::add('plugins/x-editable/bootstrap-editable.min.js');
}

function getSelect2()
{
    \Assets::add('plugins/select2/select2.min.css');
    \Assets::add('plugins/select2/select2.min.js');
}

function getSelect2V404()
{
    \Assets::add('plugins/select2/select2-4.0.4.min.css');
    \Assets::add('plugins/select2/select2-4.0.4.min.js');
}

function getSocket()
{
    \Assets::add('plugins/socket.io-1.4.5.js');
}

function getDatatables($extend = false)
{
    \Assets::add('plugins/datatables/jquery.dataTables.min.js');
    \Assets::add('plugins/datatables/dataTables.bootstrap.min.js');
    \Assets::add('plugins/datatables/media/css/dataTables.bootstrap.css');
    \Assets::add('plugins/datatables/extensions/Responsive/css/dataTables.responsive.css');
    \Assets::add('plugins/jquery.checkboxes-1.0.6.min.js');
    if ($extend):
        \Assets::add('plugins/datatable-responsive/datatables.responsive.min.js');
        \Assets::add('responsive.bootstrap.min.css');
        //Scroller
        \Assets::add('scroller.dataTables.min.css');
        \Assets::add('plugins/datatables/dataTables.scroller.min.js');
    endif;
}

function getMaps()
{
    \Assets::add('plugins/google/maps.js');
}

function getTableRowReOrder()
{
    \Assets::add('libs/jquery-ui-1.10.3.min.js');
    \Assets::add('plugins/datatables/jquery.dataTables.rowReordering.js');
}

function getBootstrapSelect()
{
    \Assets::add('plugins/bootstrap-select/bootstrap-select.min.js');
    \Assets::add('plugins/bootstrap-select/bootstrap-select.min.css');
}

function getHighcharts()
{
    \Assets::add('plugins/highcharts/highcharts.js');
}

function getSummernote()
{
    \Assets::add('summernote/summernote.css');
    \Assets::add('plugins/summernote/summernote.min.js');
}

function getWizard()
{
    \Assets::add('bootstrap/wizard.min.js');
    \Assets::add('bootstrap/Validator.min.js');
}

function getTables()
{
    \Assets::add('coffee/tables.js');
}

function getDropzone()
{
    \Assets::add('plugins/dropzone/dropzone.min.js');
    \Assets::add('plugins/dropzone/dropzone.min.css');
}

function getChosen()
{
    \Assets::add('plugins/chosen/chosen.jquery.min.js');
    \Assets::add('plugins/chosen/chosen.min.css');
}

function getChat()
{
    \Assets::add('echo.js');
    \Assets::add('chat.js');
}

function tranfSlash($data)
{
    return str_replace('|', '/', $data);
}

function pointToVirgule($data)
{
    return floatval(str_replace(',', '.', $data));
}

function formatFloat($data)
{
    $tmp = pointToVirgule($data);
    return $tmp;
}

function colorContext($context, $type = 'text')
{
    return isset(config('app.color_context')[$context]) ? $type . '-' . config('app.color_context')[$context] : null;
}

function status($status, $html = true)
{
    if ($html):
        if ($status) {
            return "<span class='label label-success'><span class='hidden'>\".$status.\"</span><i class='fa fa-check'></i></span>";
        } else {
            return "<span class='label label-danger'><span class='hidden'>\".$status.\"</span><i class='fa fa-minus'></i></span>";
        }
    else:
        if ($status) {
            return _t("Oui");
        } else {
            return _t("Non");
        }
    endif;
}

function status_verified($status)
{
    if ($status == 2)
        return "<span class='label label-success'><span class='hidden'>\".$status.\"</span><i class='fa fa-check'></i></span>";
    else if ($status == 1)
        return "<span class='label label-warning'><span class='hidden'>\".$status.\"</span><i class='fa fa-question'></i></span>";
    else
        return "<span class='label label-danger'><span class='hidden'>\".$status.\"</span><i class='fa fa-minus'></i></span>";
}

function getFormatClass($model)
{
    return explode('\\', get_class($model))[2];
}

function isSupport()
{
    return auth()->user()->email == 'alan.legroux@bluemega.com' ? true : false;
}
function remarqueLiPosition($user_id)
{
    return $user_id == auth()->user()->id ? 'left' : 'right';
}

/**
 * Returns $objectmodel dates created/modified formatted text for tooltips
 * @param $object
 */
function dates_tooltip($object)
{
    $return = '';
    if(!empty($object->created_at))
        $return = _t('Créé le') . ' ' . $object->created_at;
    if(!empty($object->updated_at))
        $return .= '<br />' . _t('Modifié le') . ' ' . $object->updated_at;
    if(!empty($object->updated_by))
        $return .= '<br />' . _t('Dernière modification par') . ' ' . $object->updated_by;
    return $return;
}

/**
 * Returns $objectmodel dates created/modified formatted text for tooltips
 * @param $object
 */
function dates_info($date)
{
    if($date)
        return \Carbon\Carbon::parse($date)->format('d-m-Y');
    else
        return _t('Pas de date');
}