<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, minimal-ui"/>
    <link href="/yawei/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="/yawei/css/bootstrap.extension.css" rel="stylesheet" type="text/css" />
    <link href="/yawei/css/style.css" rel="stylesheet" type="text/css" />
    <link href="/yawei/css/swiper.css" rel="stylesheet" type="text/css" />
    <link href="/yawei/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="/yawei/img/favicon.ico" />
   <style>
    #map-canvas{
        vertical-align: middle
    }
    @media (max-width: 900px) {
        .cell-view {
            height:auto!important;
        }
        #map-canvas{
            margin-top: 0;
        }
    }
    </style>
    <title>深圳市亚淮科技</title>
</head>
<body>
     @yield('carousel')
    <header class="type-3 transparent">
        <div class="header-wrapper">
            <a id="logo" href=""><img src="img/logo-1.png" alt="" /></a>
            <div class="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            {{--<div class="follow style-1">--}}
                {{--<a class="entry" href="https://www.instagram.com/" target="_blank"><i class="fa fa-instagram"></i></a>--}}
                {{--<a class="entry" href="https://www.facebook.com/" target="_blank"><i class="fa fa-facebook"></i></a>--}}
                {{--<a class="entry" href="https://twitter.com/" target="_blank"><i class="fa fa-twitter"></i></a>--}}
                {{--<a class="entry" href="https://plus.google.com/" target="_blank"><i class="fa fa-google-plus"></i></a>--}}
            {{--</div>--}}
        </div>
        <div class="navigation-wrapper">
            <nav>
                <ul>
                    <li>
                        <a href="/home">首页</a>
                    </li>
                    <li>
                        <a href="/about">关于我们</a>
                    </li>
                    <li><a href="/service">服务</a></li>
                    <li>
                        <a href="/product">作品展</a>
                    </li>
                    <li>
                        <a href="/contact">联系我们</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
{{--    @yield("content")--}}
     @section('content')
         <!-- FOOTER -->
         <footer>
             <div class="container-fluid">
                 <div class="row">
                     <div class="col-md-6 col-xs-text-center col-md-text-left">
                         <div class="copyright sa small">&copy; 2016 All rights reserved. Development by <a href="" target="_blank"><b>UnionAgency</b></a>.</div>
                         <div class="col-xs-b15 visible-xs visible-sm"></div>
                     </div>
                     {{--<div class="col-md-6 col-xs-text-center col-md-text-right">--}}
                         {{--<div class="follow style-1">--}}
                             {{--<a class="entry" href="https://www.instagram.com/" target="_blank"><i class="fa fa-instagram"></i></a>--}}
                             {{--<a class="entry" href="https://www.facebook.com/" target="_blank"><i class="fa fa-facebook"></i></a>--}}
                             {{--<a class="entry" href="https://twitter.com/" target="_blank"><i class="fa fa-twitter"></i></a>--}}
                             {{--<a class="entry" href="https://plus.google.com/" target="_blank"><i class="fa fa-google-plus"></i></a>--}}
                         {{--</div>--}}
                     {{--</div>--}}
                 </div>
             </div>
         </footer>
     @show
</body>
</html>