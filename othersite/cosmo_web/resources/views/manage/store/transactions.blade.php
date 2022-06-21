<x-manage>
    <div class="page-title">
        <h1 class="font-weight-bold text-lg">Transactions <smalL>Manage Transactions</smalL></h1>
    </div>

    <div class="card shadow mb-4 mt-3">
        <div class="card-header py-3">
            <div class="row justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary ml-3">All Transactions</h6>

                <form method="post" action="{{ route('manage.store.transactions.prune-pending') }}">
                    @csrf

                    <button type="submit" class="col-auto btn btn-warning btn-icon-split btn-sm mr-3">
                        <span class="icon text-white-50">
                          <i class="fad fa-trash"></i>
                        </span>
                        <span class="text">Prune Pending Transactions</span>
                    </button>
                </form>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table mb-2">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Receiver</th>
                            <th scope="col">Buyer</th>
                            <th scope="col">Package</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($transactions as $transaction)
                            <tr>
                                <th scope="row">{{$transaction->id}}</th>
                                <th scope="row">{{$transaction->receiver}}</th>
                                <td>
                                    @if ($transaction->assigned)
                                        Assigned by admin
                                    @else
                                        <a href="{{ route('users.show', $transaction->buyer->steamid) }}">{{ $transaction->buyer->username}}</a>
                                    @endif
                                </td>
                                <td>
                                    @if ($package = $transaction->package)
                                    <a href="{{ route('manage.store.packages.edit', $transaction->package->id) }}">
                                        {{ $transaction->package->name }}
                                    </a>
                                    @else
                                        Deleted Package
                                    @endif
                                </td>
                                <td>{{ $transaction->price }}</td>
                                <td><span class="badge badge-primary p-2">{{ strtoupper($transaction->status) }}</span></td>
                                <td>{{ $transaction->created_at->diffForHumans() }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            {{ $transactions->links() }}
        </div>
    </div>
</x-manage>