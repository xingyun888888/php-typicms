<?php

namespace TypiCMS\Modules\Images\Repositories;

use TypiCMS\Modules\Core\Repositories\EloquentRepository;
use TypiCMS\Modules\Images\Models\Image;

class EloquentImage extends EloquentRepository
{
    protected $repositoryId = 'images';

    protected $model = Image::class;
}
