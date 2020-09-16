import './umbrella-styles.css';

const code = {};

code.html =`
    <div class="umbrellaContainer">
    <div class="top"></div>
    <div class="umbrella" >
        <div class="curve-1"></div>
        <div class="curve-2"></div>
    </div >
    <div class="handle"></div>
</div >
`.trim();

code.css = `
    .umbrellaContainer .umbrella {
        left: 50%;
        width: 200px;
        height: 70px;
        position: relative;
        display: inline-block;
        transform: translateX(-50%);
        border-radius: 50% 50% 0 0/100% 100% 0 0;
        background: radial-gradient(
            ellipse at bottom center,
            #30170b 0%,
            #ff7635 60%,
            #d4591e 80%
        );
    }

    .umbrellaContainer .umbrella::before {
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

    .umbrellaContainer .umbrella::after {
        top: 0;
        left: 35%;
        bottom: 0;
        right: 35%;
        content: "";
        position: absolute;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
        background: linear-gradient(to right, #76b915, #9bce51, #76b915);
    }

    .umbrellaContainer .top {
        left: 50%;
        top: 1px;
        width: 10px;
        height: 10px;
        content: "";
        position: relative;
        border-radius: 50%;
        transform: translateX(-50%);
        background: radial-gradient(ellipse at center, #a13131 10%, #551717 65%);
    }

    .umbrellaContainer .umbrella .curve-1 {
        width: 30px;
        content: "";
        height: 7px;
        bottom: 0px;
        position: absolute;
        background-color: #fff;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
    }

    .umbrellaContainer .umbrella .curve-1::before {
        bottom: -1px;
        left: 30px;
        width: 40px;
        content: "";
        height: 8px;
        position: absolute;
        background-color: #fff;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
    }

    .umbrellaContainer .umbrella .curve-1::after {
        bottom: -1px;
        left: 70px;
        z-index: 1;
        width: 60px;
        content: "";
        height: 8px;
        position: absolute;
        background-color: #fff;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
    }

    .umbrellaContainer .umbrella .curve-2 {
        bottom: -1px;
        left: 130px;
        z-index: 1;
        width: 40px;
        content: "";
        height: 8px;
        position: absolute;
        background-color: #fff;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
    }

    .umbrellaContainer .umbrella .curve-2::before {
        bottom: -1px;
        left: 40px;
        z-index: 1;
        width: 30px;
        content: "";
        height: 8px;
        position: absolute;
        background-color: #fff;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
    }

    .umbrellaContainer .handle {
        left: 50%;
        top: -12px;
        width: 6px;
        z-index: 0;
        height: 90px;
        position: relative;
        background: linear-gradient(
            to right,
            #551717 15%,
            #a13131 65%,
            #551717 95%
        );
        transform: translateX(-50%);
    }

    .umbrellaContainer .handle::before {
        z-index: 1;
        right: 6px;
        width: 23px;
        content: "";
        height: 15px;
        bottom: -14px;
        position: absolute;
        background-color: #fff;
        border-top-color: transparent;
        border-radius: 0 0 50% 50%/0 0 100% 100%;
    }

    .umbrellaContainer .handle::after {
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