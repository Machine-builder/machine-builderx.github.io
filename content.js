window.onload = function(e) {


    document.getElementById('footer-content').innerHTML = `
    <button onclick="openInNewTab('https://www.youtube.com/machinebuilder/')" type="button" class="btn btn-social-icon btn-youtube btn-rounded"><a class="fa fa-youtube"></a></button>
    <button onclick="openInNewTab('https://discord.gg/8PrhMty/')" type="button" class="btn btn-social-icon btn-discord btn-rounded"><a class="fa fa-discord"></a></button>
    <button onclick="openInNewTab('https://www.instagram.com/machine_builder2/')" type="button" class="btn btn-social-icon btn-instagram btn-rounded"><a class="fa fa-instagram"></a></button>
    <button onclick="openInNewTab('https://www.paypal.me/machinebuilder/')" type="button" class="btn btn-social-icon btn-paypal btn-rounded"><a class="fa fa-paypal"></a></button>
    `

    
    document.getElementById('sidenavbar').innerHTML = `
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <a href="index.html">Home</a>
    <a href="programs.html">Programs</a>
    <a href="addons.html">Addons</a>
    `

    
}