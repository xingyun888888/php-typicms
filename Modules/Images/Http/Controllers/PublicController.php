<?php

namespace TypiCMS\Modules\Images\Http\Controllers;

use TypiCMS\Modules\Core\Http\Controllers\BasePublicController;
use TypiCMS\Modules\Images\Repositories\EloquentImage;

class PublicController extends BasePublicController
{
    public function __construct(EloquentImage $image)
    {
        parent::__construct($image);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $models = $this->repository->all();

        return view('images::public.index')
            ->with(compact('models'));
    }

    /**
     * Show resource.
     *
     * @return \Illuminate\View\View
     */
    public function show($slug)
    {
        $model = $this->repository->bySlug($slug);

        return view('images::public.show')
            ->with(compact('model'));
    }
}
