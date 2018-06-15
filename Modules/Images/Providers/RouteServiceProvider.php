<?php

namespace TypiCMS\Modules\Images\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;
use TypiCMS\Modules\Core\Facades\TypiCMS;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to the controller routes in your routes file.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'TypiCMS\Modules\Images\Http\Controllers';

    /**
     * Define the routes for the application.
     *
     * @return null
     */
    public function map()
    {
        Route::namespace($this->namespace)->group(function (Router $router) {

            /*
             * Front office routes
             */
            if ($page = TypiCMS::getPageLinkedToModule('images')) {
                $router->middleware('public')->group(function (Router $router) use ($page) {
                    $options = $page->private ? ['middleware' => 'auth'] : [];
                    foreach (locales() as $lang) {
                        if ($page->translate('status', $lang) && $uri = $page->uri($lang)) {
                            $router->get($uri, $options + ['uses' => 'PublicController@index'])->name($lang.'::index-images');
                            $router->get($uri.'/{slug}', $options + ['uses' => 'PublicController@show'])->name($lang.'::image');
                        }
                    }
                });
            }

            /*
             * Admin routes
             */
            $router->middleware('admin')->prefix('admin')->group(function (Router $router) {
                $router->get('images', 'AdminController@index')->name('admin::index-images')->middleware('can:see-all-images');
                $router->get('images/create', 'AdminController@create')->name('admin::create-image')->middleware('can:create-image');
                $router->get('images/{image}/edit', 'AdminController@edit')->name('admin::edit-image')->middleware('can:update-image');
                $router->get('images/{image}/files', 'AdminController@files')->name('admin::edit-image-files')->middleware('can:update-image');
                $router->post('images', 'AdminController@store')->name('admin::store-image')->middleware('can:create-image');
                $router->put('images/{image}', 'AdminController@update')->name('admin::update-image')->middleware('can:update-image');
                $router->patch('images/{ids}', 'AdminController@ajaxUpdate')->name('admin::update-image-ajax')->middleware('can:update-image');
                $router->delete('images/{ids}', 'AdminController@destroyMultiple')->name('admin::destroy-image')->middleware('can:delete-image');
            });
        });
    }
}
