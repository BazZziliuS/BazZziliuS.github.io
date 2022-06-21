<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Cosmo - Management</title>

    <script src="https://kit.fontawesome.com/74de4910c5.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,300,700,800" rel="stylesheet">

    <link rel="stylesheet" href="{{ asset('css/manage.css') }}"/>

    @stack('meta')
    {{ $meta ?? '' }}

    <script type="text/javascript">
        function setTheme(themeName) {
            localStorage.setItem('manage-theme', themeName);
            document.documentElement.setAttribute('data-theme', themeName);
        }

        let theme = localStorage.getItem('manage-theme')
        if (!theme || (theme !== 'light' && theme !== 'dark')) theme = 'light';

        setTheme(theme);
    </script>
</head>
<body id="page-top">
<!-- Page Wrapper -->
<div id="wrapper">

    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="{{ route('manage.dashboard') }}">
            <div class="sidebar-brand-text mx-3">Cosmo <sup>{{ config('cosmo.version') }}</sup></div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0"/>

        <!-- Nav Item - Dashboard -->
        <li class="nav-item active">
            <a class="nav-link" href="{{route('manage.dashboard')}}">
                <i class="fad fa-fw fa-tachometer-alt" data-tippy-content="Dashboard"></i>
                <span>Dashboard</span></a>
        </li>

        <hr class="sidebar-divider"/>

        <div class="sidebar-heading">General</div>

        <li class="nav-item">
            <a class="nav-link" href="{{route('manage.general.settings', 'general')}}">
                <i class="fad fa-fw fa-cog" data-tippy-content="Settings"></i>
                <span>Settings</span>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link" href="{{route('manage.general.users')}}">
                <i class="fad fa-fw fa-users" data-tippy-content="Users"></i>
                <span>Users</span>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link" href="{{route('manage.general.bans')}}">
                <i class="fad fa-fw fa-ban" data-tippy-content="Bans"></i>
                <span>Bans</span>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link" href="{{route('manage.general.roles')}}">
                <i class="fad fa-fw fa-user-cog" data-tippy-content="Roles"></i>
                <span>Roles</span>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link" href="{{route('manage.general.import')}}">
                <i class="fad fa-fw fa-exchange" data-tippy-content="Import"></i>
                <span>Import</span>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link" href="{{route('manage.general.changelogs')}}">
                <i class="fad fa-fw fa-scroll" data-tippy-content="Changelogs"></i>
                <span>Changelogs</span>
            </a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">Index</div>

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
               aria-expanded="true" aria-controls="collapseTwo">
                <i class="fad fa-puzzle-piece fa-fw" data-tippy-content="Components"></i>
                <span>Components</span>
            </a>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <a class="collapse-item" href="{{route('manage.index.navlinks')}}">Nav Links</a>
                    <a class="collapse-item" href="{{route('manage.index.features')}}">Features</a>
                    <a class="collapse-item" href="{{route('manage.index.servers')}}">Servers</a>
                    <a class="collapse-item" href="{{route('manage.index.footerlinks')}}">Footer Links</a>
                </div>
            </div>
        </li>

        <li class="nav-item">
            <a class="nav-link" href="{{route('manage.index.theme')}}">
                <i class="fad fa-fw fa-paint-brush" data-tippy-content="Theme"></i>
                <span>Theme</span>
            </a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">Forums</div>

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link" href="{{route('manage.forums.categories')}}">
                <i class="fad fa-fw fa-box" data-tippy-content="Categories"></i>
                <span>Categories</span>
            </a>
        </li>

        <!-- Nav Item - Charts -->
        <li class="nav-item">
            <a class="nav-link" href="{{route('manage.forums.boards')}}">
                <i class="fad fa-fw fa-file-archive" data-tippy-content="Boards"></i>
                <span>Boards</span>
            </a>
        </li>

        <!-- Nav Item - Tables -->
        <li class="nav-item">
            <a class="nav-link" href="{{route('manage.forums.polls')}}">
                <i class="fad fa-fw fa-poll" data-tippy-content="Polls"></i>
                <span>Polls</span>
            </a>
        </li>


        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block"/>

        <div class="sidebar-heading">Store</div>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#package-dropdown"
               aria-expanded="true" aria-controls="package-dropdown">
                <i class="fad fa-fw fa-table" data-tippy-content="Packages"></i>
                <span>Packages</span>
            </a>
            <div id="package-dropdown" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <a class="collapse-item" href="{{route('manage.store.packages.create')}}">Create</a>
                    <a class="collapse-item" href="{{route('manage.store.packages')}}">Manage</a>
                </div>
            </div>
        </li>

        <li class="nav-item">
            <a class="nav-link" href="{{route('manage.store.coupons')}}">
                <i class="fad fa-fw fa-dollar-sign" data-tippy-content="Coupon Codes"></i>
                <span>Coupon Codes</span>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link" href="{{route('manage.store.sales')}}">
                <i class="fad fa-fw fa-tags" data-tippy-content="Sales"></i>
                <span>Sales</span>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link" href="{{route('manage.store.transactions')}}">
                <i class="fad fa-fw fa-file-invoice" data-tippy-content="Transactions"></i>
                <span>Orders</span>
            </a>
        </li>

        <hr class="sidebar-divider d-none d-md-block">

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

        <!-- Main Content -->
        <div id="content">

            <!-- Topbar -->
            <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                <!-- Sidebar Toggle (Topbar) -->
                <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                    <i class="fa fa-bars"></i>
                </button>

                <!-- Topbar Navbar -->
                <ul class="navbar-nav ml-auto">
                    <div class="topbar-divider d-none d-sm-block"></div>

                    <!-- Nav Item - User Information -->
                    <li class="nav-item dropdown no-arrow">
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{auth()->user()->username}}</span>
                            <img class="img-profile rounded-circle" src="{{auth()->user()->avatar}}">
                        </a>
                        <!-- Dropdown - User Information -->
                        <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                             aria-labelledby="userDropdown">
                            <a class="dropdown-item" href="{{route('users.show', auth()->user()->steamid)}}">
                                <i class="fad fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Profile
                            </a>
                            <a class="dropdown-item" href="{{route('home')}}">
                                <i class="fad fa-portal-exit fa-sm fa-fw mr-2 text-gray-400"></i>
                                Exit Management
                            </a>
                            <div class="dropdown-divider"></div>

                            <form action="{{ route('logout') }}" method="post">
                                @csrf

                                <button class="dropdown-item" type="submit">
                                    <i class="fad fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </button>
                            </form>
                        </div>
                    </li>

                </ul>

            </nav>
            <!-- End of Topbar -->

            <!-- Begin Page Content -->
            <div class="container-fluid">
                {{$slot ?? 'No slot set'}}
            </div>
            <!-- /.container-fluid -->

        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
        <footer class="sticky-footer bg-white">
            <div class="container my-auto">
                <div class="copyright text-center my-auto">
                    <span>Copyright &copy; Cosmo Team <3</span>
                </div>
            </div>
        </footer>
        <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

</div>
<!-- End of Page Wrapper -->

<!-- Scroll to Top Button-->
<a class="scroll-to-top rounded" href="#page-top">
    <i class="fad fa-angle-up"></i>
</a>

<script src="{{ asset('js/manage/index.js') }}"></script>

@stack('scripts')
{{$scripts ?? ''}}

{!! app('toastr')->render() !!}

@if (config('cosmo.analytics_enabled'))
<script async defer data-website-id="897c8415-bc4d-4dd3-89a7-71aa6abe9c7b" src="https://stats.tbdscripts.com/umami.js"></script>
@endif

</body>
</html>
