import './umbrella-styles.css';

const code = {};

code.html = `
<div class="umbrella">
    <div class="top"></div>
    <div class="curve-1"></div>
    <div class="curve-2"></div>
    <div class="handle"></div>
</div>
`.trim();

code.css = `
    .umbrella {
        width: 200px;
        height: 65px;
        margin: 30px auto 0;
        position: relative;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
        background: radial-gradient(
            ellipse at bottom center,
            #30170b 0%,
            #ff7635 60%,
            #d4591e 80%
        );
    }

    .umbrella::before {
        top: 0;
        left: 15%;
        bottom: 0;
        right: 15%;
        content: "";
        position: absolute;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
        background: radial-gradient(
            ellipse at bottom center,
            #ccbd00 0%,
            #fbe904 60%,
            #ccbd00 80%
        );
    }

    .umbrella::after {
        top: 0;
        left: 35%;
        bottom: 0;
        right: 35%;
        content: "";
        position: absolute;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
        background: linear-gradient(to right, #76b915, #9bce51, #76b915);
    }

    .umbrella .top {
        left: 50%;
        top: -7.5px;
        width: 10px;
        height: 10px;
        content: "";
        position: absolute;
        border-radius: 50%;
        transform: translateX(-50%);
        background: radial-gradient(ellipse at center, #a13131 10%, #551717 65%);
    }

    .umbrella .curve-1 {
        width: 30px;
        content: "";
        height: 7px;
        bottom: 0px;
        position: absolute;
        background-color: #fff;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
    }

    .umbrella .curve-1::before {
        bottom: 0;
        left: 30px;
        width: 40px;
        content: "";
        height: 7px;
        position: absolute;
        background-color: #fff;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
    }

    .umbrella .curve-1::after {
        bottom: 0;
        left: 70px;
        z-index: 1;
        width: 60px;
        content: "";
        height: 7px;
        position: absolute;
        background-color: #fff;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
    }

    .umbrella .curve-2 {
        bottom: 0;
        left: 130px;
        z-index: 1;
        width: 40px;
        content: "";
        height: 7px;
        position: absolute;
        background-color: #fff;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
    }

    .umbrella .curve-2::before {
        bottom: 0;
        left: 40px;
        z-index: 1;
        width: 30px;
        content: "";
        height: 7px;
        position: absolute;
        background-color: #fff;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
    }

    .umbrella .handle {
        top: 89%;
        left: 50%;
        width: 6px;
        z-index: 1;
        height: 90px;
        position: absolute;
        background: linear-gradient(
            to right,
            #551717 15%,
            #a13131 65%,
            #551717 95%
        );
        transform: translateX(-50%);
    }

    .umbrella .handle::before {
        z-index: 1;
        right: 6px;
        width: 23px;
        content: "";
        height: 14px;
        bottom: -14px;
        position: absolute;
        background-color: #fff;
        border-top-color: transparent;
        border-radius: 0 0 50% 50%/0 0 100% 100%;
    }

    .umbrella .handle::after {
        right: 0;
        content: "";
        width: 35px;
        height: 20px;
        bottom: -20px;
        position: absolute;
        background: radial-gradient(
            ellipse at top,
            #551717 50%,
            #a13131 61%,
            #551717 71%
        );
        border-top-color: transparent;
        border-radius: 0 0 50% 50%/0 0 100% 100%;
    }
`.trim();

export default code;