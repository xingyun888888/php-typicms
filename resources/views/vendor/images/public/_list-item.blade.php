<li class="images-item">
    <a class="images-item-link" href="{{ route($lang.'::image', $image->slug) }}" title="{{ $image->title }}">
        <span class="images-item-title">{!! $image->title !!}</span>
        <span class="images-item-image">{!! $image->present()->thumb(null, 200) !!}</span>
    </a>
</li>
