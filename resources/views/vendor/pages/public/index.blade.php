@extends("pages::layouts/header")
@section("carousel")
    <!-- LOADER -->
    <div id="loader-wrapper"></div>
@endsection
@section("content")
    <div id="content-block">

        <div class="fixed-background" style="background-image: url({{\Files::where('name','product')->first()->children()->where("name",'banner')->first()->children[0]->present()->thumbSrc(null, null, [], 'name')}});">
            <div class="banner-shortcode">
                <div class="banner-frame border-image" style="border-image-source: url(/yawei/img/background-2_.jpg);"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">
                            <div class="align">
                                <h1 class="h1 light">AS.DESIGN</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="empty-space col-xs-b60 col-sm-b120"></div>
            @foreach(\Files::where('name','home')->first()->children()->where("name",'body')->first()->children as $item)
                <div class="text-center">
                    <img class="thumbnail-image col-xs-b20" src="{{$item->present()->thumbSrc(null, null, [], 'name')}}" alt="" />
                    <h6 class="h6 col-xs-b10">{{$item->name}}</h6>
                    <div class="sa middle">{{$item->name}}</div>
                </div>
            @endforeach
        <!--    <div class="empty-space empty-space col-xs-b25 col-sm-b50"></div>
            <div class="row">
                <div class="col-sm-6">
                    <div class="text-center">
                        <img class="thumbnail-image col-xs-b20" src="/yawei/img/thumbnail-47.jpg" alt="" />
                        <h6 class="h6 col-xs-b10">Your title image</h6>
                        <div class="sa middle">Et harum quidem rerum facilis est et expedita distinctio.</div>
                    </div>
                    <div class="empty-space empty-space col-xs-b25 col-sm-b50"></div>
                </div>
                <div class="col-sm-6">
                    <div class="text-center">
                        <img class="thumbnail-image col-xs-b20" src="/yawei/img/thumbnail-48.jpg" alt="" />
                        <h6 class="h6 col-xs-b10">Your title image</h6>
                        <div class="sa middle">Et harum quidem rerum facilis est et expedita distinctio.</div>
                    </div>
                    <div class="empty-space empty-space col-xs-b25 col-sm-b50"></div>
                </div>
            </div> -->
            <div class="swiper-entry">
                <div class="swiper-container" data-autoplay="3000">
                    <div class="swiper-button-prev hidden"></div>
                    <div class="swiper-button-next hidden"></div>
                    <div class="swiper-wrapper">
                        @foreach(\Files::where('name','home')->first()->children()->where("name",'footer')->first()->children as $item )
                            <div class="swiper-slide">
                                <div class="text-center">
                                    <img class="thumbnail-image col-xs-b20" src="{{$item->present()->thumbSrc(null, null, [], 'name')}}" alt="" />
                                    <h6 class="h6 col-xs-b10">{{$item->name}}</h6>
                                    <div class="sa middle">{{$item->name}}</div>
                                </div>
                            </div>
                    @endforeach
                    <!--      <div class="swiper-slide">
                            <div class="text-center">
                                <img class="thumbnail-image col-xs-b20" src="/yawei/img/thumbnail-49.jpg" alt="" />
                                <h6 class="h6 col-xs-b10">Your title image</h6>
                                <div class="sa middle">Et harum quidem rerum facilis est et expedita distinctio.</div>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="text-center">
                                <img class="thumbnail-image col-xs-b20" src="/yawei/img/thumbnail-46.jpg" alt="" />
                                <h6 class="h6 col-xs-b10">Your title image</h6>
                                <div class="sa middle">Et harum quidem rerum facilis est et expedita distinctio.</div>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="text-center">
                                <img class="thumbnail-image col-xs-b20" src="/yawei/img/thumbnail-49.jpg" alt="" />
                                <h6 class="h6 col-xs-b10">Your title image</h6>
                                <div class="sa middle">Et harum quidem rerum facilis est et expedita distinctio.</div>
                            </div>
                        </div> -->
                    </div>
                    <div class="swiper-pagination relative-pagination"></div>
                </div>
            </div>
            <div class="empty-space col-xs-b60 col-sm-b120"></div>
        </div>

        <div class="row m0">
            @foreach(\Files::where('name','home')->first()->children()->where("name",'body')->first()->children as $item)
                <div class="col-sm-4">
                    <a class="thumbnail-shortcode-3 mouseover-1" href="#">
                        <img src="{{$item->present()->thumbSrc(null, null, [], 'name')}}" alt="" />
                        <img src="{{$item->present()->thumbSrc(null, null, [], 'name')}}" alt="" />
                        <span class="content">
                        <span class="sl light">{{$item->name}}</span>
                        <span class="title h4 light">{{$item->name}}</span>
                    </span>
                    </a>
                </div>
        @endforeach
        <!--        <div class="col-sm-4">
                <a class="thumbnail-shortcode-3 mouseover-1" href="#">
                    <img src="/yawei/img/thumbnail-57.jpg" alt="" />
                    <img src="/yawei/img/thumbnail-57.jpg" alt="" />
                    <span class="content">
                        <span class="sl light">Fashion / Photoshooting</span>
                        <span class="title h4 light">Great colours of  wild wind</span>
                    </span>
                </a>
            </div>
            <div class="col-sm-4">
                <a class="thumbnail-shortcode-3 mouseover-1" href="#">
                    <img src="/yawei/img/thumbnail-58.jpg" alt="" />
                    <img src="/yawei/img/thumbnail-58.jpg" alt="" />
                    <span class="content">
                        <span class="sl light">Fashion / Photoshooting</span>
                        <span class="title h4 light">Great colours of  wild wind</span>
                    </span>
                </a>
            </div> -->
        </div>
        @parent
    </div>
    @include('pages::public.login')
@stop