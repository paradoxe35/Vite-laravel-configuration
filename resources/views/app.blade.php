<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Vite</title>

    @if (app()->environment() === "local")
    <script type="module" src="{{ env('DEV_SERVER') }}/vite/client"></script>
    <script type="module" src="{{ env('DEV_SERVER') }}/app.js" defer></script>
    @else
    <link href="{{ mix('app.css', 'assets') }}" data-turbolinks-track="reload" rel="stylesheet">
    <script type="module" src="{{ mix('app.js', 'assets') }}" data-turbolinks-track="reload" defer>
    </script>
    @endif
</head>

<body class="antialiased">
    <div g-component="HomeComponent">
        <div id="#app" class="flex justify-center pt-8 sm:justify-start sm:pt-0">
            Vite Laravel Confirguration
        </div>
    </div>
</body>

</html>