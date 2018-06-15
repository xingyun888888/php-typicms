@extends("pages::layouts/header")
@section("carousel")
    <div></div>
@endsection
@section("content")
    <div id="content-block">

        <div class="fixed-background" style="background-image: url({{\Files::where('name','service')->first()->children()->where("name",'banner')->first()->children[0]->present()->thumbSrc(null,null,[],'name')}});">
            <div class="banner-shortcode">
                <div class="banner-frame border-image" style="border-image-source: url(/yawei/img/background-4_.jpg);"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="align">
                                <h1 class="h1 light">Explore what we can offer for you</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="empty-space col-xs-b60 col-sm-b120"></div>
            <div class="row">
                <div class="col-md-12 text-center">
                    <article class="sa">
                        <h3>我们的服务</h3>
                        <p>Et harum quidem rerum facilis est et expedita distinctio.</p>
                    </article>
                    <div class="empty-space col-xs-b25 col-sm-b50"></div>
                </div>
            </div>
            <div class="empty-space col-xs-b45 col-sm-b90"></div>
            @foreach(\Files::where('name','service')->first()->children()->where("name",'body')->first()->children as $item)
                <div class="services-shortcode-1">
                    <div class="preview-wrapper">
                        <div class="icon"></div>
                        <div class="icon"></div>
                        <div class="icon"></div>
                        <div class="icon"></div>
                        <div class="preview">
                            <span class="text-mask" style="background-image: url({{$item->present()->thumbSrc(null,null,[],'name')}});"><span class="text"><span class="text-align" data-letter="C"></span></span></span>
                        </div>
                    </div>
                    <div class="content">
                        <div class="align">
                            <div class="sl">{{$item->name}}</div>
                            <div class="sa">
                                <h4 class="h4 title">{{$item->name}}</h4>
                            </div>
                        </div>
                    </div>
                </div>
             @endforeach
            <div class="row">
                <div class="col-md-12 text-center">
                    <article class="sa">
                        <h3>我们可以提供什么</h3>
                        <p>Nemo enim ipsam voluptatem, quia voluptas sit</p>
                    </article>
                    <div class="empty-space col-xs-b25 col-sm-b50"></div>
                </div>
            </div>
            <div class="row">
                @foreach(\Files::where('name','product')->first()->children()->where("name",'footer')->first()->children as $item)
                    <div class="col-sm-4">
                        <div class="services-shortcode-2">
                            <div class="icon"><img src="{{$item->present()->thumbSrc(null,null,[],'name')}}" alt="" /></div>
                            <div class="sl">{{$item->name}}</div>
                            <div class="content">
                                <div class="sa middle">
                                    <h6>{{$item->name}}</h6>
                                    <p>{{$item->name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                 @endforeach
            </div>
            <div class="empty-space col-xs-b45 col-sm-b90"></div>
        </div>

        @parent
    </div>
    @include("pages::public.login")
@stop