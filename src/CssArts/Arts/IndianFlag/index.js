import './IndianFlag-styles.css';

const code = {};

code.html = `
<div class="flagContainer">
    <div class="flag">
        <div class="saffron"></div>
        <div class="white"></div>
        <div class="chakra">
            <div class="spokes-container">
                <div class="spoke"></div>
                <div class="spoke"></div>
                <div class="spoke"></div>
                <div class="spoke"></div>
                <div class="spoke"></div>
                <div class="spoke"></div>
                <div class="spoke"></div>
                <div class="spoke"></div>
            </div>
        </div>
        <div class="green"></div>
    </div>
    <div class="bar"></div>
    <div class="stand">
        <div class="step-1"></div>
        <div class="step-2"></div>
        <div class="step-3"></div>
    </div>
</div>
`.trim();

code.css = `
.flagContainer {
    left: 50%;
    width: 325px;
    position: relative;
    transform: translateX(-50%);
}
.flag {
    top: 30px;
    width: 215px;
    height: 125px;
    display: grid;
    position: relative;
    left: calc(100% - 220px);
}
.flag .saffron {
    background-color: #ff9933;
}

.flag .white {
    background-color: #ffffff;
}

.flag .green {
    background-color: #138808;
}

.flag .chakra {
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    border: 2px solid #000080;
}

.flag .chakra .spokes-container {
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: relative;
    transform: translate(-50%, -50%);
}

.flag .chakra .spokes-container .spoke,
.flag .chakra .spokes-container .spoke:before,
.flag .chakra .spokes-container .spoke:after {
    width: 1.7px;
    height: 17px;
    position: absolute;
    background-color: #000080;
}

.flag .chakra .spokes-container .spoke:before,
.flag .chakra .spokes-container .spoke:after {
    content: "";
    position: absolute;
    transform-origin: bottom;
}

.flag .chakra .spokes-container .spoke {
    top: 3.5px;
    left: 50%;
    transform-origin: bottom;
}

.flag .chakra .spokes-container .spoke:before {
    transform: rotate(120deg);
}

.flag .chakra .spokes-container .spoke:after {
    transform: rotate(-120deg);
}

.flag .chakra .spokes-container .spoke:nth-child(1) {
    transform: translateX(-50%);
}

.flag .chakra .spokes-container .spoke:nth-child(2) {
    transform: translateX(-50%) rotate(15deg);
}

.flag .chakra .spokes-container .spoke:nth-child(3) {
    transform: translateX(-50%) rotate(30deg);
}

.flag .chakra .spokes-container .spoke:nth-child(4) {
    transform: translateX(-50%) rotate(45deg);
}

.flag .chakra .spokes-container .spoke:nth-child(5) {
    transform: translateX(-50%) rotate(60deg);
}

.flag .chakra .spokes-container .spoke:nth-child(6) {
    transform: translateX(-50%) rotate(75deg);
}

.flag .chakra .spokes-container .spoke:nth-child(7) {
    transform: translateX(-50%) rotate(90deg);
}

.flag .chakra .spokes-container .spoke:nth-child(8) {
    transform: translateX(-50%) rotate(105deg);
}

.bar {
    left: 95px;
    top: -100px;
    width: 10px;
    height: 350px;
    position: relative;
    background: linear-gradient(
        to right,
        #82501f 0%,
        #cd7f32 50%,
        #a16326 100%
    );
}

.stand {
    left: 5px;
    top: 375px;
    width: 190px;
    height: 100px;
    display: grid;
    position: absolute;
    justify-items: center;
}

.stand .step-1 {
    width: 35%;
    background: linear-gradient(
        to right,
        #653a0d 0%,
        #8a5b2b 25%,
        #ad7237 50%,
        #8a5b2b 75%,
        #653a0d 100%
    );
}

.stand .step-2 {
    width: 65%;
    background: linear-gradient(
        to right,
        #55300a 0%,
        #8a5b2b 25%,
        #ad7237 50%,
        #8a5b2b 75%,
        #55300a 100%
    );
}

.stand .step-3 {
    width: 100%;
    background: linear-gradient(
        to right,
        #482909 0%,
        #8a5b2b 25%,
        #ad7237 50%,
        #8a5b2b 75%,
        #482909 100%
    );
}
`.trim();

export default code;