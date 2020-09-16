import './pikachu-styles.css';

const code = {};

code.html = `
<div class="pikachuContainer">
    <div class="pikachu">
        <div class="ear">
            <div class="ear-left">
                <div class="ear-left-top"></div>
                <div class="ear-left-bottom"></div>
            </div>
            <div class="ear-right">
                <div class="ear-right-top"></div>
                <div class="ear-right-bottom"></div>
            </div>
        </div>
        <div class="head">
            <div class="head-top"></div>
            <div class="head-bottom"></div>
        </div>
        <div class="eyes">
            <div class="eye-left">
                <div class="pupil-left"></div>
            </div>
            <div class="eye-right">
                <div class="pupil-right"></div>
            </div>
        </div>
        <div class="cheek">
            <div class="cheek-left"></div>
            <div class="cheek-right"></div>
        </div>
        <div class="nose">
            <div class="nose-left"></div>
            <div class="nose-right"></div>
        </div>
        <div class="lip-upper">
            <div class="lip-upper-left"></div>
            <div class="lip-upper-right"></div>
        </div>
        <div class="lip-lower">
            <div class="tongue"></div>
        </div>
    </div>
</div>
`.trim();

code.css = `
.pikachuContainer {
    left: 50%;
    width: 275px;
    height: 300px;
    position: relative;
    transform: translateX(-50%);
}

.ear {
    width: 100%;
    position: relative;
}

.ear-left, .ear-right {
    top: 20px;
    width: 60px;
    position: absolute;
}

.ear-left {
    left: -50%;
    transform: rotateZ(-30deg);
}

.ear-right {
    right: -50%;
    transform: rotateZ(30deg);
}

.ear-left-top {
    border-radius: 50%;
    position: absolute;
    top: -10px;
    width: 60px;
    height: 170px;
    background: radial-gradient(#584a4a, black);
    box-shadow: 6px 20px 40px 5px rgba(0,0,0,0.3);
}

.ear-left-bottom {
    width: 60px;
    height: 250px;
    background: radial-gradient(yellow, #ffe047);
    border-radius: 50%;
    position: absolute;
    top: 63px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    box-shadow: 6px 20px 40px 5px rgba(0,0,0,0.3);
}

.ear-right-top {
    border-radius: 50%;
    position: absolute;
    top: -10px;
    width: 60px;
    height: 170px;
    background: radial-gradient(#584a4a, black);
    box-shadow: 6px 20px 40px 5px rgba(0,0,0,0.3);
}

.ear-right-bottom {
    width: 60px;
    height: 250px;
    background: radial-gradient(yellow, #ffe047);
    border-radius: 50%;
    position: absolute;
    top: 63px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    box-shadow: 6px 20px 40px 5px rgba(0,0,0,0.3);
}

.head-top {
    width: 375px;
    height: 220px;
    position: absolute;
    top: 270px;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 45%;
    border-bottom-right-radius: 0%;
    border-bottom-left-radius: 0%;
    background: linear-gradient(to bottom, #ffe047 0%, yellow 35%);
    box-shadow: 75px 4px 30px -57px rgba(0,0,0,0.2);
}

.head-bottom {
    width: 400px;
    height: 230px;
    position: absolute;
    top: 385px;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border-top-left-radius: 40%;
    background: linear-gradient(to bottom, yellow 60%, #ffe047 100%);
    border-top-right-radius: 40%;
    z-index: -2;
    box-shadow: 6px 20px 40px 5px rgba(0,0,0,0.3);
}

.eyes {
    width: 366px;
    height: 80px;
    position: absolute;
    top: 265px;
    left: 50%;
    padding: 0px 30px;
    transform: translateX(-50%);
}

.eye-left {
    width: 80px;
    height: 95px;
    position: absolute;
    border-radius: 50%;
    margin-right: 20px;
    transform: rotateZ(7deg);
    box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.3);
    background: radial-gradient(circle at top right, #444444 8%, #000 100%);
}

.eye-right {
    width: 80px;
    height: 95px;
    border-radius: 50%;
    transform: rotateZ(-7deg);
    float: right;
    margin-right: 20px;
    box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.3);
    background: radial-gradient(circle at top left, #444444 8%, #000 100%);
}

.pupil-left {
    width: 32px;
    height: 35px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 15px;
}

.pupil-right {
    width: 32px;
    height: 35px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 15px;
}

.cheek {
    position: absolute;
    top: 340px;
    background: #999;
    width: 406px;
    left: 50%;
    transform: translateX(-50%);
}

.cheek-left {
    width: 75px;
    height: 100px;
    border-radius: 50%;
    background: radial-gradient(#ff0000, #ab0404);
    position: absolute;
    top: 7px;
    left: -7px;
    transform: rotateZ(-20deg) rotateY(25deg);
}

.cheek-right {
    width: 75px;
    height: 100px;
    border-radius: 50%;
    background: radial-gradient(#ff0000, #ab0404);
    position: absolute;
    top: 10px;
    right: 10px;
    transform: rotateZ(25deg) rotateY(-25deg);
}

.nose {
    position: absolute;
    top: 360px;
    left: 50%;
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-top-left-radius: 25%;
    border-top-right-radius: 25%;
    z-index: 999;
    transform: translateX(-50%);
}

.nose-left {
    position: absolute;
    height: 15px;
    width: 15px;
    background: #000;
    border-bottom-left-radius: 100%;
    box-shadow: 2px 4px 6px 0px rgba(0,0,0,0.3);
}

.nose-right {
    position: absolute;
    height: 15px;
    width: 15px;
    background: #000;
    border-bottom-right-radius: 100%;
    right: 0px;
    box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.3);
}

.lip-upper {
    width: 120px;
    position: absolute;
    top: 360px;
    left: 50%;
    transform: translateX(-50%);
}

.lip-upper-left {
    position: absolute;
    width: 60px;
    height: 50px;
    border-radius: 45%;
    border-bottom: 2px solid #000;
    box-shadow: 5px 18px 15px -3px rgba(0,0,0,0.3);
    background: radial-gradient(circle at top, yellow 70%, #ff7a47 90%);
}

.lip-upper-right {
    position: absolute;
    width: 60px;
    height: 50px;
    border-radius: 45%;
    border-bottom: 2px solid #000;
    right: 0px;
    box-shadow: -5px 18px 15px -3px rgba(0,0,0,0.3);
    background: radial-gradient(circle at top, yellow 70%, #ff7a47 90%);
}

.lip-lower {
    position: absolute;
    width: 100px;
    height: 170px;
    border-radius: 50%;
    background: #a23521;
    top: 320px;
    left: 50%;
    border: 2px solid #000;
    z-index: -1;
    overflow: hidden;
    transform: translateX(-50%);
    box-shadow: 2px 5px 10px 1px rgba(0,0,0,0.3);
}

.tongue {
    position: absolute;
    top: 105px;
    width: 95px;
    height: 65px;
    background: radial-gradient(#ff90a1, #ff0000d6);
    border: 2px solid #000;
    border-radius: 50%;
}
`.trim();

export default code;