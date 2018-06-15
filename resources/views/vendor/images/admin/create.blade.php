@extends('core::admin.master')

@section('title', __('New image'))

@section('content')

    @include('core::admin._button-back', ['module' => 'images'])
    <h1>
        @lang('New image')
    </h1>

    {!! BootForm::open()->action(route('admin::index-images'))->multipart()->role('form') !!}
        @include('images::admin._form')
    {!! BootForm::close() !!}

@endsection
