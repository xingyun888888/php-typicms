<?php

return [

    /*
    |--------------------------------------------------------------------------
    | You can choose not to have main locale in URLs
    |--------------------------------------------------------------------------
    |
    | If set to false, the fallback_locale defined in config/app.php
    | will not appears in URLs.
    |
    */
    'main_locale_in_url' => false,


    'content_locale' => 'en',
    /*
    |--------------------------------------------------------------------------
    | Max file upload size allowed
    |--------------------------------------------------------------------------
    */
    'max_file_upload_size' => 8000,

    /*
    |--------------------------------------------------------------------------
    | Welcome message url present in Dashboard
    |--------------------------------------------------------------------------
    */
    'welcome_message_url' => getenv('WELCOME_MESSAGE_URL'),

    /*
    |--------------------------------------------------------------------------
    | Per module config
    |--------------------------------------------------------------------------
    |
    | Here you can override config for each module.
    |
    */
    'news' => [
        'per_page' => 50,
    ],

    /*
    |--------------------------------------------------------------------------
    | Folder to find template files for pages.
    | This folder is a subfolder of /resources/views/vendor/pages
    |--------------------------------------------------------------------------
    |
    */
    'template_dir' => 'public',

];
