(function() {
    let widget_container = document.createElement('div');
    let discord = new URLSearchParams(window.location.search).get('discord') || null;

    callAjax('dist/plugin/index.html?discord='+discord, function(response) {
        
        widget_container.innerHTML = response;
        document.body.appendChild(widget_container);
        
        let scripts = document.createElement('script');
        scripts.src='dist/plugin/index.min.js';
        document.body.appendChild(scripts);
        let styles = document.createElement('link');
        styles.rel='stylesheet';
        styles.href='dist/plugin/index.min.css';
        document.body.appendChild(styles);
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