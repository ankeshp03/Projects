import './sevenSegmentDisplay-styles.css';

const code = {};

code.html = `
<div class="sevenSegmentContainer">
    <div class="seven-segment">
        <div class="segment-A"></div>
        <div class="segment-B"></div>
        <div class="segment-C"></div>
        <div class="segment-D"></div>
        <div class="segment-E"></div>
        <div class="segment-F"></div>
        <div class="segment-G"></div>
    </div>
</div>
`.trim();

code.css = `
.sevenSegmentContainer {
    --length: 100px;
    --breadth: 20px;
    --segment-on-color: red;
    --segment-off-color: #ff00001a;
    --shadow-color: rgba(255, 0, 0, 0.5);
}
.sevenSegmentContainer {
    padding: 20px;
    background: #222;
}
.seven-segment {
    width: 180px;
    height: 260px;
    margin: 20px auto;
    position: relative;
}

.seven-segment div {
    position: absolute;
    border-radius: 10px;
    box-sizing: border-box;
    animation-duration: 10s;
    transform: translateX(20px);
    animation-iteration-count: infinite;
    animation-timing-function: steps(1, end);
}

.segment-A,
.segment-D,
.segment-G {
    width: var(--length);
    height: var(--breadth);
}

.segment-B,
.segment-C,
.segment-E,
.segment-F {
    width: var(--breadth);
    height: var(--length);
}

.segment-A {
    left: var(--breadth);
    animation-name: animate-A;
}

@keyframes animate-A {
    0%,
    100% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    10% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    20% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    30% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    40% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    50% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    60% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    70% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    80% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    90% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
}

.segment-B {
    top: var(--breadth);
    left: calc(var(--length) + var(--breadth));
    animation-name: animate-B;
}

@keyframes animate-B {
    0%,
    100% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    10% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    20% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    30% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    40% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    50% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    60% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    70% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    80% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    90% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
}

.segment-C {
    top: calc(var(--length) + (var(--breadth) * 2));
    left: calc(var(--length) + var(--breadth));
    animation-name: animate-C;
}

@keyframes animate-C {
    0%,
    100% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    10% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    20% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    30% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    40% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    50% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    60% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    70% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    80% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    90% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
}

.segment-D {
    top: calc((var(--length) * 2) + (var(--breadth) * 2));
    left: var(--breadth);
    animation-name: animate-D;
}

@keyframes animate-D {
    0%,
    100% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    10% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    20% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    30% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    40% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    50% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    60% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    70% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    80% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    90% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
}

.segment-E {
    top: calc(var(--length) + (var(--breadth) * 2));
    animation-name: animate-E;
}

@keyframes animate-E {
    0%,
    100% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    10% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    20% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    30% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    40% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    50% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    60% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    70% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    80% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    90% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
}

.segment-F {
    top: var(--breadth);
    animation-name: animate-F;
}

@keyframes animate-F {
    0%,
    100% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    10% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    20% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    30% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    40% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    50% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    60% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    70% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    80% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    90% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
}

.segment-G {
    top: calc(var(--length) + var(--breadth));
    left: var(--breadth);
    animation-name: animate-G;
}

@keyframes animate-G {
    0%,
    100% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    10% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    20% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    30% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    40% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    50% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    60% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    70% {
        background-color: var(--segment-off-color);
        box-shadow: none;
    }
    80% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
    90% {
        background-color: var(--segment-on-color);
        box-shadow: 0 0 10px 2px var(--shadow-color);
    }
}
`.trim();

export default code;