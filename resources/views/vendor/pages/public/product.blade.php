@extends("pages::layouts/header")

@section("carousel")
    <div id="loader-wrapper"></div>
@endsection
@section("content")
    <div id="content-block">

        <div class="container-fluid">

            <div class="empty-space col-xs-b40 col-sm-b80"></div>

            <div class="row">
                <div class="col-md-12 text-center">
                    <article class="sa">
                        <h3>我们的工作</h3>
                        <p>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium. </p>
                    </article>
                    <div class="empty-space col-xs-b25 col-sm-b50"></div>
                </div>
                <div class="col-md-12 text-center">
                    <div class="sorting-menu">
                        <div class="title">All</div>
                        <div class="toggle">
                            <a class="active" data-filter="*"><span class="text">所有</span></a>
                            @foreach(\Files::whereName('product')->first()->children as $index=>$item)
                            <a data-filter=".filter-{{$index+1}}"><span class="text">{{$item->name}}</span><span class="number">{{count($item->first()->children)}}</span></a>
                            @endforeach
                        </div>
                    </div>
                    <div class="empty-space col-xs-b25 col-sm-b50"></div>
                </div>
            </div>

            <div class="sorting-container portfolio-3">
                <div class="grid-sizer w50"></div>
                  @foreach(\Files::whereName('product')->first()->children as $index=>$item)
                    @foreach($item->children as $key=>$value)
                    <div class="sorting-item w50 filter-{{$index+1}}">
                        <div class="portfolio-preview-3">
                            <a class="lightbox" href="{{$key}}">
                                <img class="preview" src="{{$value->present()->thumbSrc(null,null,[],'name')}}" alt="" />
                                <span class="portfolio-hover-3">
                                <span class="bg-layer"></span>
                                <span class="frame-layer"></span>
                                <span class="align">
                                    <span class="title h3 light">{{$value->description}}</span>
                                </span>
                            </span>
                            </a>
                        </div>
                    </div>
                    @endforeach
                  @endforeach
            </div>

        </div>
        @parent
    </div>
    @include("pages::public.login")
@stop