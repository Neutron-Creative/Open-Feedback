(function() {
    let widget_container = document.createElement('div');

    callAjax('https://cdn.jsdelivr.net/gh/Neutron-Creative/Open-Feedback/dist/index.html', function(response) {
        widget_container.innerHTML = response;
        document.body.appendChild(widget_container);
    });

    function callAjax(url, callback){
        var xmlhttp;
        // compatible with IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                callback(xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
})();