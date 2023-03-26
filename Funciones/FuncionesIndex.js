let URL = window.location.toString();
let frontendURL;
let backendURL;

console.log(URL);

if (URL === "https://frontendrol1.herokuapp.com") {

    frontendURL = "https://frontendrol1.herokuapp.com";
    backendURL = "https://backendrol1.herokuapp.com";
    sessionStorage.setItem("frontendURL", frontendURL);
    sessionStorage.setItem("backendURL", backendURL);

} else {

    frontendURL = "http://localhost/FrontendRol2";
    backendURL = "http://localhost/BackendRol2";
    sessionStorage.setItem("frontendURL", frontendURL);
    sessionStorage.setItem("backendURL", backendURL);
}
