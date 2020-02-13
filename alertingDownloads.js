function downloadFeatureGen() {
    var r = confirm("By pressing OK, you agree that if you create and upload an addon with the help of this software, you must provide credit as a link to the original video (https://www.youtube.com/watch?v=vcLibdIq7To). If you do not give credit in your addon, Your addon will be taken down.")
    if (r == true) {
        openURL('https://drive.google.com/file/d/15eBRSl-uZALnhHZdoqRSd2J8f3QIqomn/view?usp=sharing')
    } else {

    }
}

function openURL(url) {
    Object.assign(document.createElement('a'), { target: '_blank', href: url}).click();
}