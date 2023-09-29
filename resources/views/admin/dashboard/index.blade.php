@extends('layouts.admin.app')

@section('title', 'Dashboard')

@section('content')
    <div class="row">
        <div class="col-xl-3  col-lg-6 col-sm-6">
            <div class="widget-stat card bg-primary">
                <div class="card-body  p-4">
                    <div class="media">
                        <span class="me-3">
                            <i class="la la-users"></i>
                        </span>
                        <div class="media-body text-white">
                            @if (auth()->user()->hasRole('super_admin'))
                                <p class="mb-1">Users</p>
                            @else
                                <p class="mb-1">Followers</p>
                            @endif
                            <h3 class="text-white">{{ number_format($followerscount) }}</h3>
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
                            <svg width="46" height="46" viewBox="0 0 46 46" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M32.8961 26.5849C34.1612 26.5849 35.223 27.629 35.0296 28.8783C33.8947 36.2283 27.6026 41.6855 20.0138 41.6855C11.6178 41.6855 4.8125 34.8803 4.8125 26.4862C4.8125 19.5704 10.0664 13.1283 15.9816 11.6717C17.2526 11.3579 18.5553 12.252 18.5553 13.5605C18.5553 22.4263 18.8533 24.7197 20.5368 25.9671C22.2204 27.2145 24.2 26.5849 32.8961 26.5849Z"
                                    stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M41.1733 19.2019C41.2739 13.5059 34.2772 4.32428 25.7509 4.48217C25.0877 4.49402 24.5568 5.04665 24.5272 5.70783C24.3121 10.3914 24.6022 16.4605 24.764 19.2118C24.8134 20.0684 25.4864 20.7414 26.341 20.7907C29.1693 20.9526 35.4594 21.1736 40.0759 20.4749C40.7035 20.3802 41.1634 19.8355 41.1733 19.2019Z"
                                    stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                            </svg>
                        </span>
                        <div class="media-body text-white">
                            <p class="mb-1">Signals</p>
                            <h3 class="text-white">{{ number_format($signalscount) }}</h3>
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
                            <p class="mb-1">Schedules</p>
                            <h3 class="text-white">0</h3>
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
                            <i class="la la-video"></i>
                        </span>
                        <div class="media-body text-white">
                            <p class="mb-1">Videos</p>
                            <h3 class="text-white">0</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-6 col-xxl-8 col-lg-7">
            <div class="card h-auto">
                <div class="card-header border-0 pb-3">
                    <h4 class="heading mb-0">Signals</h4>
                    <a href="{{ route('admin.signals.index') }}" class="btn btn-sm btn-primary">View All</a>
                </div>
                <div class="card-body pt-0">
                    @if (count($signals) > 0)
                        <div class="swiper mySwiper">
                            <div class="swiper-wrapper">
                                @foreach ($signals as $item)
                                    <div class="swiper-slide">
                                        <div class="card">
                                            @if ($item->category->type === 'trade')
                                                <div class="card-body">
                                                    <div class="card-media d-flex justify-content-center">
                                                        <img src="{{ $item->asset->image }}" alt=""
                                                            style="width: 70% !important">
                                                    </div>
                                                    <div class="media-data">
                                                        <h4>{{ $item->asset->name }}</h4>
                                                        <div
                                                            class="dateformat d-flex justify-content-between align-items-end">
                                                            <div>
                                                                <p class="text-uppercase">{{ $item->asset->symbol }}</p>
                                                                <span
                                                                    class="text-capitalize">{{ $item->category->name }}</span>
                                                            </div>
                                                            <span
                                                                class="badge badge-primary light border-0 text-uppercase">{{ $item->market_status }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            @else
                                                <div class="card-body">
                                                    <div class="card-media d-flex justify-content-center">
                                                        <img src="{{ $item->chart_photo }}" alt=""
                                                            style="width: 70% !important">
                                                    </div>
                                                    <div class="media-data">
                                                        @php
                                                            $caption = Str::limit(strip_tags($item->comment), 100, '...');
                                                        @endphp
                                                        <h4> {{ $caption }}</h4>
                                                        <div
                                                            class="dateformat d-flex justify-content-between align-items-end">
                                                            <div>
                                                                <span
                                                                    class="text-capitalize">{{ $item->category->name }}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            @endif
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    @else
                        <div class="d-flex flex-column justify-content-center align-items-center h-50">
                            <h5 class="text-warning">
                                No Signals Available
                            </h5>
                        </div>
                    @endif

                </div>
            </div>

        </div>
        <div class="col-xl-3 respo col-xxl-4 col-lg-5">
            <div class="row">
                <div class="col-xl-12">
                    <div class="card my-calendar">
                        <div class="card-body schedules-cal p-2">
                            <input type="text" class="form-control d-none" id="datetimepicker1" style="">
                            <div class="bootstrap-datetimepicker-widget bottom" style="inset: 39.382px auto auto 0px;">
                                <ul class="list-unstyled">
                                    <li class="collapse show">
                                        <div class="datepicker">
                                            <div class="datepicker-days" style="">
                                                <table class="table-condensed">
                                                    <thead>
                                                        <tr>
                                                            <th class="prev" data-action="previous"><i
                                                                    class="fa fa-chevron-left"></i></th>
                                                            <th class="picker-switch" data-action="pickerSwitch"
                                                                colspan="5" title="Select Month">September 2023</th>
                                                            <th class="next" data-action="next"><i
                                                                    class="fa fa-chevron-right"></i></th>
                                                        </tr>
                                                        <tr>
                                                            <th class="dow">Su</th>
                                                            <th class="dow">Mo</th>
                                                            <th class="dow">Tu</th>
                                                            <th class="dow">We</th>
                                                            <th class="dow">Th</th>
                                                            <th class="dow">Fr</th>
                                                            <th class="dow">Sa</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td data-action="selectDay" data-day="08/27/2023"
                                                                class="day old weekend">27</td>
                                                            <td data-action="selectDay" data-day="08/28/2023"
                                                                class="day old">28</td>
                                                            <td data-action="selectDay" data-day="08/29/2023"
                                                                class="day old">29</td>
                                                            <td data-action="selectDay" data-day="08/30/2023"
                                                                class="day old">30</td>
                                                            <td data-action="selectDay" data-day="08/31/2023"
                                                                class="day old">31</td>
                                                            <td data-action="selectDay" data-day="09/01/2023"
                                                                class="day">1</td>
                                                            <td data-action="selectDay" data-day="09/02/2023"
                                                                class="day weekend">2</td>
                                                        </tr>
                                                        <tr>
                                                            <td data-action="selectDay" data-day="09/03/2023"
                                                                class="day weekend">3</td>
                                                            <td data-action="selectDay" data-day="09/04/2023"
                                                                class="day">4</td>
                                                            <td data-action="selectDay" data-day="09/05/2023"
                                                                class="day">5</td>
                                                            <td data-action="selectDay" data-day="09/06/2023"
                                                                class="day">6</td>
                                                            <td data-action="selectDay" data-day="09/07/2023"
                                                                class="day">7</td>
                                                            <td data-action="selectDay" data-day="09/08/2023"
                                                                class="day">8</td>
                                                            <td data-action="selectDay" data-day="09/09/2023"
                                                                class="day weekend">9</td>
                                                        </tr>
                                                        <tr>
                                                            <td data-action="selectDay" data-day="09/10/2023"
                                                                class="day weekend">10</td>
                                                            <td data-action="selectDay" data-day="09/11/2023"
                                                                class="day">11</td>
                                                            <td data-action="selectDay" data-day="09/12/2023"
                                                                class="day">12</td>
                                                            <td data-action="selectDay" data-day="09/13/2023"
                                                                class="day">13</td>
                                                            <td data-action="selectDay" data-day="09/14/2023"
                                                                class="day">14</td>
                                                            <td data-action="selectDay" data-day="09/15/2023"
                                                                class="day">15</td>
                                                            <td data-action="selectDay" data-day="09/16/2023"
                                                                class="day weekend">16</td>
                                                        </tr>
                                                        <tr>
                                                            <td data-action="selectDay" data-day="09/17/2023"
                                                                class="day weekend">17</td>
                                                            <td data-action="selectDay" data-day="09/18/2023"
                                                                class="day">18</td>
                                                            <td data-action="selectDay" data-day="09/19/2023"
                                                                class="day">19</td>
                                                            <td data-action="selectDay" data-day="09/20/2023"
                                                                class="day">20</td>
                                                            <td data-action="selectDay" data-day="09/21/2023"
                                                                class="day">21</td>
                                                            <td data-action="selectDay" data-day="09/22/2023"
                                                                class="day">22</td>
                                                            <td data-action="selectDay" data-day="09/23/2023"
                                                                class="day weekend">23</td>
                                                        </tr>
                                                        <tr>
                                                            <td data-action="selectDay" data-day="09/24/2023"
                                                                class="day weekend">24</td>
                                                            <td data-action="selectDay" data-day="09/25/2023"
                                                                class="day active today">25</td>
                                                            <td data-action="selectDay" data-day="09/26/2023"
                                                                class="day">26</td>
                                                            <td data-action="selectDay" data-day="09/27/2023"
                                                                class="day">27</td>
                                                            <td data-action="selectDay" data-day="09/28/2023"
                                                                class="day">28</td>
                                                            <td data-action="selectDay" data-day="09/29/2023"
                                                                class="day">29</td>
                                                            <td data-action="selectDay" data-day="09/30/2023"
                                                                class="day weekend">30</td>
                                                        </tr>
                                                        <tr>
                                                            <td data-action="selectDay" data-day="10/01/2023"
                                                                class="day new weekend">1</td>
                                                            <td data-action="selectDay" data-day="10/02/2023"
                                                                class="day new">2</td>
                                                            <td data-action="selectDay" data-day="10/03/2023"
                                                                class="day new">3</td>
                                                            <td data-action="selectDay" data-day="10/04/2023"
                                                                class="day new">4</td>
                                                            <td data-action="selectDay" data-day="10/05/2023"
                                                                class="day new">5</td>
                                                            <td data-action="selectDay" data-day="10/06/2023"
                                                                class="day new">6</td>
                                                            <td data-action="selectDay" data-day="10/07/2023"
                                                                class="day new weekend">7</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="datepicker-months" style="display: none;">
                                                <table class="table-condensed">
                                                    <thead>
                                                        <tr>
                                                            <th class="prev" data-action="previous"><i
                                                                    class="fa fa-chevron-left"></i></th>
                                                            <th class="picker-switch" data-action="pickerSwitch"
                                                                colspan="5" title="Select Year">2023</th>
                                                            <th class="next" data-action="next"><i
                                                                    class="fa fa-chevron-right"></i></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td colspan="7"><span data-action="selectMonth"
                                                                    class="month">Jan</span><span
                                                                    data-action="selectMonth"
                                                                    class="month">Feb</span><span
                                                                    data-action="selectMonth"
                                                                    class="month">Mar</span><span
                                                                    data-action="selectMonth"
                                                                    class="month">Apr</span><span
                                                                    data-action="selectMonth"
                                                                    class="month">May</span><span
                                                                    data-action="selectMonth"
                                                                    class="month">Jun</span><span
                                                                    data-action="selectMonth"
                                                                    class="month">Jul</span><span
                                                                    data-action="selectMonth"
                                                                    class="month">Aug</span><span
                                                                    data-action="selectMonth"
                                                                    class="month active">Sep</span><span
                                                                    data-action="selectMonth"
                                                                    class="month">Oct</span><span
                                                                    data-action="selectMonth"
                                                                    class="month">Nov</span><span
                                                                    data-action="selectMonth" class="month">Dec</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="datepicker-years" style="display: none;">
                                                <table class="table-condensed">
                                                    <thead>
                                                        <tr>
                                                            <th class="prev" data-action="previous"><i
                                                                    class="fa fa-chevron-left"></i></th>
                                                            <th class="picker-switch" data-action="pickerSwitch"
                                                                colspan="5" title="Select Decade">2018-2029</th>
                                                            <th class="next" data-action="next"><i
                                                                    class="fa fa-chevron-right"></i></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td colspan="7"><span data-action="selectYear"
                                                                    class="year">2018</span><span
                                                                    data-action="selectYear"
                                                                    class="year">2019</span><span
                                                                    data-action="selectYear"
                                                                    class="year">2020</span><span
                                                                    data-action="selectYear"
                                                                    class="year">2021</span><span
                                                                    data-action="selectYear"
                                                                    class="year">2022</span><span
                                                                    data-action="selectYear"
                                                                    class="year active">2023</span><span
                                                                    data-action="selectYear"
                                                                    class="year">2024</span><span
                                                                    data-action="selectYear"
                                                                    class="year">2025</span><span
                                                                    data-action="selectYear"
                                                                    class="year">2026</span><span
                                                                    data-action="selectYear"
                                                                    class="year">2027</span><span
                                                                    data-action="selectYear"
                                                                    class="year">2028</span><span
                                                                    data-action="selectYear" class="year">2029</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="datepicker-decades" style="display: none;">
                                                <table class="table-condensed">
                                                    <thead>
                                                        <tr>
                                                            <th class="prev" data-action="previous"><i
                                                                    class="fa fa-chevron-left"></i></th>
                                                            <th class="picker-switch" data-action="pickerSwitch"
                                                                colspan="5">2000-2107</th>
                                                            <th class="next" data-action="next"><i
                                                                    class="fa fa-chevron-right"></i></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td colspan="7"><span data-action="selectDecade"
                                                                    class="decade" data-selection="2005">2000 -
                                                                    2011</span><span data-action="selectDecade"
                                                                    class="decade active" data-selection="2017">2012 -
                                                                    2023</span><span data-action="selectDecade"
                                                                    class="decade active" data-selection="2029">2024 -
                                                                    2035</span><span data-action="selectDecade"
                                                                    class="decade" data-selection="2041">2036 -
                                                                    2047</span><span data-action="selectDecade"
                                                                    class="decade" data-selection="2053">2048 -
                                                                    2059</span><span data-action="selectDecade"
                                                                    class="decade" data-selection="2065">2060 -
                                                                    2071</span><span data-action="selectDecade"
                                                                    class="decade" data-selection="2077">2072 -
                                                                    2083</span><span data-action="selectDecade"
                                                                    class="decade" data-selection="2089">2084 -
                                                                    2095</span><span data-action="selectDecade"
                                                                    class="decade" data-selection="2101">2096 -
                                                                    2107</span><span></span><span></span><span></span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="picker-switch accordion-toggle">
                                        <table class="table-condensed">
                                            <tbody>
                                                <tr>
                                                    <td><a data-action="togglePicker" title="Select Time"><i
                                                                class="fa fa-clock-o"></i></a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </li>
                                    <li class="collapse">
                                        <div class="timepicker">
                                            <div class="timepicker-picker">
                                                <table class="table-condensed">
                                                    <tr>
                                                        <td><a href="#" tabindex="-1" title="Increment Hour"
                                                                class="btn" data-action="incrementHours"><i
                                                                    class="fa fa-chevron-up"></i></a></td>
                                                        <td class="separator"></td>
                                                        <td><a href="#" tabindex="-1" title="Increment Minute"
                                                                class="btn" data-action="incrementMinutes"><i
                                                                    class="fa fa-chevron-up"></i></a></td>
                                                        <td class="separator"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><span class="timepicker-hour" data-time-component="hours"
                                                                title="Pick Hour" data-action="showHours">08</span></td>
                                                        <td class="separator">:</td>
                                                        <td><span class="timepicker-minute" data-time-component="minutes"
                                                                title="Pick Minute" data-action="showMinutes">42</span>
                                                        </td>
                                                        <td><button class="btn btn-primary" data-action="togglePeriod"
                                                                tabindex="-1" title="Toggle Period">PM</button></td>
                                                    </tr>
                                                    <tr>
                                                        <td><a href="#" tabindex="-1" title="Decrement Hour"
                                                                class="btn" data-action="decrementHours"><i
                                                                    class="fa fa-chevron-down"></i></a></td>
                                                        <td class="separator"></td>
                                                        <td><a href="#" tabindex="-1" title="Decrement Minute"
                                                                class="btn" data-action="decrementMinutes"><i
                                                                    class="fa fa-chevron-down"></i></a></td>
                                                        <td class="separator"></td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div class="timepicker-hours" style="display: none;">
                                                <table class="table-condensed">
                                                    <tr>
                                                        <td data-action="selectHour" class="hour">12</td>
                                                        <td data-action="selectHour" class="hour">01</td>
                                                        <td data-action="selectHour" class="hour">02</td>
                                                        <td data-action="selectHour" class="hour">03</td>
                                                    </tr>
                                                    <tr>
                                                        <td data-action="selectHour" class="hour">04</td>
                                                        <td data-action="selectHour" class="hour">05</td>
                                                        <td data-action="selectHour" class="hour">06</td>
                                                        <td data-action="selectHour" class="hour">07</td>
                                                    </tr>
                                                    <tr>
                                                        <td data-action="selectHour" class="hour">08</td>
                                                        <td data-action="selectHour" class="hour">09</td>
                                                        <td data-action="selectHour" class="hour">10</td>
                                                        <td data-action="selectHour" class="hour">11</td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div class="timepicker-minutes" style="display: none;">
                                                <table class="table-condensed">
                                                    <tr>
                                                        <td data-action="selectMinute" class="minute">00</td>
                                                        <td data-action="selectMinute" class="minute">05</td>
                                                        <td data-action="selectMinute" class="minute">10</td>
                                                        <td data-action="selectMinute" class="minute">15</td>
                                                    </tr>
                                                    <tr>
                                                        <td data-action="selectMinute" class="minute">20</td>
                                                        <td data-action="selectMinute" class="minute">25</td>
                                                        <td data-action="selectMinute" class="minute">30</td>
                                                        <td data-action="selectMinute" class="minute">35</td>
                                                    </tr>
                                                    <tr>
                                                        <td data-action="selectMinute" class="minute">40</td>
                                                        <td data-action="selectMinute" class="minute">45</td>
                                                        <td data-action="selectMinute" class="minute">50</td>
                                                        <td data-action="selectMinute" class="minute">55</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {{-- <div class="events">
                            <h6>events</h6>
                            <div class="dz-scroll event-scroll">
                                <div class="event-media">
                                    <div class="d-flex align-items-center">
                                        <div class="event-box">
                                            <h5 class="mb-0">20</h5>
                                            <span>Mon</span>
                                        </div>
                                        <div class="event-data ms-2">
                                            <h5 class="mb-0"><a href="project.html">Development planning</a></h5>
                                            <span>w3it Technologies</span>
                                        </div>
                                    </div>
                                    <span class="text-white">12:05 PM</span>
                                </div>
                            </div>
                        </div> --}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')
    <script src="{{ asset('assets/vendor/swiper/js/swiper-bundle.min.js') }}"></script>
    <script>
        var swiper = new Swiper('.mySwiper', {
            speed: 1500,
            parallax: true,
            slidesPerView: 4,
            spaceBetween: 20,
            autoplay: {
                delay: 1000,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                300: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                416: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1280: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1788: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
        });
    </script>
@endpush
