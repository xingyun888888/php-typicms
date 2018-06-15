<?php

namespace TypiCMS\Modules\Images\Facades;

use Illuminate\Support\Facades\Facade;

class Images extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'Images';
    }
}
