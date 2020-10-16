export const getClientHeight = () => window.innerHeight;
export const setMinHeight = (box,inner) => {
        document.getElementById(box).style.minHeight = document.getElementById(inner).clientHeight * 2 + 'px'
};
export const strToBase64 = (params) => window.btoa(encodeURIComponent(params));
export const base64ToStr = (params) => window.decodeURIComponent(window.atob(params));

