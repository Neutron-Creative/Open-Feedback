(function() {
    let widget_container = document.createElement('div');

    callAjax('dist/plugin/index.html', function(response) {
        // Add widget HTML to new element
        widget_container.innerHTML = response;
        // Add identifier to widget
        widget_container.id='sl-of-widget-container';
        // If in development mode, open widget by default. Else, leave closed.
        if(window.OPEN_FEEDBACK_CONFIG.development) {
            widget_container.style.display='flex';
        } else {
            widget_container.style.display='none';
        }
        // Style widget
        widget_container.style.alignItems='center';
        widget_container.style.justifyContent='center';
        widget_container.style.width='100vw';
        widget_container.style.height='100vh';
        widget_container.style.backgroundColor='rgba(0,0,0,.5)';
        widget_container.style.backdropFilter='blur(4px)';
        widget_container.style.position='absolute';
        widget_container.style.zIndex=99999;
        widget_container.style.top='0';
        widget_container.style.bottom='0';
        widget_container.style.right='0';
        widget_container.style.left='0';
        // Add widget to page
        document.body.appendChild(widget_container);
        // Add script to page
        let scripts = document.createElement('script');
        scripts.src='dist/plugin/index.min.js';
        document.body.appendChild(scripts);
        // Add styles to page
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