'use strict';

const acceptBtn = document.querySelector('.accept');
const settingsBtn = document.querySelector('.settings');
const browser = document.querySelector('.browser');
const operatingSystem = document.querySelector('.operating-system');
const screenWidth = document.querySelector('.screen-width');
const screenHeight = document.querySelector('.screen-height');
const saveSettings = document.querySelector('#save-settings');
const cookiesContainer = document.querySelector('.cookies-container');
const cookiesSettings = document.querySelector('.cookies-settings');


// Function to display cookies container
function displayCookiesContainer() {
    setTimeout(() => {
        cookiesContainer.style.display = 'block';
    }, 1000);
}

window.addEventListener('load', updateSettingsDisplay);

const LIFETIME = 15;

// Event listener for settings button click
settingsBtn.addEventListener('click', function() {
    cookiesSettings.style.display = 'block';
});

acceptBtn.addEventListener('click', function() {
    cookiesContainer.style.display = 'none';
    cookiesSettings.style.display = 'none';

    const browserName = getBrowserName();
    console.log(`Browser: ${browserName}`);
    setCookie('browser', browserName, LIFETIME);

    const osName = getOperatingSystem();
    console.log(`Operating System: ${osName}`);
    setCookie('operating_system', osName, LIFETIME);

    const screenWidthValue = window.innerWidth;
    console.log(`Screen width: ${screenWidthValue}px`);
    setCookie('screen_width', screenWidthValue.toString(), LIFETIME);


    const screenHeightValue = window.innerHeight;
    console.log(`Screen height: ${screenHeightValue}px`);
    setCookie('screen_height', screenHeightValue.toString(), LIFETIME);
});

saveSettings.addEventListener('click', function() {
    cookiesSettings.style.display = 'none';
    cookiesContainer.style.display = 'none';
});


window.addEventListener('load', function() {
    getCookie('browser');
});


function setCookie(name, value, maxAge) {
    const encodedName = encodeURIComponent(name);
    const encodedValue = encodeURIComponent(value);
    maxAge = LIFETIME;
    const options = {
        path: '/',
        SameSite: 'Lax'
    }

    document.cookie = `${encodedName}=${encodedValue}; path=${options.path}; max-age=${maxAge}; SameSite=${options.SameSite}`;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    displayCookiesContainer();
    return null;
}


// function to print cookies
const checkedStatus = {
    browser: false,
    operatingSystem: false,
    screenWidth: false,
    screenHeight: false
};

// function for width and height
function readWindow() {
    // console.log(`screen width: ${window.innerWidth}px`);
    // console.log(`screen height: ${window.innerHeight}px`);
}
window.addEventListener('load', readWindow);
window.addEventListener('resize', readWindow);


// function to get browser name
function getBrowserName() {
    const userAgent = navigator.userAgent.toLowerCase();
    let browserName = '';

    if (userAgent.includes('firefox')) {
        browserName = "firefox";
    }
        else if (userAgent.includes('edge')) {
            browserName = "Microsoft Edge";
    } else if (userAgent.includes('chrome')) {
        browserName = "chrome";
    } else if (userAgent.includes('safari')) {
        browserName = "safari";
    } else if (userAgent.includes('opr')) {
        browserName = "opera";
    } else {
        browserName = 'unknown'
    }

    return browserName;
}
// console.log(`Browser: ${getBrowserName()}`);

// function for operating system
function getOperatingSystem() {
    const userAgent = navigator.userAgent.toLowerCase();

    let oSystem = '';
    if (userAgent.includes("windows")) {
        oSystem =  "Windows";
    } else if (userAgent.includes("mac")) {
        oSystem =  "Mac OS";
    } else if (userAgent.includes("linux")) {
        oSystem =  "Linux";
    } else {
        oSystem =  "Unknown";
    }
    // console.log(`Operating System: ${oSystem}`);
    return oSystem;
}
getOperatingSystem();


function updateSettingsDisplay() {
    const browserChecked = browser.querySelector('input').checked;
    const operatingSystemChecked = operatingSystem.querySelector('input').checked;
    const screenWidthChecked = screenWidth.querySelector('input').checked;
    const screenHeightChecked = screenHeight.querySelector('input').checked;

    if (browserChecked) {
        console.log(`Browser: ${getBrowserName()}`);
    } else {
        console.log('Browser: Cookies rejected');
    }

    if (operatingSystemChecked) {
        console.log(`Operating System: ${getOperatingSystem()}`);
    } else {
        console.log('Operating System: Cookies rejected');
    }

    if (screenWidthChecked) {
        console.log(`Screen width: ${window.innerWidth}px`);
    } else {
        console.log('Screen width: Cookies rejected');
    }

    if (screenHeightChecked) {
        console.log(`Screen height: ${window.innerHeight}px`);
    } else {
        console.log('Screen height: Cookies rejected');
    }
}


// Event listener for Save settings button
saveSettings.addEventListener('click', updateSettingsDisplay);

// Event listeners for toggle switches
document.querySelectorAll('.options input').forEach(input => {
    input.addEventListener('change', updateSettingsDisplay);
});