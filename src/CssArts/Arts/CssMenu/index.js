import './cssMenu-styles.css';

const code = {};

code.html = `
<div class="cssMenuContainer">
    <p class="note">Please click on the menu to see the animation</p>
    <div class="center">
        <button class="menu-container"></button>
        <ul class="nav-container">
            <li class="nav-item">Home</li>
            <li class="nav-item">Work</li>
            <li class="nav-item">Life</li>
            <li class="nav-item">Spirit</li>
        </ul>
    </div>
</div>
`.trim();

code.css = `
.cssMenuContainer {
    width: 100%;
    height: 400px;
    margin: 0 auto;
    max-width: 400px;
    border-radius: 2px;
    box-shadow: 4px 8px 16px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background: linear-gradient(200deg, #2c4ea3 0%, #74bdd5 100%);
    color: #333;
    font-family: 'Open Sans', Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.cssMenuContainer .note {
    color: #fff;
    height: 20px;
    margin-top: 30px;
    margin-bottom: 0;
    text-align: center;
}
.cssMenuContainer .center {
    position: absolute;
    top: calc(50% - 20px);
    left: 50%;
    position: relative;
    transform: translate(-50%, calc(-50% - 20px));
}
.cssMenuContainer .center .menu-container {
    width: 40px;
    height: 25px;
    left: 50%;
    top: 50%;
    position: absolute;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    transform: translate(-50%, -50%);
    border-top: 4px solid #fff;
    border-bottom: 4px solid #fff;
    transition: all 1s;
    animation: collapseMenu 1s ease-out 0s 1 normal forwards;
}
.cssMenuContainer .center .menu-container:focus {
    cursor: default;
    animation: expandMenu 1s ease-out 0s 1 normal forwards;
}
.cssMenuContainer .center .menu-container:focus + .nav-container {
    animation: showContent 1s ease 0.4s 1 normal forwards;
}
.cssMenuContainer .center .nav-container {
    opacity: 0;
    visibility: hidden;
    list-style: none;
    margin: 0;
    color: #fff;
    padding: 0;
    height: 62px;
    overflow: hidden;
    display: flex;
    font-weight: 600;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    transition: 1s;
    animation: hideContent 1s ease 0s 1 normal forwards;
}
.cssMenuContainer .center .nav-container .nav-item {
    float: left;
    cursor: pointer;
    margin: 0 15px;
    transition: 0.3s;
}
.cssMenuContainer .center .nav-container .nav-item:hover {
    opacity: 0.6;
}
@keyframes expandMenu {
    0% {
        height: 25px;
    }
    20% {
        height: 17.5px;
        width: 40px;
    }
    40% {
        height: 60px;
        width: 40px;
        border-top-width: 2px;
        border-bottom-width: 2px;
    }
    100% {
        height: 60px;
        width: 70%;
        border-top-width: 2px;
        border-bottom-width: 2px;
    }
}
@keyframes collapseMenu {
    0% {
        height: 60px;
        width: 70%;
        border-top-width: 2px;
        border-bottom-width: 2px;
    }
    50% {
        height: 60px;
        width: 40px;
        border-top-width: 2px;
        border-bottom-width: 2px;
    }
    60% {
        height: 60px;
        width: 40px;
        border-top-width: 2px;
        border-bottom-width: 2px;
    }
    100% {
        width: 40px;
        height: 25px;
        border-top-width: 4px;
        border-bottom-width: 4px;
    }
}
@keyframes showContent {
    0% {
        opacity: 0;
        visibility: hidden;
    }
    100% {
        opacity: 1;
        visibility: visible;
    }
}
@keyframes hideContent {
    0% {
        opacity: 1;
        visibility: visible;
    }
    70% {
        opacity: 0;
        visibility: hidden;
    }
}
`.trim();

export default code;