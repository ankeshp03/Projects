import './tesseract-styles.css';

const code = {};

code.html = `
<div class="tesseractContainer">
    <div class="tesseract">
    <div class="cube-1">
        <div class="sides front"></div>
        <div class="sides top"></div>
        <div class="sides back"></div>
        <div class="sides bottom"></div>
        <div class="sides left"></div>
        <div class="sides right"></div>
    </div>
    <div class="cube-2">
        <div class="sides front"></div>
        <div class="sides top"></div>
        <div class="sides back"></div>
        <div class="sides bottom"></div>
        <div class="sides left"></div>
        <div class="sides right"></div>
    </div>
    <div class="joins">
        <div class="line line-1"></div>
        <div class="line line-2"></div>
        <div class="line line-3"></div>
        <div class="line line-4"></div>
        <div class="line line-5"></div>
        <div class="line line-6"></div>
        <div class="line line-7"></div>
        <div class="line line-8"></div>
    </div>
    </div>
</div>
`.trim();

code.css = `
.tesseractContainer {
    margin: 0;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #333;
}
.tesseractContainer .tesseract {
    position: relative;
    transform-style: preserve-3d;
    animation: spin 20s infinite linear;
    transform: rotateX(15deg) rotateY(15deg);
}

@keyframes spin {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotateX(360deg) rotateY(360deg);
    }
}

.tesseractContainer .cube-1,
.tesseractContainer .cube-2 {
    width: 100px;
    height: 100px;
    position: relative;
    transform-style: preserve-3d;
}

@keyframes animateCube-1 {
    0% {
        width: 100px;
        height: 100px;
    }
    25% {
        width: 100px;
        height: 100px;
    }
    50% {
        width: 200px;
        height: 200px;
    }
    75% {
        width: 200px;
        height: 200px;
    }
    100% {
        width: 100px;
        height: 100px;
    }
}

.tesseractContainer .sides {
    width: 100%;
    height: 100%;
    display: flex;
    color: #fff;
    position: absolute;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    border: 2px solid #ccc;
}

.tesseractContainer .front {
    transform: translateZ(50px);
}

.tesseractContainer .top {
    transform: rotateX(-90deg) translateY(-50%);
    transform-origin: top center;
}

.tesseractContainer .back {
    transform: translateZ(-50px) rotateX(-180deg);
    transform-origin: center;
}

.tesseractContainer .bottom {
    transform: rotateX(90deg) translateY(50%);
    transform-origin: bottom center;
}

.tesseractContainer .left {
    transform: rotateY(270deg) translateX(-50%);
    transform-origin: center left;
}

.tesseractContainer .right {
    transform: rotateY(-270deg) translateX(50%);
    transform-origin: top right;
}

.tesseractContainer .cube-2 {
    width: 200px;
    height: 200px;
    position: absolute;
    top: calc(50% - 100px);
    left: calc(50% - 100px);
    transform-origin: center;
}

.tesseractContainer .cube-2 .front {
    transform: translateZ(100px);
}

.tesseractContainer .cube-2 .back {
    transform: translateZ(-100px) rotateX(-180deg);
    transform-origin: center;
}

.tesseractContainer .joins {
    width: 100px;
    height: 100px;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    position: absolute;
}

.tesseractContainer .line {
    height: 2px;
    position: absolute;
    background-color: #ccc;
}

.tesseractContainer .line-1 {
    width: 85px;
    transform: translateZ(-50px) translateX(0px) translateY(0px) rotateX(90deg)
        rotateY(45deg) rotateZ(-145deg);
    transform-origin: top left;
}

.tesseractContainer .line-2 {
    width: 85px;
    transform: translateZ(50px) translateX(0px) translateY(0px) rotateX(90deg)
        rotateY(45deg) rotateZ(145deg);
    transform-origin: top left;
}

.tesseractContainer .line-3 {
    width: 85px;
    transform: translateZ(50px) translateX(0px) translateY(100px)
        rotateX(-90deg) rotateY(45deg) rotateZ(-145deg);
    transform-origin: top left;
}

.tesseractContainer .line-4 {
    width: 85px;
    transform: translateZ(-50px) translateX(0px) translateY(100px)
        rotateX(-90deg) rotateY(45deg) rotateZ(145deg);
    transform-origin: top left;
}

.tesseractContainer .line-5 {
    width: 85px;
    transform: translateZ(50px) translateX(100px) translateY(0px)
        rotateX(-90deg) rotateY(45deg) rotateZ(-35deg);
    transform-origin: top left;
}

.tesseractContainer .line-6 {
    width: 85px;
    transform: translateZ(-50px) translateX(100px) translateY(0px)
        rotateX(-90deg) rotateY(45deg) rotateZ(35deg);
    transform-origin: top left;
}

.tesseractContainer .line-7 {
    width: 85px;
    transform: translateZ(-50px) translateX(100px) translateY(100px)
        rotateX(90deg) rotateY(45deg) rotateZ(-35deg);
    transform-origin: top left;
}

.tesseractContainer .line-8 {
    width: 85px;
    transform: translateZ(50px) translateX(100px) translateY(100px)
        rotateX(90deg) rotateY(45deg) rotateZ(35deg);
    transform-origin: top left;
}
`.trim();

export default code;