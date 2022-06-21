@if (config('cosmo.configs.allow_user_themes', false))
    <div class="col-md-2">
        <form method="POST" action="{{ route('set-theme') }}">
            @csrf

            <label for="theme" class="text-white font-weight-bold">Theme</label>
            <div class="input-group">
                <select class="custom-select" onchange="this.form.submit()" name="theme" id="theme" autocomplete="off">
                    @foreach($themes as $theme)
                        <option value="{{ $theme->name }}"
                                {{ $active_theme && $active_theme->name === $theme->name ? 'selected=""' : '' }}>
                            {{ Str::title($theme->name) }}
                        </option>
                    @endforeach
                </select>
            </div>
        </form>
    </div>
@endif