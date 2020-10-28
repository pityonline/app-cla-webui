export const getClientHeight = () => window.innerHeight;
export const setMinHeight = (box, inner) => {
    document.getElementById(box).style.minHeight = document.getElementById(inner).clientHeight * 2 + 'px'
};
export const strToBase64 = (params) => {
    try {
        window.btoa(encodeURIComponent(params))
    } catch (e) {
        return false
    }
};
export const base64ToStr = (params) => {
    try {
        window.decodeURIComponent(window.atob(params))
    } catch (e) {
        return false
    }
};

