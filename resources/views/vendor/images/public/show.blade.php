@extends('core::public.master')

@section('title', $model->title.' – '.__('Images').' – '.$websiteTitle)
@section('ogTitle', $model->title)
@section('description', $model->summary)
@section('image', $model->present()->thumbUrl())
@section('bodyClass', 'body-images body-image-'.$model->id.' body-page body-page-'.$page->id)

@section('content')

    @include('core::public._btn-prev-next', ['module' => 'Images', 'model' => $model])
    <article class="image">
        <h1 class="image-title">{{ $model->title }}</h1>
        {!! $model->present()->thumb(null, 200) !!}
        <p class="image-summary">{{ nl2br($model->summary) }}</p>
        <div class="image-body">{!! $model->present()->body !!}</div>
    </article>

@endsection
