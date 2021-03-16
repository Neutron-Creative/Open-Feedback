(async function() {
    const open = require('open');

    let session = await open('http://localhost:8080');

    console.log('Open Feedback: Development environment opened in browser ✅');
})();