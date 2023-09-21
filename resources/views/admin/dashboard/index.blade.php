@extends('layouts.admin.app')

@section('title','Dashboard')

@section('content')
<div class="row">
    <div class="col-xl-4  col-lg-6">
        <div class="card">
            <div class="card-header border-0 pb-0">
                <h4 class="card-title">Timeline</h4>
            </div>
            <div class="card-body p-0">
                <div id="DZ_W_TimeLine" class="widget-timeline dz-scroll height370 my-4 px-4">
                    <ul class="timeline">
                        <li>
                            <div class="timeline-badge primary"></div>
                            <a class="timeline-panel " href="#">
                                <span>10 minutes ago</span>
                                <h6 class="mb-0">Youtube, a video-sharing website, goes live <strong class="text-primary">$500</strong>.</h6>
                            </a>
                        </li>
                        <li>
                            <div class="timeline-badge info">
                            </div>
                            <a class="timeline-panel " href="#">
                                <span>20 minutes ago</span>
                                <h6 class="mb-0">New order placed <strong class="text-info">#XF-2356.</strong></h6>
                                <p class="mb-0">Quisque a consequat ante Sit amet magna at volutapt...</p>
                            </a>
                        </li>
                        <li>
                            <div class="timeline-badge danger">
                            </div>
                            <a class="timeline-panel " href="#">
                                <span>30 minutes ago</span>
                                <h6 class="mb-0">john just buy your product <strong class="text-warning">Sell $250</strong></h6>
                            </a>
                        </li>
                        <li>
                            <div class="timeline-badge success">
                            </div>
                            <a class="timeline-panel" href="#">
                                <span>15 minutes ago</span>
                                <h6 class="mb-0">StumbleUpon is acquired by eBay. </h6>
                            </a>
                        </li>
                        <li>
                            <div class="timeline-badge warning">
                            </div>
                            <a class="timeline-panel" href="#">
                                <span>20 minutes ago</span>
                                <h6 class="mb-0">Mashable, a news website and blog, goes live.</h6>
                            </a>
                        </li>
                        <li>
                            <div class="timeline-badge dark">
                            </div>
                            <a class="timeline-panel" href="#">
                                <span>20 minutes ago</span>
                                <h6 class="mb-0">Mashable, a news website and blog, goes live.</h6>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-4  col-lg-6">
        <div class="card">
            <div class="card-header border-0 pb-0">
                <h4 class="card-title">Timeline 2</h4>
            </div>
            <div class="card-body p-0">
                <div id="DZ_W_TimeLine11" class="widget-timeline dz-scroll style-1 height370 my-4 px-4">
                    <ul class="timeline">
                        <li>
                            <div class="timeline-badge primary"></div>
                            <a class="timeline-panel" href="#">
                                <span>10 minutes ago</span>
                                <h6 class="mb-0">Youtube, a video-sharing website, goes live <strong class="text-primary">$500</strong>.</h6>
                            </a>
                        </li>
                        <li>
                            <div class="timeline-badge info">
                            </div>
                            <a class="timeline-panel" href="#">
                                <span>20 minutes ago</span>
                                <h6 class="mb-0">New order placed <strong class="text-info">#XF-2356.</strong></h6>
                                <p class="mb-0">Quisque a consequat ante Sit amet magna at volutapt...</p>
                            </a>
                        </li>
                        <li>
                            <div class="timeline-badge danger">
                            </div>
                            <a class="timeline-panel" href="#">
                                <span>30 minutes ago</span>
                                <h6 class="mb-0">john just buy your product <strong class="text-warning">Sell $250</strong></h6>
                            </a>
                        </li>
                        <li>
                            <div class="timeline-badge success">
                            </div>
                            <a class="timeline-panel " href="#">
                                <span>15 minutes ago</span>
                                <h6 class="mb-0">StumbleUpon is acquired by eBay. </h6>
                            </a>
                        </li>
                        <li>
                            <div class="timeline-badge warning">
                            </div>
                            <a class="timeline-panel " href="#">
                                <span>20 minutes ago</span>
                                <h6 class="mb-0">Mashable, a news website and blog, goes live.</h6>
                            </a>
                        </li>
                        <li>
                            <div class="timeline-badge dark">
                            </div>
                            <a class="timeline-panel " href="#">
                                <span>20 minutes ago</span>
                                <h6 class="mb-0">Mashable, a news website and blog, goes live.</h6>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-4  col-lg-6">
        <div class="card">
            <div class="card-header  border-0 pb-0">
                <h4 class="card-title">Notifications</h4>
            </div>
            <div class="card-body p-0">
                <div id="DZ_W_Todo1" class="widget-media dz-scroll height370 my-4 px-4">
                    <ul class="timeline">
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2">
                                    <img alt="image" width="50" src="images/avatar/1.jpg">
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Dr sultads Send you Photo</h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-primary light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2 media-info">
                                    KG
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Resport created successfully</h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-info light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2 media-success">
                                    <i class="fa fa-home"></i>
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Reminder : Treatment Time!</h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                         <li>
                            <div class="timeline-panel">
                                <div class="media me-2">
                                    <img alt="image" width="50" src="images/avatar/1.jpg">
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Dr sultads Send you Photo</h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-primary light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2 media-danger">
                                    KG
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Resport created successfully</h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-danger light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2 media-primary">
                                    <i class="fa fa-home"></i>
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Reminder : Treatment Time!</h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-primary light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-4  col-lg-6">
        <div class="card border-0 pb-0">
            <div class="card-header border-0 pb-0">
                <h4 class="card-title">Notifications 2</h4>
            </div>
            <div class="card-body p-0">
                <div id="DZ_W_Todo2" class="widget-media dz-scroll height370 my-4 px-4">
                    <ul class="timeline">
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2">
                                    <img alt="image" width="50" src="images/avatar/1.jpg">
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Dr sultads Send you Photo</h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-primary light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2 media-info">
                                    KG
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Resport created successfully <span class="badge badge-warning">Warning</span></h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-info light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2 media-success">
                                    <i class="fa fa-home"></i>
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Reminder : Treatment Time!</h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                         <li>
                            <div class="timeline-panel">
                                <div class="media me-2">
                                    <img alt="image" width="50" src="images/avatar/1.jpg">
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Dr sultads Send you Photo <span class="badge light badge-danger">Danger</span></h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-primary light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2 media-danger">
                                    KG
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Resport created successfully <span class="badge light badge-success">Success</span></h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-danger light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2 media-primary">
                                    <i class="fa fa-home"></i>
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Reminder : Treatment Time! <span class="badge light badge-success">Success</span></h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-primary light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-4  col-lg-6">
        <div class="card border-0 pb-0">
            <div class="card-header border-0 pb-0">
                <h4 class="card-title">Message</h4>
            </div>
            <div class="card-body p-0">
                <div id="DZ_W_Todo3" class="widget-media dz-scroll height370 my-4 px-4">
                    <ul class="timeline">
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2">
                                    <img alt="image" width="50" src="images/avatar/1.jpg">
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Alfie Mason <small class="">29 July 2020</small></h5>
                                    <p class="mb-1">I shared this on my fb wall a few months back..</p>
                                    <a href="#" class="btn btn-primary btn-xxs shadow">Reply</a>
                                    <a href="#" class="btn btn-danger btn-xxs">Delete</a>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-primary light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2 media-info">
                                    KG
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Jacob Tucker <small class="">29 July 2020</small></h5>
                                    <p class="mb-1">I shared this on my fb wall a few months back..</p>
                                    <a href="#" class="btn btn-primary btn-xxs shadow">Reply</a>
                                    <a href="#" class="btn btn-danger btn-xxs">Delete</a>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-info light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2 media-success">
                                    <img alt="image" width="50" src="images/avatar/2.jpg">
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Jack Ronan <small class="">29 July 2020</small></h5>
                                    <p class="mb-1">I shared this on my fb wall a few months back..</p>
                                    <a href="#" class="btn btn-primary btn-xxs shadow">Reply</a>
                                    <a href="#" class="btn btn-danger btn-xxs">Delete</a>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                         <li>
                            <div class="timeline-panel">
                                <div class="media me-2">
                                    <img alt="image" width="50" src="images/avatar/1.jpg">
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Noah Baldon <small class="">29 July 2020</small></h5>
                                    <p class="mb-1">I shared this on my fb wall a few months back..</p>
                                    <a href="#" class="btn btn-primary btn-xxs shadow">Reply</a>
                                    <a href="#" class="btn btn-danger btn-xxs">Delete</a>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-primary light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2 media-danger">
                                    PU
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Thomas Grady  <small class="">02:26 PM</small></h5>
                                    <p class="mb-1">I shared this on my fb wall a few months back..</p>
                                    <a href="#" class="btn btn-primary btn-xxs shadow">Reply</a>
                                    <a href="#" class="btn btn-danger btn-xxs">Delete</a>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-danger light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2 media-primary">
                                    <img alt="image" width="50" src="images/avatar/3.jpg">
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Oscar Weston  <small class="">29 July 2020</small></h5>
                                    <p class="mb-1">I shared this on my fb wall a few months back..</p>
                                    <a href="#" class="btn btn-primary btn-xxs shadow">Reply</a>
                                    <a href="#" class="btn btn-danger btn-xxs">Delete</a>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-primary light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-4  col-lg-6">
        <div class="card border-0 pb-0">
            <div class="card-header border-0 pb-0">
                <h4 class="card-title">To Do List</h4>
            </div>
            <div class="card-body p-0">
                <div id="DZ_W_Todo4" class="widget-media dz-scroll height370 my-4 px-4">
                    <ul class="timeline">
                        <li>
                            <div class="timeline-panel">
                                <div class="form-check custom-checkbox checkbox-success check-lg me-3">
                                    <input type="checkbox" class="form-check-input" id="customCheckBox1" required="">
                                    <label class="form-check-label" for="customCheckBox1"></label>
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-0">Get up</h5>
                                    <small class="">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="form-check custom-checkbox checkbox-warning check-lg me-3">
                                    <input type="checkbox" class="form-check-input" id="customCheckBox2" required="">
                                    <label class="form-check-label" for="customCheckBox2"></label>
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-0">Stand up</h5>
                                    <small class="">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-warning light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="form-check custom-checkbox checkbox-primary check-lg me-3">
                                    <input type="checkbox" class="form-check-input" id="customCheckBox3" required="">
                                    <label class="form-check-label" for="customCheckBox3"></label>
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-0">Don't give up the fight.</h5>
                                    <small class="">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-primary light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="form-check custom-checkbox checkbox-info check-lg me-3">
                                    <input type="checkbox" class="form-check-input" id="customCheckBox4" required="">
                                    <label class="form-check-label" for="customCheckBox4"></label>
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-0">Do something else</h5>
                                    <small class="text-mu">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-info light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="form-check custom-checkbox checkbox-success check-lg me-3">
                                    <input type="checkbox" class="form-check-input" id="customCheckBox5" required="">
                                    <label class="form-check-label" for="customCheckBox5"></label>
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-0">Get up</h5>
                                    <small class="">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="form-check custom-checkbox checkbox-warning check-lg me-3">
                                    <input type="checkbox" class="form-check-input" id="customCheckBox6" required="">
                                    <label class="form-check-label" for="customCheckBox6"></label>
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-0">Stand up</h5>
                                    <small class="">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-warning light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-3  col-lg-6 col-sm-6">
        <div class="widget-stat card">
            <div class="card-body p-4">
                <div class="media ai-icon">
                    <span class="me-3 bgl-primary text-primary">
                        <!-- <i class="ti-user"></i> -->
                        <svg id="icon-customers" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </span>
                    <div class="media-body">
                        <p class="mb-1">Patient</p>
                        <h4 class="mb-0">3280</h4>
                        <span class="badge badge-primary">+3.5%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3  col-lg-6 col-sm-6">
        <div class="widget-stat card">
            <div class="card-body p-4">
                <div class="media ai-icon">
                    <span class="me-3 bgl-warning text-warning">
                        <svg id="icon-orders" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    </span>
                    <div class="media-body">
                        <p class="mb-1">Bills</p>
                        <h4 class="mb-0">2570</h4>
                        <span class="badge badge-warning">+3.5%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3  col-lg-6 col-sm-6">
        <div class="widget-stat card">
            <div class="card-body  p-4">
                <div class="media ai-icon">
                    <span class="me-3 bgl-danger text-danger">
                        <svg id="icon-revenue" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                    </span>
                    <div class="media-body">
                        <p class="mb-1">Revenue</p>
                        <h4 class="mb-0">364.50K</h4>
                        <span class="badge badge-danger">-3.5%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3  col-lg-6 col-sm-6">
        <div class="widget-stat card">
            <div class="card-body p-4">
                <div class="media ai-icon">
                    <span class="me-3 bgl-success text-success">
                        <svg id="icon-database-widget" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-database">
                            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                        </svg>
                    </span>
                    <div class="media-body">
                        <p class="mb-1">Patient</p>
                        <h4 class="mb-0">364.50K</h4>
                        <span class="badge badge-success">-3.5%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-3  col-lg-6 col-sm-6">
        <div class="card bg-info">
            <div class="card-body">
                <div class="students d-flex align-items-center justify-content-between flex-wrap">
                    <div>
                        <h4>9,825</h4>
                        <h5>Total Students</h5>
                        <span>+0,5% than last month</span>
                    </div>
                    <div>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M57.4998 47.5001C57.4998 48.1631 57.2364 48.799 56.7676 49.2678C56.2988 49.7367 55.6629 50.0001 54.9998 50.0001H24.9998C24.3368 50.0001 23.7009 49.7367 23.2321 49.2678C22.7632 48.799 22.4998 48.1631 22.4998 47.5001C22.4998 43.5218 24.0802 39.7065 26.8932 36.8935C29.7063 34.0804 33.5216 32.5001 37.4998 32.5001H42.4998C46.4781 32.5001 50.2934 34.0804 53.1064 36.8935C55.9195 39.7065 57.4998 43.5218 57.4998 47.5001ZM39.9998 10.0001C38.022 10.0001 36.0886 10.5866 34.4441 11.6854C32.7996 12.7842 31.5179 14.346 30.761 16.1732C30.0041 18.0005 29.8061 20.0112 30.192 21.951C30.5778 23.8908 31.5302 25.6726 32.9288 27.0711C34.3273 28.4697 36.1091 29.4221 38.0489 29.8079C39.9887 30.1938 41.9994 29.9957 43.8267 29.2389C45.6539 28.482 47.2157 27.2003 48.3145 25.5558C49.4133 23.9113 49.9998 21.9779 49.9998 20.0001C49.9998 17.3479 48.9463 14.8044 47.0709 12.929C45.1955 11.0536 42.652 10.0001 39.9998 10.0001ZM17.4998 10.0001C15.522 10.0001 13.5886 10.5866 11.9441 11.6854C10.2996 12.7842 9.0179 14.346 8.26102 16.1732C7.50415 18.0005 7.30611 20.0112 7.69197 21.951C8.07782 23.8908 9.03022 25.6726 10.4287 27.0711C11.8273 28.4697 13.6091 29.4221 15.5489 29.8079C17.4887 30.1938 19.4994 29.9957 21.3267 29.2389C23.1539 28.482 24.7157 27.2003 25.8145 25.5558C26.9133 23.9113 27.4998 21.9779 27.4998 20.0001C27.4998 17.3479 26.4463 14.8044 24.5709 12.929C22.6955 11.0536 20.152 10.0001 17.4998 10.0001ZM17.4998 47.5001C17.4961 44.8741 18.0135 42.2735 19.0219 39.8489C20.0304 37.4242 21.5099 35.2238 23.3748 33.3751C21.8487 32.7989 20.2311 32.5025 18.5998 32.5001H16.3998C12.7153 32.5067 9.18366 33.9733 6.57833 36.5786C3.97301 39.1839 2.50643 42.7156 2.49982 46.4001V47.5001C2.49982 48.1631 2.76321 48.799 3.23205 49.2678C3.70089 49.7367 4.33678 50.0001 4.99982 50.0001H17.9498C17.6588 49.1984 17.5066 48.3529 17.4998 47.5001Z" fill="white"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3  col-lg-6 col-sm-6">
        <div class="card bg-success overflow-hidden">
            <div class="card-body">
                <div class="students d-flex align-items-center justify-content-between flex-wrap">
                    <div>
                        <h4>653</h4>
                        <h5>Total Teachers</h5>
                        <span>-2% than last month</span>
                    </div>
                    <div>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                            <path d="M59.0284 17.8807L30.7862 3.81817C30.2918 3.57103 29.7082 3.57103 29.2138 3.81817L0.971632 17.8807C0.375968 18.1794 3.05176e-05 18.787 3.05176e-05 19.4531C3.05176e-05 20.1192 0.375968 20.7268 0.971632 21.0255L29.2138 35.088C29.461 35.2116 29.7305 35.2734 30 35.2734C30.2696 35.2734 30.5391 35.2116 30.7862 35.088L59.0284 21.0255C59.6241 20.7268 60 20.1192 60 19.4531C60 18.787 59.6241 18.1794 59.0284 17.8807Z" fill="white"></path>
                            <path d="M56.4844 46.1441V26.2285L52.9688 27.9863V46.1441C50.9271 46.8722 49.4532 48.805 49.4532 51.0937V54.6093C49.4532 55.5809 50.2394 56.3671 51.211 56.3671H58.2422C59.2138 56.3671 60 55.5809 60 54.6093V51.0937C60 48.805 58.526 46.8722 56.4844 46.1441Z" fill="white"></path>
                            <path d="M32.3587 38.2329C31.6308 38.5967 30.8154 38.789 30 38.789C29.1846 38.789 28.3692 38.5967 27.6414 38.2329L10.5469 29.7441V33.5156C10.5469 40.4147 19.1578 45.8203 30 45.8203C40.8422 45.8203 49.4532 40.4147 49.4532 33.5156V29.7441L32.3587 38.2329Z" fill="white"></path>
                            </g>
                            <defs>
                            <clipPath>
                            <rect width="60" height="60" fill="white"></rect>
                            </clipPath>
                            </defs>
                        </svg>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3  col-lg-6 col-sm-6">
        <div class="card">
            <div class="card-body">
                <div class="students1 d-flex align-items-center justify-content-between flex-wrap">
                    <div>
                        <h4>653</h4>
                        <h5>Events</h5>
                    </div>
                    <div>
                        <div class="d-inline-block position-relative donut-chart-sale mb-3">
                            <span class="donut1" data-peity="{ &quot;fill&quot;: [&quot;rgb(59, 215, 225)&quot;, &quot;rgba(245, 245, 245, 1&quot;],   &quot;innerRadius&quot;: 33, &quot;radius&quot;: 10}" style="display: none;">5/7</span><svg class="peity" height="100" width="100"><path d="M 50 0 A 50 50 0 1 1 1.2536043909088193 61.126046697815724 L 17.82737889799982 57.34319082055838 A 33 33 0 1 0 50 17" data-value="5" fill="rgb(59, 215, 225)"></path><path d="M 1.2536043909088193 61.126046697815724 A 50 50 0 0 1 49.99999999999999 0 L 49.99999999999999 17 A 33 33 0 0 0 17.82737889799982 57.34319082055838" data-value="2" fill="rgba(245, 245, 245, 1"></path></svg>
                            <small>62%</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3  col-lg-6 col-sm-6">
        <div class="card">
            <div class="card-body">
                <div class="students1 d-flex align-items-center justify-content-between flex-wrap">
                    <div>
                        <h4>456</h4>
                        <h5>Foods</h5>
                    </div>
                    <div>
                        <div class="d-inline-block position-relative donut-chart-sale mb-3">
                            <span class="donut1" data-peity="{ &quot;fill&quot;: [&quot;rgb(255, 97, 117)&quot;, &quot;rgba(245, 245, 245, 1&quot;],   &quot;innerRadius&quot;: 33, &quot;radius&quot;: 10}" style="display: none;">5/8</span><svg class="peity" height="100" width="100"><path d="M 50 0 A 50 50 0 1 1 14.64466094067263 85.35533905932738 L 26.665476220843935 73.33452377915607 A 33 33 0 1 0 50 17" data-value="5" fill="rgb(255, 97, 117)"></path><path d="M 14.64466094067263 85.35533905932738 A 50 50 0 0 1 49.99999999999999 0 L 49.99999999999999 17 A 33 33 0 0 0 26.665476220843935 73.33452377915607" data-value="3" fill="rgba(245, 245, 245, 1"></path></svg>
                            <small>38%</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-3  col-lg-6 col-sm-6">
        <div class="widget-stat card bg-primary">
            <div class="card-body  p-4">
                <div class="media">
                    <span class="me-3">
                        <i class="la la-users"></i>
                    </span>
                    <div class="media-body text-white">
                        <p class="mb-1">Total Students</p>
                        <h3 class="text-white">3280</h3>
                        <div class="progress mb-2 bg-secondary">
                            <div class="progress-bar progress-animated bg-white" style="width: 80%"></div>
                        </div>
                        <small>80% Increase in 20 Days</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3  col-lg-6 col-sm-6">
        <div class="widget-stat card bg-warning">
            <div class="card-body p-4">
                <div class="media">
                    <span class="me-3">
                        <i class="la la-user"></i>
                    </span>
                    <div class="media-body text-white">
                        <p class="mb-1">New Students</p>
                        <h3 class="text-white">245</h3>
                        <div class="progress mb-2 bg-primary">
                            <div class="progress-bar progress-animated bg-white" style="width: 50%"></div>
                        </div>
                        <small>50% Increase in 25 Days</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3  col-lg-6 col-sm-6">
        <div class="widget-stat card bg-secondary">
            <div class="card-body p-4">
                <div class="media">
                    <span class="me-3">
                        <i class="la la-graduation-cap"></i>
                    </span>
                    <div class="media-body text-white">
                        <p class="mb-1">Total Course</p>
                        <h3 class="text-white">28</h3>
                        <div class="progress mb-2 bg-primary">
                            <div class="progress-bar progress-animated bg-white" style="width: 76%"></div>
                        </div>
                        <small>76% Increase in 20 Days</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3  col-lg-6 col-sm-6">
        <div class="widget-stat card bg-danger ">
            <div class="card-body p-4">
                <div class="media">
                    <span class="me-3">
                        <i class="la la-dollar"></i>
                    </span>
                    <div class="media-body text-white">
                        <p class="mb-1">Fees Collect</p>
                        <h3 class="text-white">250$</h3>
                        <div class="progress mb-2 bg-secondary">
                            <div class="progress-bar progress-animated bg-white" style="width: 30%"></div>
                        </div>
                        <small>30% Increase in 30 Days</small>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-3  col-lg-6 col-sm-6">
        <div class="widget-stat card">
            <div class="card-body p-4">
                <h4 class="card-title">Total Students</h4>
                <h3>3280</h3>
                <div class="progress mb-2">
                    <div class="progress-bar progress-animated bg-primary" style="width: 80%"></div>
                </div>
                <small>80% Increase in 20 Days</small>
            </div>
        </div>
    </div>
    <div class="col-xl-3  col-lg-6 col-sm-6">
        <div class="widget-stat card">
            <div class="card-body p-4">
                <h4 class="card-title">New Students</h4>
                <h3>245</h3>
                <div class="progress mb-2">
                    <div class="progress-bar progress-animated bg-warning" style="width: 50%"></div>
                </div>
                <small>50% Increase in 25 Days</small>
            </div>
        </div>
    </div>
    <div class="col-xl-3  col-lg-6 col-sm-6">
        <div class="widget-stat card">
            <div class="card-body p-4">
                <h4 class="card-title">Total Course</h4>
                <h3>28</h3>
                <div class="progress mb-2">
                    <div class="progress-bar progress-animated bg-red" style="width: 76%"></div>
                </div>
                <small>76% Increase in 20 Days</small>
            </div>
        </div>
    </div>
    <div class="col-xl-3  col-lg-6 col-sm-6">
        <div class="widget-stat card">
            <div class="card-body p-4">
                <h4 class="card-title">Fees Collection</h4>
                <h3>25160$</h3>
                <div class="progress mb-2">
                    <div class="progress-bar progress-animated bg-success" style="width: 30%"></div>
                </div>
                <small>30% Increase in 30 Days</small>
            </div>
        </div>
    </div>


    <div class="col-xl-12 col-lg-12 col-sm-12">
        <div class="row">
            <div class="col-xl-3  col-lg-6 col-sm-6">
                <div class="widget-stat card bg-primary">
                    <div class="card-header border-0 pb-0">
                        <h3 class="card-title text-white">Total Students</h3>
                        <h5 class="text-white mb-0"><i class="fa fa-caret-up"></i> 422</h5>
                    </div>
                    <div class="card-body text-center">
                        <div class="ico-sparkline">
                            <div id="sparkline12"><canvas width="100" height="100" style="display: inline-block; width: 100px; height: 100px; vertical-align: top;"></canvas></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3  col-lg-6 col-sm-6">
                <div class="widget-stat card bg-warning overflow-hidden">
                    <div class="card-header border-0 ">
                        <h3 class="card-title text-white">New Students</h3>
                        <h5 class="text-white mb-0"><i class="fa fa-caret-up"></i> 357</h5>
                    </div>
                    <div class="card-body text-center p-0">
                        <div class="ico-sparkline">
                            <div id="spark-bar-2"><canvas width="290" height="140" style="display: inline-block; width: 290px; height: 140px; vertical-align: top;"></canvas></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3  col-lg-6 col-sm-6">
                <div class="widget-stat card bg-secondary">
                    <div class="card-header pb-3 border-0 pb-0">
                        <h3 class="card-title text-white">Total Course</h3>
                        <h5 class="text-white mb-0"><i class="fa fa-caret-up"></i> 547</h5>
                    </div>
                    <div class="card-body p-0">
                        <div class="px-4"><span class="bar1" data-peity="{ &quot;fill&quot;: [&quot;rgb(255, 255, 255)&quot;, &quot;rgb(255, 255, 255)&quot;]}" style="display: none;">6,2,8,4,-3,8,1,-3,6,-5,9,2,-8,1,4,8,9,8,2,1</span><svg class="peity" height="140" width="100%"><rect data-value="6" fill="#452b90" x="0.9614600000000001" y="24.705882352941188" width="7.691680000000001" height="49.41176470588235"></rect><rect data-value="2" fill="#ffaa2b" x="10.576060000000002" y="57.647058823529406" width="7.691679999999998" height="16.47058823529413"></rect><rect data-value="8" fill="#3693FF" x="20.19066" y="8.235294117647072" width="7.691679999999998" height="65.88235294117646"></rect><rect data-value="4" fill="#452b90" x="29.805259999999997" y="41.17647058823529" width="7.691680000000005" height="32.941176470588246"></rect><rect data-value="-3" fill="#ffaa2b" x="39.41985999999999" y="74.11764705882354" width="7.691680000000012" height="24.70588235294116"></rect><rect data-value="8" fill="#3693FF" x="49.034459999999996" y="8.235294117647072" width="7.691680000000012" height="65.88235294117646"></rect><rect data-value="1" fill="#452b90" x="58.64906" y="65.88235294117646" width="7.691680000000012" height="8.235294117647072"></rect><rect data-value="-3" fill="#ffaa2b" x="68.26365999999999" y="74.11764705882354" width="7.691680000000019" height="24.70588235294116"></rect><rect data-value="6" fill="#3693FF" x="77.87826" y="24.705882352941188" width="7.691680000000005" height="49.41176470588235"></rect><rect data-value="-5" fill="#452b90" x="87.49286" y="74.11764705882354" width="7.691680000000005" height="41.17647058823529"></rect><rect data-value="9" fill="#ffaa2b" x="97.10745999999999" y="0" width="7.691680000000019" height="74.11764705882354"></rect><rect data-value="2" fill="#3693FF" x="106.72205999999998" y="57.647058823529406" width="7.691680000000019" height="16.47058823529413"></rect><rect data-value="-8" fill="#452b90" x="116.33666000000001" y="74.11764705882354" width="7.691679999999991" height="65.88235294117646"></rect><rect data-value="1" fill="#ffaa2b" x="125.95126" y="65.88235294117646" width="7.691680000000005" height="8.235294117647072"></rect><rect data-value="4" fill="#3693FF" x="135.56586" y="41.17647058823529" width="7.691680000000019" height="32.941176470588246"></rect><rect data-value="8" fill="#452b90" x="145.18045999999998" y="8.235294117647072" width="7.691680000000019" height="65.88235294117646"></rect><rect data-value="9" fill="#ffaa2b" x="154.79506" y="0" width="7.691679999999991" height="74.11764705882354"></rect><rect data-value="8" fill="#3693FF" x="164.40966" y="8.235294117647072" width="7.691679999999991" height="65.88235294117646"></rect><rect data-value="2" fill="#452b90" x="174.02426" y="57.647058823529406" width="7.691679999999991" height="16.47058823529413"></rect><rect data-value="1" fill="#ffaa2b" x="183.63886000000002" y="65.88235294117646" width="7.6916799999999625" height="8.235294117647072"></rect></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3  col-lg-6 col-sm-6">
                <div class="widget-stat card bg-danger overflow-hidden">
                    <div class="card-header pb-3 border-0 pb-0">
                        <h3 class="card-title text-white">Fees Collection</h3>
                        <h5 class="text-white mb-0"><i class="fa fa-caret-up"></i> 3280$</h5>
                    </div>
                    <div class="card-body p-0">
                        <span class="peity-line-2" data-width="100%" style="display: none;">7,6,8,7,3,8,3,3,6,5,9,2,8</span><svg class="peity" height="150" width="100%"><polygon fill="#452b90" points="0 148.5 0 34.16666666666667 19.524333333333335 50.5 39.04866666666667 17.833333333333343 58.57300000000001 34.16666666666667 78.09733333333334 99.5 97.62166666666667 17.833333333333343 117.14600000000002 99.5 136.67033333333333 99.5 156.19466666666668 50.5 175.71900000000002 66.83333333333333 195.24333333333334 1.5 214.76766666666668 115.83333333333334 234.29200000000003 17.833333333333343 234.292 148.5"></polygon><polyline fill="none" points="0 34.16666666666667 19.524333333333335 50.5 39.04866666666667 17.833333333333343 58.57300000000001 34.16666666666667 78.09733333333334 99.5 97.62166666666667 17.833333333333343 117.14600000000002 99.5 136.67033333333333 99.5 156.19466666666668 50.5 175.71900000000002 66.83333333333333 195.24333333333334 1.5 214.76766666666668 115.83333333333334 234.29200000000003 17.833333333333343" stroke="#f77f8b" stroke-width="3" stroke-linecap="square"></polyline></svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-4 col-lg-12 col-sm-12">
        <div class="card">
            <div class="card-header border-0 pb-0">
                <h2 class="card-title">about me</h2>
            </div>
            <div class="card-body pb-0">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex px-0 justify-content-between">
                        <strong>Gender</strong>
                        <span class="mb-0">Male</span>
                    </li>
                    <li class="list-group-item d-flex px-0 justify-content-between">
                        <strong>Education</strong>
                        <span class="mb-0">PHD</span>
                    </li>
                    <li class="list-group-item d-flex px-0 justify-content-between">
                        <strong>Designation</strong>
                        <span class="mb-0">Se. Professor</span>
                    </li>
                    <li class="list-group-item d-flex px-0 justify-content-between">
                        <strong>Operation Done</strong>
                        <span class="mb-0">120</span>
                    </li>
                </ul>
            </div>
            <div class="card-footer pt-0 pb-0 text-center">
                <div class="row">
                    <div class="col-4 pt-3 pb-3 border-end">
                        <h3 class="mb-1 text-primary">150</h3>
                        <span>Projects</span>
                    </div>
                    <div class="col-4 pt-3 pb-3 border-end">
                        <h3 class="mb-1 text-primary">140</h3>
                        <span>Uploads</span>
                    </div>
                    <div class="col-4 pt-3 pb-3">
                        <h3 class="mb-1 text-primary">45</h3>
                        <span>Tasks</span>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="col-xl-8 col-xxl-8 col-lg-12 col-sm-12">
        <div id="user-activity" class="card">
            <div class="card-header border-0 pb-0 d-sm-flex d-block">
                <h4 class="card-title">Visitor Activity</h4>
                <div class="card-action mb-sm-0 my-2">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" role="tab" aria-selected="true">Day</a>
                      </li>
                      <li class="nav-item" role="presentation">
                        <a class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" role="tab" aria-selected="false" tabindex="-1">Month</a>
                      </li>
                      <li class="nav-item" role="presentation">
                        <a class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" role="tab" aria-selected="false" tabindex="-1"> Year</a>
                      </li>
                    </ul>
                </div>
            </div>

            <div class="card-body">
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="user" role="tabpanel"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                        <canvas id="activity" class="chartjs chartjs-render-monitor" height="354" style="display: block; height: 236px; width: 634px;" width="951"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-4 col-lg-6 col-sm-6">
        <div class="card overflow-hidden">
            <div class="card-body">
                <div class="text-center">
                    <div class="profile-photo">
                        <img src="images/profile/profile.png" width="100" class="img-fluid rounded-circle" alt="">
                    </div>
                    <h3 class="mt-4 mb-1">Deangelo Sena</h3>
                    <p class="">Senior Manager</p>
                    <a class="btn btn-outline-primary btn-rounded mt-3 px-5" href="javascript:void();">Folllow</a>
                </div>
            </div>

            <div class="card-footer pt-0 pb-0 text-center">
                <div class="row">
                    <div class="col-4 pt-3 pb-3 border-end">
                        <h3 class="mb-1">150</h3><span>Follower</span>
                    </div>
                    <div class="col-4 pt-3 pb-3 border-end">
                        <h3 class="mb-1">140</h3><span>Place Stay</span>
                    </div>
                    <div class="col-4 pt-3 pb-3">
                        <h3 class="mb-1">45</h3><span>Reviews</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-4 col-lg-6 col-sm-6">
        <div class="card active_users">
            <div class="card-header bg-primary border-0 pb-0">
                <h4 class="card-title text-white">Active Users</h4>
                <span id="counter"></span>
            </div>
            <div class="bg-primary"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <canvas id="activeUser" width="481" height="225" style="display: block; height: 150px; width: 321px;" class="chartjs-render-monitor"></canvas>
            </div>
            <div class="card-body pt-0">
                <div class="list-group-flush mt-4">
                    <div class="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 fw-semi-bold border-top-0">
                        <p class="mb-0">Top Active Pages</p>
                        <p class="mb-0">Active Users</p>
                    </div>
                    <div class="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                        <p class="mb-0">/bootstrap-themes/</p>
                        <p class="mb-0">3</p>
                    </div>
                    <div class="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                        <p class="mb-0">/tags/html5/</p>
                        <p class="mb-0">3</p>
                    </div>
                    <div class="list-group-item bg-transparent d-xxl-flex justify-content-between px-0 py-1 d-none">
                        <p class="mb-0">/</p>
                        <p class="mb-0">2</p>
                    </div>
                    <div class="list-group-item bg-transparent d-xxl-flex justify-content-between px-0 py-1 d-none">
                        <p class="mb-0">/preview/falcon/dashboard/</p>
                        <p class="mb-0">2</p>
                    </div>
                    <div class="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                        <p class="mb-0">/100-best-themes...all-time/</p>
                        <p class="mb-0">1</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-4 col-lg-12 col-sm-12">
        <div class="card overflow-hidden">
            <div class="text-center p-3 overlay-box " style="background-image: url(images/big/img1.jpg);">
                <div class="profile-photo">
                    <img src="images/profile/profile.png" width="100" class="img-fluid rounded-circle" alt="">
                </div>
                <h3 class="mt-3 mb-1 text-white">Deangelo Sena</h3>
                <p class="text-white mb-0">Senior Manager</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between"><span class="mb-0">Patient Gender</span> <strong class="">Female	</strong></li>
                <li class="list-group-item d-flex justify-content-between"><span class="mb-0">Years Old</span> 		<strong class="">Age: 24	</strong></li>
            </ul>
            <div class="card-footer border-0 mt-0">
                <button class="btn btn-primary btn-lg btn-block">
                    <i class="fa fa-bell-o"></i> Reminder Alarm
                </button>
            </div>
        </div>
    </div>
    <div class="col-xl-12 col-lg-12 col-xxl-12 col-sm-12">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Recent Payments Queue</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive recentOrderTable">
                    <table class="table verticle-middle table-responsive-md">
                        <thead>
                            <tr>
                                <th scope="col">Ward No.</th>
                                <th scope="col">Patient</th>
                                <th scope="col">Dr Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Bills</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>12</td>
                                <td>Mr. Bobby</td>
                                <td>Dr. Jackson</td>
                                <td>01 August 2020</td>
                                <td><span class="badge badge-rounded badge-primary">Checkin</span></td>
                                <td>$120</td>
                                <td class="text-end">
                                    <div class="dropdown custom-dropdown mb-0">
                                        <div class="btn sharp btn-primary tp-btn" data-bs-toggle="dropdown">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="12" cy="5" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="19" r="2"></circle></g></svg>
                                        </div>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <a class="dropdown-item" href="javascript:void();;">Details</a>
                                            <a class="dropdown-item text-danger" href="javascript:void();;">Cancel</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>10 </td>
                                <td>Mr. Dexter</td>
                                <td>Dr. Charles</td>
                                <td>31 July 2020</td>
                                <td><span class="badge badge-rounded badge-warning">Panding</span></td>
                                <td>$540</td>
                                <td class="text-end">
                                    <div class="dropdown custom-dropdown mb-0">
                                        <div class="btn sharp btn-primary tp-btn" data-bs-toggle="dropdown">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="12" cy="5" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="19" r="2"></circle></g></svg>
                                        </div>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <a class="dropdown-item" href="javascript:void();;">Details</a>
                                            <a class="dropdown-item text-danger" href="javascript:void();;">Cancel</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>03 </td>
                                <td>Mr. Nathan</td>
                                <td>Dr. Frederick</td>
                                <td>30 July 2020</td>
                                <td><span class="badge badge-rounded badge-danger">Canceled</span></td>
                                <td>$301</td>
                                <td class="text-end">
                                    <div class="dropdown custom-dropdown mb-0">
                                        <div class="btn sharp btn-primary tp-btn" data-bs-toggle="dropdown">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="12" cy="5" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="19" r="2"></circle></g></svg>
                                        </div>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <a class="dropdown-item" href="javascript:void();;">Details</a>
                                            <a class="dropdown-item text-danger" href="javascript:void();;">Cancel</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>05</td>
                                <td>Mr. Aurora</td>
                                <td>Dr. Roman</td>
                                <td>29 July 2020</td>
                                <td><span class="badge badge-rounded badge-success">Checkin</span></td>
                                <td>$099</td>
                                <td class="text-end">
                                    <div class="dropdown custom-dropdown mb-0">
                                        <div class="btn sharp btn-primary tp-btn" data-bs-toggle="dropdown">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="12" cy="5" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="19" r="2"></circle></g></svg>
                                        </div>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <a class="dropdown-item" href="javascript:void();;">Details</a>
                                            <a class="dropdown-item text-danger" href="javascript:void();;">Cancel</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>06</td>
                                <td>Mr. Matthew</td>
                                <td>Dr. Samantha</td>
                                <td>28 July 2020</td>
                                <td><span class="badge badge-rounded badge-success">Checkin</span></td>
                                <td>$520</td>
                                <td class="text-end">
                                    <div class="dropdown custom-dropdown mb-0">
                                        <div class="btn sharp btn-primary tp-btn" data-bs-toggle="dropdown">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="12" cy="5" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="19" r="2"></circle></g></svg>
                                        </div>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <a class="dropdown-item" href="javascript:void();;">Details</a>
                                            <a class="dropdown-item text-danger" href="javascript:void();;">Cancel</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-4 col-lg-6 col-xxl-4 col-sm-6">
        <div class="card text-white bg-primary">
            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between"><span class="mb-0">Blood type :</span><strong>O+</strong></li>
                <li class="list-group-item d-flex justify-content-between"><span class="mb-0">Allergies :</span><strong>Penicilin, peanuts </strong></li>
                <li class="list-group-item d-flex justify-content-between"><span class="mb-0">Pressure :</span><strong>120/100 mmHG</strong></li>
                <li class="list-group-item d-flex justify-content-between"><span class="mb-0">Diseases :</span><strong>Diabetes</strong></li>
                <li class="list-group-item d-flex justify-content-between"><span class="mb-0">Temperture :</span><strong>34 Degree</strong></li>
            </ul>
        </div>
    </div>
    <div class="col-xl-4 col-lg-6 col-xxl-4 col-sm-6">
        <div class="card text-white bg-warning">
            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between"><span class="mb-0">Regular Checkups</span></li>
                <li class="list-group-item d-flex justify-content-between"><span class="mb-0">Dr Theodore Handle :</span><strong>Dentist</strong></li>
                <li class="list-group-item d-flex justify-content-between"><span class="mb-0">Dr Valentino Morose :</span><strong>Surgeon</strong></li>
                <li class="list-group-item d-flex justify-content-between"><span class="mb-0">Dr Fleece Marigold :</span><strong>Clinical</strong></li>
                <li class="list-group-item d-flex justify-content-between"><span class="mb-0">Dr Eric Widget :</span><strong>Cardiology</strong></li>
            </ul>
        </div>
    </div>

    <div class="col-xl-4 col-lg-12 col-xxl-4 col-sm-12">
        <div class="card">
            <div class="card-body text-center ai-icon  text-primary">
                <svg id="rocket-icon" class="my-2" viewBox="0 0 24 24" width="80" height="80" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <h4 class="my-2">You don’t have badges yet</h4>
                <a href="javascript:void();;" class="btn my-2 btn-primary btn-lg px-4"><i class="fa fa-usd"></i> Earn Budges</a>
            </div>
        </div>
    </div>
    <div class="col-xl-8 col-lg-12 col-xxl-8 col-sm-12">
        <div class="row">
            <div class="col-xl-6 col-lg-6  col-md-6">
                <div class="card">
                    <div class="card-header border-0 pb-0">
                        <div class="clearfix">
                            <h3 class="card-title">Blood pressure</h3>
                            <span>In the normal</span>
                        </div>
                        <div class="clearfix text-center">
                            <h3 class="text-primary mb-0">120/89</h3>
                            <span>mmHG</span>
                        </div>
                    </div>
                    <div class="card-body text-center">
                        <div class="ico-sparkline">
                            <div id="spark-bar"><canvas width="188" height="200" style="display: inline-block; width: 188px; height: 200px; vertical-align: top;"></canvas></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-6  col-md-6">
                <div class="card">
                    <div class="card-header border-0 pb-0">
                        <div class="clearfix">
                            <h3 class="card-title">Heart Rate</h3>
                            <span class="text-danger">Above the normal</span>
                        </div>
                        <div class="clearfix text-center">
                            <h3 class="text-danger mb-0">107</h3>
                            <span>Per Min</span>
                        </div>
                    </div>
                    <div class="card-body text-center">
                        <div class="ico-sparkline">
                            <div id="composite-bar"><canvas width="208" height="200" style="display: inline-block; width: 208px; height: 200px; vertical-align: top;"></canvas></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-6  col-md-6">
                <div class="card">
                    <div class="card-header border-0 pb-0">
                        <div class="clearfix">
                            <h3 class="card-title">Glucose Rate</h3>
                            <span>In the normal</span>
                        </div>
                        <div class="clearfix text-center">
                            <h3 class="text-success mb-0">97</h3>
                            <span>mg/dl</span>
                        </div>
                    </div>
                    <div class="card-body text-center">
                        <div class="ico-sparkline">
                            <div id="sparkline8"><canvas width="286" height="50" style="display: inline-block; width: 286.167px; height: 50px; vertical-align: top;"></canvas></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-6  col-md-6">
                <div class="card">
                    <div class="card-header border-0 pb-0">
                        <div class="clearfix">
                            <h3 class="card-title">Clolesterol</h3>
                            <span>In the normal</span>
                        </div>
                        <div class="clearfix text-center">
                            <h3 class="text-info mb-0">124</h3>
                            <span>mg/dl</span>
                        </div>
                    </div>
                    <div class="card-body text-center">
                        <div class="ico-sparkline">
                            <div id="sparkline9" class="height80;"><canvas width="286" height="50" style="display: inline-block; width: 286.167px; height: 50px; vertical-align: top;"></canvas></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-4 col-lg-12 col-sm-12">
        <div class="card overflow-hidden">
            <div class="text-center p-5 overlay-box" style="background-image: url(images/big/img5.jpg);">
                <img src="images/profile/profile.png" width="100" class="img-fluid rounded-circle" alt="">
                <h3 class="mt-3 mb-0 text-white">Deangelo Sena</h3>
            </div>
            <div class="card-body">
                <div class="row text-center">
                    <div class="col-6">
                        <div class="bgl-primary rounded p-3">
                            <h4 class="mb-0">Female</h4>
                            <small>Patient Gender</small>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="bgl-primary rounded p-3">
                            <h4 class="mb-0">Age: 24</h4>
                            <small>Years Old</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer mt-0">
                <button class="btn btn-primary btn-lg btn-block">View Profile</button>
            </div>
        </div>
    </div>
    <div class="col-xl-6 col-lg-6  col-sm-6">
        <div class="card bg-primary">
            <div class="card-body pb-0">
                <div class="row">
                    <div class="col">
                        <h5 class="text-white">Power</h5>
                        <span class="text-white">2017.1.20</span>
                    </div>
                    <div class="col text-end">
                        <h5 class="text-white"><i class="fa fa-caret-up"></i> 260</h5>
                        <span class="text-white">+12.5(2.8%)</span>
                    </div>
                </div>
            </div>
            <div class="chart-wrapper"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <canvas id="chart_widget_1" width="742" height="195" style="display: block; height: 130px; width: 495px;" class="chartjs-render-monitor"></canvas>
            </div>
        </div>
    </div>
    <div class="col-xl-6 col-lg-6  col-sm-6">
        <div class="card bg-success overflow-hidden">
            <div class="card-body pb-0">
                <div class="row">
                    <div class="col">
                        <h5 class="text-white">Power</h5>
                        <span class="text-white">2017.1.20</span>
                    </div>
                    <div class="col text-end">
                        <h5 class="text-white"><i class="fa fa-caret-up"></i> 260</h5>
                        <span class="text-white">+12.5(2.8%)</span>
                    </div>
                </div>
            </div>
            <div class="chart-wrapper">
                <div id="chart_widget_5"><svg xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="100%" height="100%" class="ct-chart-line" style="width: 100%; height: 100%;"><g class="ct-grids"></g><g><g class="ct-series ct-series-a"><path d="M0,150L0,66.571L70.702,45.714L141.405,118.714L212.107,24.857L282.81,4L353.512,35.286L424.214,29.029L494.917,54.057L494.917,150Z" class="ct-area"></path><path d="M0,66.571L70.702,45.714L141.405,118.714L212.107,24.857L282.81,4L353.512,35.286L424.214,29.029L494.917,54.057" class="ct-line"></path><line x1="0" y1="66.57142857142857" x2="0.01" y2="66.57142857142857" class="ct-point" ct:value="4"></line><line x1="70.70238385881696" y1="45.71428571428571" x2="70.71238385881696" y2="45.71428571428571" class="ct-point" ct:value="5"></line><line x1="141.40476771763392" y1="118.71428571428572" x2="141.4147677176339" y2="118.71428571428572" class="ct-point" ct:value="1.5"></line><line x1="212.10715157645086" y1="24.85714285714286" x2="212.11715157645085" y2="24.85714285714286" class="ct-point" ct:value="6"></line><line x1="282.80953543526783" y1="4" x2="282.8195354352678" y2="4" class="ct-point" ct:value="7"></line><line x1="353.5119192940848" y1="35.28571428571429" x2="353.5219192940848" y2="35.28571428571429" class="ct-point" ct:value="5.5"></line><line x1="424.2143031529017" y1="29.02857142857144" x2="424.2243031529017" y2="29.02857142857144" class="ct-point" ct:value="5.8"></line><line x1="494.9166870117187" y1="54.057142857142864" x2="494.9266870117187" y2="54.057142857142864" class="ct-point" ct:value="4.6"></line></g></g><g class="ct-labels"></g></svg></div>
            </div>
        </div>
    </div>
    <div class="col-xl-6 col-lg-6  col-sm-6">
        <div class="card">
            <div class="card-body pb-0">
                <div class="row">
                    <div class="col">
                        <h5>3650</h5>
                        <span>VIEWS OF YOUR PROJECT</span>
                    </div>
                </div>
            </div>
            <div class="chart-wrapper"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <canvas id="chart_widget_2" width="742" height="225" style="display: block; height: 150px; width: 495px;" class="chartjs-render-monitor"></canvas>
            </div>
        </div>
    </div>
    <div class="col-xl-6 col-lg-6  col-sm-6">
        <div class="card">
            <div class="card-body">
                <div class="row justify-content-between align-items-center">
                    <div class="col-auto">
                        <h4 class="text-uppercase">74,206 K</h4>
                        <span>Lifetime earnings</span>
                    </div>
                    <div class="col-auto">
                        <div class="chart-wrapper height100"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                            <canvas id="chart_widget_7" style="display: block; height: 88px; width: 300px;" width="450" height="132" class="chartjs-render-monitor"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-12 col-xxl-12">
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body pb-0">
                        <div class="row justify-content-between">
                            <div class="col-auto">
                                <h5>Lorem Ipsum</h5>
                            </div>
                            <div class="col-auto">
                                <h5>
                                    <span><i class="fa fa-caret-up"></i></span>
                                    <span>2,250</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div class="chart-wrapper">
                        <div id="chart_widget_6"><svg xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="100%" height="100%" class="ct-chart-line" style="width: 100%; height: 100%;"><g class="ct-grids"></g><g><g class="ct-series ct-series-a"><path d="M0,150L0,52.667L70.702,28.333L141.405,64.833L212.107,28.333L282.81,52.667L353.512,16.167L424.214,57.533L494.917,38.067L494.917,150Z" class="ct-area"></path><path d="M0,52.667L70.702,28.333L141.405,64.833L212.107,28.333L282.81,52.667L353.512,16.167L424.214,57.533L494.917,38.067" class="ct-line"></path><line x1="0" y1="52.66666666666667" x2="0.01" y2="52.66666666666667" class="ct-point" ct:value="4"></line><line x1="70.70238385881696" y1="28.33333333333333" x2="70.71238385881696" y2="28.33333333333333" class="ct-point" ct:value="5"></line><line x1="141.40476771763392" y1="64.83333333333333" x2="141.4147677176339" y2="64.83333333333333" class="ct-point" ct:value="3.5"></line><line x1="212.10715157645086" y1="28.33333333333333" x2="212.11715157645085" y2="28.33333333333333" class="ct-point" ct:value="5"></line><line x1="282.80953543526783" y1="52.66666666666667" x2="282.8195354352678" y2="52.66666666666667" class="ct-point" ct:value="4"></line><line x1="353.5119192940848" y1="16.166666666666657" x2="353.5219192940848" y2="16.166666666666657" class="ct-point" ct:value="5.5"></line><line x1="424.2143031529017" y1="57.533333333333346" x2="424.2243031529017" y2="57.533333333333346" class="ct-point" ct:value="3.8"></line><line x1="494.9166870117187" y1="38.06666666666668" x2="494.9266870117187" y2="38.06666666666668" class="ct-point" ct:value="4.6"></line></g></g><g class="ct-labels"></g></svg></div>
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col text-center">
                                <h5 class="fw-normal">1230</h5>
                                <span>Type A</span>
                            </div>
                            <div class="col text-center">
                                <h5 class="fw-normal">1230</h5>
                                <span>Type A</span>
                            </div>
                            <div class="col text-center">
                                <h5 class="fw-normal">1230</h5>
                                <span>Type A</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body pb-0">
                        <div class="row justify-content-between">
                            <div class="col-auto">
                                <h5>Lorem Ipsum</h5>
                            </div>
                            <div class="col-auto">
                                <h5>
                                    <span><i class="fa fa-caret-up"></i></span>
                                    <span>2,250</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div class="chart-wrapper"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                        <canvas id="chart_widget_3" width="742" height="225" style="display: block; height: 150px; width: 495px;" class="chartjs-render-monitor"></canvas>
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col text-center">
                                <h5 class="fw-normal">1230</h5>
                                <span>Type A</span>
                            </div>
                            <div class="col text-center">
                                <h5 class="fw-normal">1230</h5>
                                <span>Type A</span>
                            </div>
                            <div class="col text-center">
                                <h5 class="fw-normal">1230</h5>
                                <span>Type A</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-6 col-lg-6">
        <div class="card overflow-hidden">
            <div class="card-body pb-0">
                <h4 class="card-title text-uppercase fw-normal">Market Now</h4>
                <h2 class="fw-normal text-danger">
                    <span><i class="fa fa-caret-up"></i></span>
                    <span>3454664</span>
                </h2>
                <div class="row mt-5">
                    <div class="col text-center">
                        <h5 class="fw-normal">APPL</h5>
                        <span class="text-success">+ 82.24 %</span>
                    </div>
                    <div class="col text-center">
                        <h5 class="fw-normal">FB</h5>
                        <span class="text-danger">- 12.24 %</span>
                    </div>
                    <div class="col text-center">
                        <h5 class="fw-normal">GOOG</h5>
                        <span class="text-success">+ 42.24 %</span>
                    </div>
                </div>
            </div>
            <div class="chart-wrapper"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <canvas id="chart_widget_4" width="742" height="334" style="display: block; height: 223px; width: 495px;" class="chartjs-render-monitor"></canvas>
            </div>
        </div>
    </div>
    <div class="col-xl-6 col-lg-6">
        <div class="card">
            <div class="card-body pb-0">
                <h4 class="card-title text-uppercase fw-normal">Sales Analysis</h4>
                <h2 class="fw-normal text-danger">
                    <span><i class="fa fa-caret-up"></i></span>
                    <span>3454664</span>
                </h2>
                <div class="row mt-5">
                    <div class="col text-center">
                        <h5 class="fw-normal">Today</h5>
                        <span class="text-success">+ 8224</span>
                    </div>
                    <div class="col text-center">
                        <h5 class="fw-normal">Today</h5>
                        <span class="text-danger">- 1224</span>
                    </div>
                    <div class="col text-center">
                        <h5 class="fw-normal">Week</h5>
                        <span class="text-success">+ 4224</span>
                    </div>
                </div>
            </div>
            <div class="chart-wrapper">
                <div id="chart_widget_8"><svg xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="100%" height="100%" class="ct-chart-line" style="width: 100%; height: 100%;"><g class="ct-grids"></g><g><g class="ct-series ct-series-a"><path d="M0,97.911L70.702,66.607L141.405,176.17L212.107,35.304L282.81,4L353.512,50.955L424.214,41.564L494.917,79.129" class="ct-line"></path><line x1="0" y1="97.91071428571429" x2="0.01" y2="97.91071428571429" class="ct-point" ct:value="4"></line><line x1="70.70238385881696" y1="66.60714285714286" x2="70.71238385881696" y2="66.60714285714286" class="ct-point" ct:value="5"></line><line x1="141.40476771763392" y1="176.16964285714286" x2="141.4147677176339" y2="176.16964285714286" class="ct-point" ct:value="1.5"></line><line x1="212.10715157645086" y1="35.303571428571416" x2="212.11715157645085" y2="35.303571428571416" class="ct-point" ct:value="6"></line><line x1="282.80953543526783" y1="4" x2="282.8195354352678" y2="4" class="ct-point" ct:value="7"></line><line x1="353.5119192940848" y1="50.95535714285714" x2="353.5219192940848" y2="50.95535714285714" class="ct-point" ct:value="5.5"></line><line x1="424.2143031529017" y1="41.56428571428572" x2="424.2243031529017" y2="41.56428571428572" class="ct-point" ct:value="5.8"></line><line x1="494.9166870117187" y1="79.12857142857143" x2="494.9266870117187" y2="79.12857142857143" class="ct-point" ct:value="4.6"></line></g></g><g class="ct-labels"></g></svg></div>
            </div>
        </div>
    </div>
    <div class="col-xl-6 col-lg-12">
        <div class="card overflow-hidden">
            <div class="card-header border-0 pb-0">
                <h4 class="card-title">Top Products</h4>
            </div>
            <div class="card-body pb-0">
                <div class="widget-media">
                    <ul class="timeline">
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2">
                                    <img alt="image" width="50" src="images/avatar/1.jpg">
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Dr sultads Send you Photo</h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-primary light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2 media-info">
                                    KG
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Resport created successfully</h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-info light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2 media-success">
                                    <i class="fa fa-home"></i>
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Reminder : Treatment Time!</h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="chart-wrapper"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <canvas id="chart_widget_9" width="742" height="328" style="display: block; height: 219px; width: 495px;" class="chartjs-render-monitor"></canvas>
            </div>
        </div>
    </div>
    <div class="col-xl-6 col-lg-12">
        <div class="card overflow-hidden">
            <div class="card-header border-0 pb-0">
                <h4 class="card-title">Top Products</h4>
            </div>
            <div class="card-body pb-0">
                <div class="widget-media">
                    <ul class="timeline">
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2">
                                    <img alt="image" width="50" src="images/avatar/4.jpg">
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Dr sultads Send you Photo</h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-primary light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2 media-info">
                                    <img alt="image" width="50" src="images/avatar/2.jpg">
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Resport created successfully</h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-info light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-panel">
                                <div class="media me-2 media-success">
                                    <img alt="image" width="50" src="images/avatar/3.jpg">
                                </div>
                                <div class="media-body">
                                    <h5 class="mb-1">Reminder : Treatment Time!</h5>
                                    <small class="d-block">29 July 2020 - 02:26 PM</small>
                                </div>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a class="dropdown-item" href="#">Edit</a>
                                        <a class="dropdown-item" href="#">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="chart-wrapper"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <canvas id="chart_widget_10" width="742" height="328" style="display: block; height: 219px; width: 495px;" class="chartjs-render-monitor"></canvas>
            </div>
        </div>
    </div>
    <div class="col-xl-6 col-xxl-8 col-lg-12">
        <div class="row">
            <div class="col-sm-12">
                <div class="card overflow-hidden">
                    <div class="row no-gutters">
                        <div class="col-5 p-0">
                            <div class="card-body">
                                <h6 class="fw-normal text-uppercase">Weekly sales</h6>
                                <h4>$ 14000</h4>
                                <div>
                                    <span class="badge badge-light">60%</span>
                                    <span>Higher</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-7 p-0">
                            <div class="chart-wrapper"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="chart_widget_11" width="607" height="354" style="display: block; height: 236px; width: 405px;" class="chartjs-render-monitor"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h5>570</h5>
                        <p>All Sales</p>
                    </div>
                    <div class="chart-wrapper"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                        <canvas id="chart_widget_14" height="300" style="display: block; height: 200px; width: 321px;" width="481" class="chartjs-render-monitor"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h5>570</h5>
                        <p>All Sales</p>
                    </div>
                    <div class="chart-wrapper"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                        <canvas id="chart_widget_15" height="300" style="display: block; height: 200px; width: 321px;" width="481" class="chartjs-render-monitor"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-6 col-xxl-4 col-lg-12">
        <div class="card">
            <div class="chart-wrapper"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <canvas id="chart_widget_16" height="517" style="display: block; height: 345px; width: 321px;" width="481" class="chartjs-render-monitor"></canvas>
            </div>
            <div class="card-body">
                <h4 class="card-title">Sales Status</h4>
                <div class="row">
                    <div class="col-12">
                        <div class="d-flex justify-content-between">
                            <h6>67%</h6>
                            <span>Grow</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar bg-primary" style="width: 80%"></div>
                        </div>
                    </div>
                    <div class="col-12 mt-4">
                        <div class="d-flex justify-content-between">
                            <h6>67%</h6>
                            <span>Grow</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar bg-success" style="width: 70%"></div>
                        </div>
                    </div>
                    <div class="col-12 mt-4">
                        <div class="d-flex justify-content-between">
                            <h6>67%</h6>
                            <span>Grow</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar bg-info" style="width: 40%"></div>
                        </div>
                    </div>
                    <div class="col-12 mt-4">
                        <div class="d-flex justify-content-between">
                            <h6>67%</h6>
                            <span>Grow</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar bg-warning" style="width: 80%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3  col-sm-6">
        <div class="card overflow-hidden">
            <div class="social-graph-wrapper widget-facebook">
                <span class="s-icon"><i class="fab fa-facebook-f"></i></span>
            </div>
            <div class="row">
                <div class="col-6 border-end">
                    <div class="pt-3 pb-3 ps-0 pe-0 text-center">
                        <h4 class="m-1"><span class="counter">89</span> k</h4>
                        <p class="m-0">Friends</p>
                    </div>
                </div>
                <div class="col-6">
                    <div class="pt-3 pb-3 ps-0 pe-0 text-center">
                        <h4 class="m-1"><span class="counter">119</span> k</h4>
                        <p class="m-0">Followers</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3  col-sm-6">
        <div class="card overflow-hidden">
            <div class="social-graph-wrapper widget-linkedin">
                <span class="s-icon"><i class="fab fa-linkedin-in"></i></span>
            </div>
            <div class="row">
                <div class="col-6 border-end">
                    <div class="pt-3 pb-3 ps-0 pe-0 text-center">
                        <h4 class="m-1"><span class="counter">89</span> k</h4>
                        <p class="m-0">Friends</p>
                    </div>
                </div>
                <div class="col-6">
                    <div class="pt-3 pb-3 ps-0 pe-0 text-center">
                        <h4 class="m-1"><span class="counter">119</span> k</h4>
                        <p class="m-0">Followers</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3  col-sm-6">
        <div class="card overflow-hidden">
            <div class="social-graph-wrapper widget-googleplus">
                <span class="s-icon"><i class="fab fa-google-plus-g"></i></span>
            </div>
            <div class="row">
                <div class="col-6 border-end">
                    <div class="pt-3 pb-3 ps-0 pe-0 text-center">
                        <h4 class="m-1"><span class="counter">89</span> k</h4>
                        <p class="m-0">Friends</p>
                    </div>
                </div>
                <div class="col-6">
                    <div class="pt-3 pb-3 ps-0 pe-0 text-center">
                        <h4 class="m-1"><span class="counter">119</span> k</h4>
                        <p class="m-0">Followers</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3  col-sm-6">
        <div class="card overflow-hidden">
            <div class="social-graph-wrapper widget-twitter">
                <span class="s-icon"><i class="fab fa-twitter"></i></span>
            </div>
            <div class="row">
                <div class="col-6 border-end">
                    <div class="pt-3 pb-3 ps-0 pe-0 text-center">
                        <h4 class="m-1"><span class="counter">89</span> k</h4>
                        <p class="m-0">Friends</p>
                    </div>
                </div>
                <div class="col-6">
                    <div class="pt-3 pb-3 ps-0 pe-0 text-center">
                        <h4 class="m-1"><span class="counter">119</span> k</h4>
                        <p class="m-0">Followers</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
