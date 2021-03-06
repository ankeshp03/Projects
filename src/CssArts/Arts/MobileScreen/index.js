import './mobileScreen-styles.css';

const code = {};

code.html = `
<div class="phone-container">
    <div class="notch-container">
        <svg id="notch" width="130" height="30">
            <path id="curve" d="
        M1,30
        C20,30 25,15 25,15
        C27.5,5 35,5 55,5
        L85,5
        C100,5 102.5,7.5 105,15
        C105,15 110,30 130,30" fill="#000000">
            </path>
        </svg>
    </div>
    <div class="screen">
        <ul class="notification-container">
            <li class="notification-left">
                <span class="time">12:00 AM</span>
            </li>
            <li class="notification-right">
                <div class="tower-1"></div>
                <div class="tower-2"></div>
                <div class="cell-charge"></div>
            </li>
        </ul>
        <div class="dateTime-container">
            <div class="time">12:00</div>
            <div class="date">WED, 1 JUL</div>
        </div>
        <ul class="homescreen-apps">
            <li class="app app-1">
                <div class="icon facebook-icon"></div>
            </li>
            <li class="app app-2">
                <div class="icon instagram-icon"></div>
            </li>
            <li class="app app-3">
                <div class="icon twitter-icon"></div>
            </li>
            <li class="app app-4">
                <div class="icon whatsapp-icon"></div>
            </li>
            <li class="app app-5">
                <div class="icon codier-icon"></div>
            </li>
        </ul>
    <div class="appTray-slider"></div>
    </div>
</div>
`.trim();

code.css = `
.phone-container {
    margin: auto;
    position: relative;
    font-family: sans-serif;
    width: calc(75.5px * 3);
    height: calc(157.9px * 3);
    transform: translateY(5%);
}
.phone-container .notch-container {
    top: 1px;
    left: 50%;
    z-index: 1;
    position: absolute;
    transform: translate(-50%) rotate(180deg);
}
.phone-container .notch-container #notch {
    transform: scale(0.8);
}
.phone-container .screen {
    position: relative;
    border-radius: 25px;
    border: 7px solid #000;
    height: calc(100% - 30px);
    border-top: 10px solid #000;
    border-bottom-left-radius: 35px;
    border-bottom-right-radius: 35px;
    border-bottom: 17.5px solid #000;
    box-shadow: 0px 0px 35px -3px rgba(0, 0, 0, 0.5);
    background: url(https://res.cloudinary.com/codier/image/upload/v1593533218/ux2us8idatwbcccy2bmx.jpg) no-repeat;
    background-size: cover;
}
.phone-container .screen ul {
    margin: 0;
    padding: 0;
    list-style: none;
}
.phone-container .screen ul li {
    float: left;
}
.phone-container .screen .notification-container {
    color: #fff;
    font-size: 10px;
    padding: 5px 7px;
    font-weight: 600;
}
.phone-container .screen .notification-container .notification-right {
    float: right;
}
.phone-container .screen .notification-container .notification-right .tower-1, .phone-container .screen .notification-container .notification-right .tower-2 {
    margin-right: 5px;
}
.phone-container .screen .notification-container .notification-right .tower-1, .phone-container .screen .notification-container .notification-right .tower-2 {
    width: 0;
    display: inline-block;
    border-bottom: 10px solid #ccc;
    border-left: 10px solid transparent;
}
.phone-container .screen .notification-container .notification-right .cell-charge {
    width: 7px;
    height: 8px;
    margin-right: 2px;
    position: relative;
    border-radius: 1.2px;
    display: inline-block;
    background-color: #ccc;
}
.phone-container .screen .notification-container .notification-right .cell-charge::before {
    left: 50%;
    content: "";
    top: -1.3px;
    width: 2.3px;
    height: 1.3px;
    position: absolute;
    background-color: #ccc;
    transform: translateX(-50%);
}
.phone-container .screen .dateTime-container {
    top: 30%;
    left: 50%;
    color: #fff;
    text-align: center;
    position: absolute;
    transform: translateX(-50%);
}
.phone-container .screen .dateTime-container .time {
    font-size: 45px;
    margin-bottom: 7px;
    letter-spacing: 2px;
}
.phone-container .screen .dateTime-container .date {
    font-size: 10px;
}
.phone-container .screen .homescreen-apps {
    bottom: 40px;
    position: absolute;
}
.phone-container .screen .homescreen-apps .app {
    left: 10px;
    margin: 0 5px;
    position: relative;
}
.phone-container .screen .homescreen-apps .app::before {
    content: "";
    width: 25px;
    height: 26px;
    position: absolute;
    border-radius: 50px;
    background-color: #fff;
}
.phone-container .screen .homescreen-apps .facebook-icon {
    background: url(https://res.cloudinary.com/codier/image/upload/v1593611071/qxezd9gywrp6vauxwrqp.svg);
}
.phone-container .screen .homescreen-apps .instagram-icon {
    background: url(https://res.cloudinary.com/codier/image/upload/v1593612047/ray69rnopkvlmdhinv0v.svg);
}
.phone-container .screen .homescreen-apps .twitter-icon {
    background: url(https://res.cloudinary.com/codier/image/upload/v1593612100/l1s6soeenfd8xejkfpp8.svg);
}
.phone-container .screen .homescreen-apps .whatsapp-icon {
    background: url(https://res.cloudinary.com/codier/image/upload/v1593612073/bb72aiv7uojzqpy2ypru.svg);
}
.phone-container .screen .homescreen-apps .codier-icon {
    background: url(https://res.cloudinary.com/codier/image/upload/v1593612403/wjaglcirvv6hfojgmo0t.svg);
}
.phone-container .screen .homescreen-apps .icon {
    top: -3px;
    left: -4px;
    width: 30px;
    height: 30px;
    position: relative;
    border-radius: 50px;
    background-size: contain;
}
.phone-container .screen .appTray-slider {
    left: 50%;
    bottom: 10px;
    width: 20px;
    height: 7px;
    position: absolute;
    border-radius: 25px;
    background-color: #fff;
    transform: translateX(-50%);
}
`.trim();

export default code;