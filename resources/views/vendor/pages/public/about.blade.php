@extends("pages::layouts.header")

@section("carousel")
    <div id="loader-wrapper"></div>

@endsection
@section("content")
    <div id="content-block">

        <div class="fixed-background" style="background-image: url({{\Files::where('name','about')->first()->children()->where("name",'banner')->first()->children[0]->present()->thumbSrc(null, null, [], 'name')}});">
            <div class="banner-shortcode">
                <div class="banner-frame border-image" style="border-image-source: url(/yawei/img/background-3_.jpg);"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">
                            <div class="align">
                                <h1 class="h1 light">Meet our nowadays team</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="empty-space col-xs-b60 col-sm-b120"></div>
            @foreach(\Files::whereName('about')->first()->children()->whereName('header')->first()->children as $item)
            <div class="row vertical-aligned-columns">
                <div class="col-sm-7 col-sm-push-5 col-xs-b30 col-sm-b0">
                    <div class="thumbnail-shortcode-4">
                        <div class="content">
                            <div class="layer-1 background" style="background-image: url({{$item->present()->thumbSrc(null, null, [], 'name')}});"></div>
                            <div class="layer-2 border border-image" style="border-image-source: url({{$item->present()->thumbSrc(null, null, [], 'name')}});"></div>
                            <div class="layer-3 background" style="background-image: url({{$item->present()->thumbSrc(null, null, [], 'name')}});"></div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-5 col-sm-pull-7">
                    <div class="sa">
                        <h3>{{$item->alt_attribute}}</h3>
                        <p>{{$item->description}}</p>
                    </div>
                </div>
            </div>
            @endforeach
            <div class="empty-space col-xs-b45 col-sm-b90"></div>
            <div class="row">
                <div class="col-md-12 text-center">
                    <article class="sa">
                        <h3>我们的团队</h3>
                        {{--<p>Et harum quidem rerum facilis est et expedita distinctio.</p>--}}
                    </article>
                    <div class="empty-space col-xs-b25 col-sm-b50"></div>
                </div>
            </div>
            <div class="swiper-entry">
                <div class="swiper-container" data-breakpoints="1" data-xs-slides="1" data-sm-slides="2" data-md-slides="2" data-lt-slides="3" data-slides-per-view="3" data-space="30">
                    <div class="swiper-button-prev hidden"></div>
                    <div class="swiper-button-next hidden"></div>
                    <div class="swiper-wrapper">
                        @foreach(\Files::where('name','about')->first()->children()->where("name",'body')->first()->children as $item)
                            <div class="swiper-slide">
                                <div class="thumbnail-shortcode-5">
                                    <div class="content">
                                        <div class="layer-1 border-image" style="border-image-source: url({{$item->present()->thumbSrc(null, null, [], 'name')}});"></div>
                                        <div class="layer-2"><img src="{{$item->present()->thumbSrc(null, null, [], 'name')}}" alt="" /></div>
                                    </div>
                                    <div class="description">
                                        <h6 class="h6 title">{{$item->name}}</h6>
                                        <div class="sa small">{{$item->name}}</div>
                                    </div>
                                    <div class="animation follow style-1">
                                        <a class="entry" href="https://www.instagram.com/" target="_blank"><i class="fa fa-instagram"></i></a>
                                        <a class="entry" href="https://www.facebook.com/" target="_blank"><i class="fa fa-facebook"></i></a>
                                        <a class="entry" href="https://twitter.com/" target="_blank"><i class="fa fa-twitter"></i></a>
                                        <a class="entry" href="https://plus.google.com/" target="_blank"><i class="fa fa-google-plus"></i></a>
                                    </div>
                                </div>
                            </div>
                    @endforeach
                    <!--      <div class="swiper-slide">
                            <div class="thumbnail-shortcode-5">
                                <div class="content">
                                    <div class="layer-1 border-image" style="border-image-source: url(/yawei/img/thumbnail-63.jpg);"></div>
                                    <div class="layer-2"><img src="/yawei/img/thumbnail-transparent-2.png" alt="" /></div>
                                </div>
                                <div class="description">
                                    <h6 class="h6 title">Mark Raily</h6>
                                    <div class="sa small">Project Director</div>
                                </div>
                                <div class="animation follow style-1">
                                    <a class="entry" href="https://www.instagram.com/" target="_blank"><i class="fa fa-instagram"></i></a>
                                    <a class="entry" href="https://www.facebook.com/" target="_blank"><i class="fa fa-facebook"></i></a>
                                    <a class="entry" href="https://twitter.com/" target="_blank"><i class="fa fa-twitter"></i></a>
                                    <a class="entry" href="https://plus.google.com/" target="_blank"><i class="fa fa-google-plus"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="thumbnail-shortcode-5">
                                <div class="content">
                                    <div class="layer-1 border-image" style="border-image-source: url(/yawei/img/thumbnail-64.jpg);"></div>
                                    <div class="layer-2"><img src="/yawei/img/thumbnail-transparent-3.png" alt="" /></div>
                                </div>
                                <div class="description">
                                    <h6 class="h6 title">Stefany Jacobs</h6>
                                    <div class="sa small">Graphic Designer</div>
                                </div>
                                <div class="animation follow style-1">
                                    <a class="entry" href="https://www.instagram.com/" target="_blank"><i class="fa fa-instagram"></i></a>
                                    <a class="entry" href="https://www.facebook.com/" target="_blank"><i class="fa fa-facebook"></i></a>
                                    <a class="entry" href="https://twitter.com/" target="_blank"><i class="fa fa-twitter"></i></a>
                                    <a class="entry" href="https://plus.google.com/" target="_blank"><i class="fa fa-google-plus"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="thumbnail-shortcode-5">
                                <div class="content">
                                    <div class="layer-1 border-image" style="border-image-source: url(/yawei/img/thumbnail-62.jpg);"></div>
                                    <div class="layer-2"><img src="/yawei/img/thumbnail-transparent-1.png" alt="" /></div>
                                </div>
                                <div class="description">
                                    <h6 class="h6 title">Linda Otis</h6>
                                    <div class="sa small">Manager</div>
                                </div>
                                <div class="animation follow style-1">
                                    <a class="entry" href="https://www.instagram.com/" target="_blank"><i class="fa fa-instagram"></i></a>
                                    <a class="entry" href="https://www.facebook.com/" target="_blank"><i class="fa fa-facebook"></i></a>
                                    <a class="entry" href="https://twitter.com/" target="_blank"><i class="fa fa-twitter"></i></a>
                                    <a class="entry" href="https://plus.google.com/" target="_blank"><i class="fa fa-google-plus"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="thumbnail-shortcode-5">
                                <div class="content">
                                    <div class="layer-1 border-image" style="border-image-source: url(/yawei/img/thumbnail-63.jpg);"></div>
                                    <div class="layer-2"><img src="/yawei/img/thumbnail-transparent-2.png" alt="" /></div>
                                </div>
                                <div class="description">
                                    <h6 class="h6 title">Mark Raily</h6>
                                    <div class="sa small">Project Director</div>
                                </div>
                                <div class="animation follow style-1">
                                    <a class="entry" href="https://www.instagram.com/" target="_blank"><i class="fa fa-instagram"></i></a>
                                    <a class="entry" href="https://www.facebook.com/" target="_blank"><i class="fa fa-facebook"></i></a>
                                    <a class="entry" href="https://twitter.com/" target="_blank"><i class="fa fa-twitter"></i></a>
                                    <a class="entry" href="https://plus.google.com/" target="_blank"><i class="fa fa-google-plus"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="thumbnail-shortcode-5">
                                <div class="content">
                                    <div class="layer-1 border-image" style="border-image-source: url(/yawei/img/thumbnail-64.jpg);"></div>
                                    <div class="layer-2"><img src="/yawei/img/thumbnail-transparent-3.png" alt="" /></div>
                                </div>
                                <div class="description">
                                    <h6 class="h6 title">Stefany Jacobs</h6>
                                    <div class="sa small">Graphic Designer</div>
                                </div>
                                <div class="animation follow style-1">
                                    <a class="entry" href="https://www.instagram.com/" target="_blank"><i class="fa fa-instagram"></i></a>
                                    <a class="entry" href="https://www.facebook.com/" target="_blank"><i class="fa fa-facebook"></i></a>
                                    <a class="entry" href="https://twitter.com/" target="_blank"><i class="fa fa-twitter"></i></a>
                                    <a class="entry" href="https://plus.google.com/" target="_blank"><i class="fa fa-google-plus"></i></a>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <div class="swiper-pagination relative-pagination"></div>
                </div>
            </div>
            <div class="empty-space col-xs-b45 col-sm-b90"></div>
            <div class="swiper-entry">
                <div class="swiper-button-prev visible-lg"></div>
                <div class="swiper-button-next visible-lg"></div>
                <div class="swiper-container" data-space="30">
                    <div class="swiper-wrapper">
                        @foreach(\Files::where('name','about')->first()->children()->where("name",'footer')->first()->children as $item)
                            <div class="swiper-slide">
                                <div class="row vertical-aligned-columns">
                                    <div class="col-sm-7 col-xs-b30 col-sm-b0">
                                        <div class="thumbnail-shortcode-6">
                                            <div class="content">
                                                <div class="layer-1 border border-image" style="border-image-source: url({{$item->present()->thumbSrc(null, null, [], 'name')}});"></div>
                                                <div class="layer-2 background" style="background-image: url({{$item->present()->thumbSrc(null, null, [], 'name')}});"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-5">
                                        <div class="sa">
                                            <h3>{{$item->name}}</h3>
                                            <p>{{$item->name}}</p>
                                            <a class="button style-2" href="#">read more</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    @endforeach
                    <!--  <div class="swiper-slide">
                            <div class="row vertical-aligned-columns">
                                <div class="col-sm-7 col-sm-push-5 col-xs-b30 col-sm-b0">
                                    <div class="thumbnail-shortcode-6">
                                        <div class="content">
                                            <div class="layer-1 border border-image" style="border-image-source: url(/yawei/img/thumbnail-65.jpg);"></div>
                                            <div class="layer-2 background" style="background-image: url(/yawei/img/thumbnail-66.jpg);"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-5 col-sm-pull-7">
                                    <div class="sa">
                                        <h3>We can focus users attention on your design</h3>
                                        <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum.</p>
                                        <a class="button style-2" href="#">read more</a>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <div class="swiper-pagination relative-pagination hidden-lg"></div>
                </div>
            </div>
            <div class="empty-space col-xs-b45 col-sm-b90"></div>
            <div class="row">
                <div class="col-md-12 text-center">
                    <article class="sa">
                        <h3>我们的客户</h3>
                        {{--<p>Et harum quidem rerum facilis est et expedita distinctio.</p>--}}
                    </article>
                    <div class="empty-space col-xs-b25 col-sm-b50"></div>
                </div>
            </div>
            <div class="row">
                @foreach(\Files::where('name','about')->first()->children()->where("name",'footer')->first()->children as $item)
                    <div class="col-xs-6 col-sm-3">
                        <a href="#" class="client-logo mouseover-2"><img src="{{$item->present()->thumbSrc(null, null, [], 'name')}}" alt="" /></a>
                    </div>
                @endforeach
            <!--  <div class="col-xs-6 col-sm-3">
                    <a href="#" class="client-logo mouseover-2"><img src="/yawei/img/client-logo-2.jpg" alt="" /></a>
                </div>
                <div class="col-xs-6 col-sm-3">
                    <a href="#" class="client-logo mouseover-2"><img src="/yawei/img/client-logo-3.jpg" alt="" /></a>
                </div>
                <div class="col-xs-6 col-sm-3">
                    <a href="#" class="client-logo mouseover-2"><img src="/yawei/img/client-logo-4.jpg" alt="" /></a>
                </div>
                <div class="col-xs-6 col-sm-3">
                    <a href="#" class="client-logo mouseover-2"><img src="/yawei/img/client-logo-5.jpg" alt="" /></a>
                </div>
                <div class="col-xs-6 col-sm-3">
                    <a href="#" class="client-logo mouseover-2"><img src="/yawei/img/client-logo-6.jpg" alt="" /></a>
                </div>
                <div class="col-xs-6 col-sm-3">
                    <a href="#" class="client-logo mouseover-2"><img src="/yawei/img/client-logo-7.jpg" alt="" /></a>
                </div>
                <div class="col-xs-6 col-sm-3">
                    <a href="#" class="client-logo mouseover-2"><img src="/yawei/img/client-logo-8.jpg" alt="" /></a>
                </div> -->
            </div>
        </div>

        <!-- FOOTER -->
        @parent
    </div>

    @include("pages::public.login")
@stop