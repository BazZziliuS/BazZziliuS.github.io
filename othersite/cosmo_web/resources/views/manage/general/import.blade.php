<x-manage>
    <div class="page-title">
        <h1 class="font-weight-bold text-lg">Import <smalL>Import data from other applications</smalL></h1>
    </div>

    <form action="{{ route('manage.general.import.start') }}" method="POST" class="mb-3">
        @csrf

        <div class="mb-3">
            @foreach($importers as $name)
                <div class="custom-control custom-radio">
                    <input type="radio" id="importer-{{$name}}" name="importer"
                           class="custom-control-input" value="{{ $name }}">
                    <label class="custom-control-label" for="importer-{{$name}}">{{ ucfirst($name) }}</label>
                </div>
            @endforeach
        </div>

        <div class="mb-3">
            <label for="db_host" class="form-label">MySQL Host</label>
            <input type="text" class="form-control" id="db_host" name="host">
        </div>

        <div class="mb-3">
            <label for="db_port" class="form-label">MySQL Port</label>
            <input type="number" class="form-control" id="db_port" name="port">
        </div>

        <div class="mb-3">
            <label for="db_username" class="form-label">MySQL Username</label>
            <input type="text" class="form-control" id="db_username" name="username">
        </div>

        <div class="mb-3">
            <label for="db_password" class="form-label">MySQL Password</label>
            <input type="password" class="form-control" id="db_password" name="password">
        </div>

        <div class="mb-3">
            <label for="db_database" class="form-label">MySQL Database</label>
            <input type="text" class="form-control" id="db_database" name="database">
        </div>

        <button type="submit" class="btn btn-primary">Start Import</button>
    </form>

    <code>NOTE: Please only click the <span class="quote">"Start Import"</span> button once, even if it appears un-functional!</code>
</x-manage>