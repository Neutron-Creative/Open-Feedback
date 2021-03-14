(async function() {
    const open = require('open');

    let session = await open('dev.html');

    console.log('Open Feedback: Development environment opened in browser ✅');
})();