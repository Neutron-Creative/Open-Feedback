# Open Feedback
The open-source feedback collection tool for your website or web-app.

<p>
    <a href="https://github.com/Neutron-Creative/Singlelink/projects/1">
        <img src="https://img.shields.io/badge/Work%20In%20Progress-0.8.0-%2303d2d4" alt="Version">
    </a>
    <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">
        <img src="https://img.shields.io/badge/License-LGPL-%236ab04c" alt="License"/>
    </a>
    <a href="https://twitter.com/neutroncreative">
		<img alt="Twitter Follow" height=20 src="https://img.shields.io/twitter/follow/neutroncreative?color=%2300acee&label=Follow%20us%20on%20Twitter&style=plastic">
	</a
	<a href="https://discord.gg/BUbmgV4">
		<img src="https://img.shields.io/discord/739822478276165675?color=%237289da&label=Join%20our%20community%20on%20Discord"/>
	</a>
</p>
<img src="assets/Open-Feedback Github Banner.png">
<h2>About</h2>
<a href="https://github.com/Neutron-Creative/Open-Feedback">Open Feedback</a> is a free & open-source alternative to <a href="https://feedback.fish">Feedback Fish</a> by the team at <a href="https://singlelink.co">singlelink.co</a>. <a href="https://github.com/Neutron-Creative/Open-Feedback">Open Feedback</a> is 100% self-hosted & unmaintained, <b>so please use at your own risk.</b> Built for internal use for <a href="https://singlelink.co">singlelink.co</a>, <a href="https://github.com/Neutron-Creative/Open-Feedback">Open Feedback</a> attempts to replicate <a href="https://feedback.fish">Feedback Fish</a> as affordably as possibly by relying on free & affordable APIs such as Discord & any S3-compatible file store to handle the backend.
<br>
<h2>Installation</h2>
Add the following code snippet to your desired application somewhere where it will be rendered on all of your desired pages (ex: your page layout file or template). <b>Please ensure to change the config variables as well!</b><br><br>

```html
<script>
  window.OPEN_FEEDBACK_CONFIG = {
    "discord": "<your-discord-webhook-here>",
  }
</script>
<script src="https://cdn.jsdelivr.net/gh/Neutron-Creative/Open-Feedback/dist/index.js"></script>
```

<h2>Development</h2>
To spin up a development environment for Open Feedback, follow the script below and it will automatically create a build from your source-code, spin up a new web-server with an embed to your latest build to test in tmux, and begin watching your files for any changes (to reinitialize the build).<br><br>

```bash
npm config set -g production false && npm i && npm run dev
```

<h2>Related</h2>

<a href="https://github.com/Neutron-Creative/Open-Feedback">Open Feedback</a> is a free & open-source alternative to <a href="https://feedback.fish">Feedback Fish</a> by the team at <a href="https://singlelink.co">singlelink.co</a>. <a href="https://github.com/Neutron-Creative/Open-Feedback">Open Feedback</a> is 100% self-hosted & unmaintained, <b>so please use at your own risk.</b>

Want to support our open-source development efforts? <a href="https://discord.com/invite/3pBM4Px">Join our Discord</a> and <a href="https://singlelink.co">create a free Singlelink</a>.