<?php
/**
 * Created by PhpStorm.
 * User: alan
 * Date: 08/10/2017
 * Time: 11:45
 */

namespace App;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class UnitsTool
{
    private $all_icons_dir;

    /**
     * ImportOldWIki constructor.
     * @param Application $app
     */
    public function __construct(Application $app)
    {
        $this->all_icons_dir = "unit_icons";
    }

    public function getAllIconsPath(){
        return storage_path().'app/public/'.$this->all_icons_dir;
    }

    public function getAllIcons() : Collection {
        return collect(Storage::disk('public')->files($this->all_icons_dir));
    }

    public function getAllIconsForMaxStar($max) : Collection {
        $files = array_filter(Storage::disk('public')->files($this->all_icons_dir), function ($file) use($max)
        {
            return preg_match('/(^unit_icon.*['.$max.']).png/', $file);
        });
        if($max == 6)
            return collect($files);
        else{
            if($max == 5){
                // on regarde si pas deja existant en six etoiles sinon osef
                $filtered_files = array();
                foreach($files as $file) {
                    $filesixstars = substr($file, 0, strlen($file)-5) .'6.png';
                    if(!Storage::disk('public')->exists($filesixstars))
                        $filtered_files[] = $file;
                }
                return collect($filtered_files);
            }
        }
    }

    public function getAllMaxSixIcons() : Collection {
        $files = array_filter(Storage::disk('public')->files($this->all_icons_dir), function ($file)
        {
            return preg_match('/(^unit_icon.*[6]).png/', $file);
        });
        return collect($files);
    }

    public function getFirstUnknownForMaxStars($max)
    {
        $files = $this->getAllIconsForMaxStar($max);
        foreach($files as $file){
            if(Unit::where('icon_file', '=', $file)->count() == 0)
                return $file;
        }
        return null;
    }


    /**
     * @param $name
     * @param $value
     * @param null $options
     * @param null $min
     * @param null $max
     */
    public function selectUnits($name, $value = null, $options = null, $min =null, $max = null)
    {
       $units = Unit::where('validation', '=', true)->get();
        $options_select = '';
       if($options != null)
           foreach($options as $key => $option)
            $options_select .= $key."='".$option."'' ";
       $html = "<select name='$name' id='$name' ".$options_select.">";
       foreach($units as $unit) {
           $selected = $unit->id == $value ? 'selected' : '';
           $html .= "<option value='".$unit->id."' ".$selected." >".$unit->name."</option>";
       }
        $html .= "</select>";
       return $html;
    }

}