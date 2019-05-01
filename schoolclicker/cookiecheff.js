export function setCookie(cname, cvalue, exdays = 50000) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function deleteCookie(cname, cvalue, exdays = -50) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + "delete" + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function bake_cookie(name, value) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    var cookie = [name, '=', JSON.stringify(value), ';', expires, '; path=/;'].join('')
    document.cookie = cookie
}

export function read_cookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'))
    console.log("read cookie")
    console.log(result)
    if (result != null) {
        result = JSON.parse(result[1])
        console.log('output of cookie read')
        console.log(result)
    }
    return result
}

export function delete_cookie(name) {
    document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
}

export function seconds_time() {
    var time = Math.floor(new Date().getTime() / 1000)
    return time
}