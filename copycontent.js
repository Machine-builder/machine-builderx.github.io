


function copyNavBar() {
    document.getElementById("sideNav").innerHTML = `
<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
<a href="./index.html">Home</a>
<a href="./addondownloads.html">Addons</a>
<a href="./programdownloads.html">Programs</a>"`
}

// todo : background-image: url("backgroundimg2.png"); - background image for footer
function copyFooterRegion() {
    document.getElementById("footer_region").innerHTML = `
<div class="footerbreak" style="height: 200px;"></div>
<div class="footer_div" style="position: fixed; left: 0; bottom: 0; width: 100%; background-color: #537cbe; color: white; text-align: center;">
    <p>
        <a href="https://www.youtube.com/c/MACHINEBUILDER?sub_confirmation=1" target='_blank' class="fab fa-youtube"></a>
        <a href="https://www.instagram.com/machine_builder2/" target='_blank'  class="fab fa-instagram"></a>
        <a href="https://discord.gg/jYHAKY2" target='_blank'  class="fab fa-discord"></a>
        <a href="https://www.paypal.me/machinebuilder" target='_blank'  class="fab fa-paypal"></a>
    </p>
</div>`
}

function copyContent() {
    console.log("Load nav bar")
    copyNavBar()
    console.log("Load footer")
    copyFooterRegion()
}

window.addEventListener("load", copyContent)