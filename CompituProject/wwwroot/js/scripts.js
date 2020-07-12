
window.blazorLocalStorage = (arr) => {
    localStorage.setItem("arr", JSON.stringify(arr));
}
window.blazorReadLocalStorage = () => {
    return localStorage.getItem("arr") ? JSON.parse(localStorage.getItem("arr")) : [];
}
