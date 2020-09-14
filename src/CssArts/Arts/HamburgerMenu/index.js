import './hamburgerMenu-styles.css';

const code = {};

code.html = `
    <div class="hamburgerMenu">
        <div class="bar-1"></div>
        <div class="bar-2"></div>
        <div class="bar-3"></div>
    </div>
`.trim();

code.css = `
    .hamburgerMenu {
        position: absolute;
        cursor: pointer;
        float: left;
        left: 50%;
        margin-left: -50px;
        margin-top: 100px;
    }

    .bar-1, .bar-2, .bar-3 {
        width: 100px;
        height: 10px;
        background-color: #555;
        margin: 10px 0;
        transition: 0.5s;
    }

    .change .bar-1 {
        transform: rotate(45deg) translate(20px, 10px);
    }

    .change .bar-3 {
        transform: rotate(135deg) translate(-20px, 10px);
    }

    .change .bar-2 {
        opacity: 0;
    }

    .container:hover > .bar-1 {
        animation: barkey 1s ease-in-out infinite;
    }

    .container:hover > .bar-2 {
        animation: barkey 1s ease-in-out 0.25s infinite;
    }

    .container:hover > .bar-3 {
        animation: barkey 1s ease-in-out 0.5s infinite;
    }

    .change:hover > .bar-1 {
        animation: 0;
    }

    .change:hover > .bar-2 {
        animation: 0;
    }

    .change:hover > .bar-3 {
        animation: 0;
    }

    @keyframes barkey {
        0%, 100% {
            width: 100px;
        }
        50% {
            width: 80px;
        }
    }
`.trim();

export default code;