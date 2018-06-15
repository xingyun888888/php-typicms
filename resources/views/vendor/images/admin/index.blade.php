@extends('core::admin.master')

@section('title', __('Images'))

@section('content')

<div ng-cloak ng-controller="ListController">

    @include('core::admin._button-create', ['module' => 'images'])

    <h1>@lang('Images')</h1>

    {{--<div class="btn-toolbar">--}}
        {{--@include('core::admin._button-select')--}}
        {{--@include('core::admin._button-actions')--}}
        {{--@include('core::admin._lang-switcher-for-list')--}}
    {{--</div>--}}


    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link active" href="#tab-content" data-target="#tab-home" data-toggle="tab">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#tab-meta" data-target="#tab-team" data-toggle="tab">team</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#tab-options" data-target="#tab-options" data-toggle="tab">other</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#tab-options" data-target="#tab-options" data-toggle="tab">other</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#tab-options" data-target="#tab-options" data-toggle="tab">other</a>
        </li>
    </ul>

    <div class="tab-content" >
        <div class="tab-pane fade show active" id="tab-home">
            <div class="dropzone" dropzone id="dropzone" folder-id="@{{ folder.id }}">
                <div class="dz-message">{{ __('Click or drop files to upload') }}</div>
            </div>
            <table st-persist="imagesTable" st-table="displayedModels" st-safe-src="models" st-order st-filter class="table table-main">
                <thead>
                <tr>
                    {{--<th class="delete"></th>--}}
                    <th class="edit"></th>
                    {{--<th st-sort="status_translated" class="status st-sort">{{ __('Status') }}</th>--}}
                    <th st-sort="image" class="image st-sort">图片名称</th>
                    <th st-sort="title_translated" class="title_translated st-sort">缩略图</th>
                    <th st-sort="title_translated" class="title_translated st-sort">小标题</th>
                    <th st-sort="title_translated" class="title_translated st-sort">大标题</th>
                </tr>
                {{--<tr>--}}
                    {{--<td colspan="4"></td>--}}
                    {{--<td>--}}
                        {{--<input st-search="title_translated" class="form-control form-control-sm" placeholder="@lang('Filter')…" type="text">--}}
                    {{--</td>--}}
                {{--</tr>--}}
                </thead>

                <tbody>
                <tr ng-repeat="model in displayedModels">
                    <td>
                        <input type="checkbox" checklist-model="checked.models" checklist-value="model">
                    </td>
                    <td>
                        @include('core::admin._button-edit', ['module' => 'files'])

                        {{--<a href="/admin/files/@{{ model.id }}/edit">编辑</a>--}}
                    </td>
                    <td>
                        @{{ model.name }}
                    </td>
                    <td>
                        {{--@include('core::admin._button-edit', ['module' => 'images'])--}}
                        <img ng-src="@{{model.path}}" alt="">
                    </td>
                    <td typi-btn-status action="toggleStatus(model)" model="model"></td>
                    <td>
                        <img ng-src="@{{ model.thumb_src }}" alt="">
                    </td>
                    <td>@{{ model.title_translated }}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td colspan="5" typi-pagination></td>
                </tr>
                </tfoot>
            </table>
        </div>
        <div class="tab-pane fade" id="tab-team">
            <div class="dropzone" dropzone id="dropzone" folder-id="@{{ folder.id }}">
                <div class="dz-message">{{ __('Click or drop files to upload') }}</div>
            </div>
            <table st-persist="imagesTable" st-table="displayedModels" st-safe-src="models" st-order st-filter class="table table-main">
                <thead>
                <tr>
                    <th class="delete"></th>
                    <th class="edit"></th>
                    <th st-sort="status_translated" class="status st-sort">{{ __('Status') }}</th>
                    <th st-sort="image" class="image st-sort">{{ __('Image') }}</th>
                    <th st-sort="title_translated" class="title_translated st-sort">{{ __('Title') }}</th>
                </tr>
                <tr>
                    <td colspan="4"></td>
                    <td>
                        <input st-search="title_translated" class="form-control form-control-sm" placeholder="@lang('Filter')…" type="text">
                    </td>
                </tr>
                </thead>

                <tbody>
                <tr ng-repeat="model in displayedModels">
                    <td>
                        <input type="checkbox" checklist-model="checked.models" checklist-value="model">
                    </td>
                    <td>
                        @include('core::admin._button-edit', ['module' => 'images'])
                    </td>
                    <td typi-btn-status action="toggleStatus(model)" model="model"></td>
                    <td>
                        <img ng-src="@{{ model.thumb }}" alt="">
                    </td>
                    <td>@{{ model.title_translated }}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td colspan="5" typi-pagination></td>
                </tr>
                </tfoot>
            </table>
        </div>
        <div class="tab-pane fade" id="tab-options">
            <div class="dropzone" dropzone id="dropzone" folder-id="@{{ folder.id }}">
                <div class="dz-message">{{ __('Click or drop files to upload') }}</div>
            </div>
            <table st-persist="imagesTable" st-table="displayedModels" st-safe-src="models" st-order st-filter class="table table-main">
                <thead>
                <tr>
                    <th class="delete"></th>
                    <th class="edit"></th>
                    <th st-sort="status_translated" class="status st-sort">{{ __('Status') }}</th>
                    <th st-sort="image" class="image st-sort">{{ __('Image') }}</th>
                    <th st-sort="title_translated" class="title_translated st-sort">{{ __('Title') }}</th>
                </tr>
                <tr>
                    <td colspan="4"></td>
                    <td>
                        <input st-search="title_translated" class="form-control form-control-sm" placeholder="@lang('Filter')…" type="text">
                    </td>
                </tr>
                </thead>

                <tbody>
                <tr ng-repeat="model in displayedModels">
                    <td>
                        <input type="checkbox" checklist-model="checked.models" checklist-value="model">
                    </td>
                    <td>
                        @include('core::admin._button-edit', ['module' => 'images'])
                    </td>
                    <td typi-btn-status action="toggleStatus(model)" model="model"></td>
                    <td>
                        <img ng-src="@{{ model.thumb }}" alt="">
                    </td>
                    <td>@{{ model.title_translated }}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td colspan="5" typi-pagination></td>
                </tr>
                </tfoot>
            </table>
        </div>
        <div class="tab-pane fade" id="tab-options">
            <div class="dropzone" dropzone id="dropzone" folder-id="@{{ folder.id }}">
                <div class="dz-message">{{ __('Click or drop files to upload') }}</div>
            </div>
            <table st-persist="imagesTable" st-table="displayedModels" st-safe-src="models" st-order st-filter class="table table-main">
                <thead>
                <tr>
                    <th class="delete"></th>
                    <th class="edit"></th>
                    <th st-sort="status_translated" class="status st-sort">{{ __('Status') }}</th>
                    <th st-sort="image" class="image st-sort">{{ __('Image') }}</th>
                    <th st-sort="title_translated" class="title_translated st-sort">{{ __('Title') }}</th>
                </tr>
                <tr>
                    <td colspan="4"></td>
                    <td>
                        <input st-search="title_translated" class="form-control form-control-sm" placeholder="@lang('Filter')…" type="text">
                    </td>
                </tr>
                </thead>

                <tbody>
                <tr ng-repeat="model in displayedModels">
                    <td>
                        <input type="checkbox" checklist-model="checked.models" checklist-value="model">
                    </td>
                    <td>
                        @include('core::admin._button-edit', ['module' => 'images'])
                    </td>
                    <td typi-btn-status action="toggleStatus(model)" model="model"></td>
                    <td>
                        <img ng-src="@{{ model.thumb }}" alt="">
                    </td>
                    <td>@{{ model.title_translated }}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td colspan="5" typi-pagination></td>
                </tr>
                </tfoot>
            </table>
        </div>
        <div class="tab-pane fade" id="tab-options">
            <div class="dropzone" dropzone id="dropzone" folder-id="@{{ folder.id }}">
                <div class="dz-message">{{ __('Click or drop files to upload') }}</div>
            </div>
            <table st-persist="imagesTable" st-table="displayedModels" st-safe-src="models" st-order st-filter class="table table-main">
                <thead>
                <tr>
                    <th class="delete"></th>
                    <th class="edit"></th>
                    <th st-sort="status_translated" class="status st-sort">{{ __('Status') }}</th>
                    <th st-sort="image" class="image st-sort">{{ __('Image') }}</th>
                    <th st-sort="title_translated" class="title_translated st-sort">{{ __('Title') }}</th>
                </tr>
                <tr>
                    <td colspan="4"></td>
                    <td>
                        <input st-search="title_translated" class="form-control form-control-sm" placeholder="@lang('Filter')…" type="text">
                    </td>
                </tr>
                </thead>

                <tbody>
                <tr ng-repeat="model in displayedModels">
                    <td>
                        <input type="checkbox" checklist-model="checked.models" checklist-value="model">
                    </td>
                    <td>
                        @include('core::admin._button-edit', ['module' => 'images'])
                    </td>
                    <td typi-btn-status action="toggleStatus(model)" model="model"></td>
                    <td>
                        <img ng-src="@{{ model.thumb }}" alt="">
                    </td>
                    <td>@{{ model.title_translated }}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td colspan="5" typi-pagination></td>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>


    {{--<div class="table-responsive">--}}

        {{--<table st-persist="imagesTable" st-table="displayedModels" st-safe-src="models" st-order st-filter class="table table-main">--}}
            {{--<thead>--}}
                {{--<tr>--}}
                    {{--<th class="delete"></th>--}}
                    {{--<th class="edit"></th>--}}
                    {{--<th st-sort="status_translated" class="status st-sort">{{ __('Status') }}</th>--}}
                    {{--<th st-sort="image" class="image st-sort">{{ __('Image') }}</th>--}}
                    {{--<th st-sort="title_translated" class="title_translated st-sort">{{ __('Title') }}</th>--}}
                {{--</tr>--}}
                {{--<tr>--}}
                    {{--<td colspan="4"></td>--}}
                    {{--<td>--}}
                        {{--<input st-search="title_translated" class="form-control form-control-sm" placeholder="@lang('Filter')…" type="text">--}}
                    {{--</td>--}}
                {{--</tr>--}}
            {{--</thead>--}}

            {{--<tbody>--}}
                {{--<tr ng-repeat="model in displayedModels">--}}
                    {{--<td>--}}
                        {{--<input type="checkbox" checklist-model="checked.models" checklist-value="model">--}}
                    {{--</td>--}}
                    {{--<td>--}}
                        {{--@include('core::admin._button-edit', ['module' => 'images'])--}}
                    {{--</td>--}}
                    {{--<td typi-btn-status action="toggleStatus(model)" model="model"></td>--}}
                    {{--<td>--}}
                        {{--<img ng-src="@{{ model.thumb }}" alt="">--}}
                    {{--</td>--}}
                    {{--<td>@{{ model.title_translated }}</td>--}}
                {{--</tr>--}}
            {{--</tbody>--}}
            {{--<tfoot>--}}
                {{--<tr>--}}
                    {{--<td colspan="5" typi-pagination></td>--}}
                {{--</tr>--}}
            {{--</tfoot>--}}
        {{--</table>--}}

    {{--</div>--}}

</div>

@endsection
