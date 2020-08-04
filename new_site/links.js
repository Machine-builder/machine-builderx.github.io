// https://stackoverflow.com/questions/4907843/open-a-url-in-a-new-tab-and-not-a-new-window
function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}