<?php

namespace TypiCMS\Modules\Images\Composers;

use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Gate;
use Maatwebsite\Sidebar\SidebarGroup;
use Maatwebsite\Sidebar\SidebarItem;

class SidebarViewComposer
{
    public function compose(View $view)
    {
        if (Gate::denies('see-all-images')) {
            return;
        }
        $view->sidebar->group(__('Content'), function (SidebarGroup $group) {
            $group->id = 'content';
            $group->weight = 30;
            $group->addItem(__('Images'), function (SidebarItem $item) {
                $item->id = 'images';
                $item->icon = config('typicms.images.sidebar.icon');
                $item->weight = config('typicms.images.sidebar.weight');
                $item->route('admin::index-images');
                $item->append('admin::create-image');
            });
        });
    }
}
