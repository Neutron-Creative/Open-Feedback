# Open Feedback
The open-source feedback collection tool for your website or web-app.

<p>
    <a href="https://github.com/Neutron-Creative/Singlelink/projects/1">
        <img src="https://img.shields.io/badge/Work%20In%20Progress-0.1.0-%2303d2d4" alt="Version">
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
Installing <a href="https://github.com/Neutron-Creative/Open-Feedback">Open Feedback</a> is simple and takes just seconds. Add the following code snippet to your desired application somewhere where it will be rendered on all of your desired pages (ex: your page layout file or template). <b>Please ensure to change the config variables as well!</b>

```html
<script>
  window.OPEN_FEEDBACK_CONFIG = {
    "discord_webhook_url": "<your-discord-webhook-here>",
    "s3_auth": "<your-s3-authentication-string-here>"
  }
</script>
<script src="https://cdn.jsdelivr.net/gh/Neutron-Creative/Open-Feedback/dist/index.js"></script>
```

<h2>Related</h2>

> Coming soon