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
        return storage_path().'app/'.$this->all_icons_dir;
    }

    public function getAllIcons() : Collection {
        return collect(Storage::disk('local')->files($this->all_icons_dir));
    }

    public function getAllIconsForMaxStar($max) : Collection {
        $files = array_filter(Storage::disk('local')->files($this->all_icons_dir), function ($file) use($max)
        {
            return preg_match('/(^unit_icon.*['.$max.']).png/', $file);
        });
        return collect($files);
    }

    public function getAllMaxSixIcons() : Collection {
        $files = array_filter(Storage::disk('local')->files($this->all_icons_dir), function ($file)
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


}