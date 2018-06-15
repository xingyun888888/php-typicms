<?php

namespace TypiCMS\Modules\Images\Http\Controllers;

use TypiCMS\Modules\Core\Http\Controllers\BaseAdminController;
use TypiCMS\Modules\Images\Http\Requests\FormRequest;
use TypiCMS\Modules\Images\Models\Image;
use TypiCMS\Modules\Images\Repositories\EloquentImage;

class AdminController extends BaseAdminController
{
    public function __construct(EloquentImage $image)
    {
        parent::__construct($image);
    }

    /**
     * List models.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
//          dd(\Files::children());
//        dd(\Files::whereFolder_id(\Files::where("name","home")->first()->id)->get()->toArray());
        dd(\Files::whereName('product')->first()->children()->where("name",'body')->first()->children->toarray());
//        dd(\Files::first()->children()->where("name",'footer')->first()->children->toArray());
        $models = \Files::whereFolder_id(\Files::whereName("home")->get()[0]->id)->get();
        //$models = $this->repository->with('files')->findAll();
        app('JavaScript')->put('models', $models);
        return view('images::admin.index');
    }

    /**
     * Create form for a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $model = $this->repository->createModel();
        app('JavaScript')->put('model', $model);

        return view('images::admin.create')
            ->with(compact('model'));
    }

    /**
     * Edit form for the specified resource.
     *
     * @param \TypiCMS\Modules\Images\Models\Image $image
     *
     * @return \Illuminate\View\View
     */
    public function edit(Image $image)
    {
        app('JavaScript')->put('model', $image);

        return view('images::admin.edit')
            ->with(['model' => $image]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \TypiCMS\Modules\Images\Http\Requests\FormRequest $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(FormRequest $request)
    {
        $image = $this->repository->create($request->all());

        return $this->redirect($request, $image);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \TypiCMS\Modules\Images\Models\Image             $image
     * @param \TypiCMS\Modules\Images\Http\Requests\FormRequest $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Image $image, FormRequest $request)
    {
        $this->repository->update($request->id, $request->all());

        return $this->redirect($request, $image);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \TypiCMS\Modules\Images\Models\Image $image
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Image $image)
    {
        $deleted = $this->repository->delete($image);

        return response()->json([
            'error' => !$deleted,
        ]);
    }

    /**
     * List models.
     *
     * @return \Illuminate\View\View
     */
    public function files(Image $image)
    {
        $data = [
            'models' => $image->files,
        ];

        return response()->json($data, 200);
    }
}
