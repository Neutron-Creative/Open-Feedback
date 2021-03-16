(async function() {
	let bug = document.getElementById('sl-of-bug');
	let idea = document.getElementById('sl-of-idea');
	let help = document.getElementById('sl-of-help');
	let back = document.getElementById('sl-of-back');
	let title = document.getElementById('sl-of-id');
	let content = document.getElementById('sl-of-content');
	let form = document.getElementById('sl-of-form');
	let submit = document.getElementById('sl-of-submit');
	let screenshot = document.getElementById('sl-of-screenshot');
	let textarea = document.getElementById('sl-of-textarea');
	let confirmation = document.getElementById('sl-of-confirmation');
	let warning = document.getElementById('sl-of-warning');
	let widget = document.getElementById('sl-of-widget');
	let x = document.getElementById('sl-of-x');
	let destination, destinationEmoj;
	let discord = 'https://discord.com/api/webhooks/' + window.OPEN_FEEDBACK_CONFIG.discord || null;
	
	bug.addEventListener('click', goto);
	idea.addEventListener('click', goto);
	help.addEventListener('click', goto);
	back.addEventListener('click', goBack);
	submit.addEventListener('click', submitForm);
	screenshot.addEventListener('click', takeScreenshotJpegBlob);
	x.addEventListener('click', closeFeedbackPrompt);
	
	function goto(e) {
		console.log('Event');
		console.log(e);
		switch(e.target.id) {
			case 'sl-of-bug':
				title.innerText = 'Report an issue';
				destinationEmoji = ':bug:';
				destination = 'Bug report';
				break;
			case 'sl-of-idea':
				title.innerText = 'Make a suggestion';
				destinationEmoji = ':bulb:';
				destination = 'Suggestion';
				break;
			case 'sl-of-help':
				title.innerText = 'How can we help you?';
				destinationEmoji = ':question:';
				destination = 'Support request';
				break;
			default:
				return;
				break;
		}
		content.style.display='none';
		form.style.display='flex';
		back.style.opacity=1;
	}
	function goBack() {
		form.style.display='none';
		content.style.display='flex';
		back.style.opacity=0;
		title.innerText = 'What\'s on your mind?';
		warning.innerText = '';
		warning.style.display='none';
	}
	function submitForm() {
		// Validate data
		if(!textarea.value) {
			// Activate warning
			warning.innerText = 'A message must be provided to submit!'
			warning.style.display='flex';
			return;
		} else {
			warning.style.display='none'; // Remove warning
		};
		var request = new XMLHttpRequest();
		request.open("POST", discord);

		request.setRequestHeader('Content-type', 'application/json');
		
		 var offset = new Date().getTimezoneOffset();// getting offset to make time in gmt+0 zone (UTC) (for gmt+5 offset comes as -300 minutes)
        var date = new Date();
        date.setMinutes ( date.getMinutes() + offset);// date now in UTC time

        var easternTimeOffset = -240; //for dayLight saving, Eastern time become 4 hours behind UTC thats why its offset is -4x60 = -240 minutes. So when Day light is not active the offset will be -300
        date.setMinutes ( date.getMinutes() + easternTimeOffset);

		var params = {
        	//username: 'OpenFeedback Widget',
			//avatar_url: '',
			content: '\n**New ' + destination + ' from Open Feedback' + destinationEmoji + '**\n```' + 'Sent at: ' + date.toString() + '\n' + destination + ': ' + textarea.value
		};

		if(window.OPEN_FEEDBACK_CONFIG.user) {
			params.content += '\nSent by: ' + window.OPEN_FEEDBACK_CONFIG.user + '```\n';
		} else {
			params.content += '```\n';
		}
		request.send(JSON.stringify(params)); // Send request
		confirmation.innerText = destination + ' sent successfully, you can expect a reply within 24 hours.'; // Set confirmation alert
		confirmation.style.display='flex'; // Display confirmation notice
		form.style.display='none'; // Close form
		back.style.opacity=0; // Set back button to hidden
		setTimeout(function() {
			// Close modal three seconds after submitting
			closeFeedbackPrompt();
		}, 3000);
	}
	function closeFeedbackPrompt() {
		document.getElementById('sl-of-widget-container').style.display = 'none';
	}

	window.closeFeedbackPrompt = function() {
		document.getElementById('sl-of-widget-container').style.display = 'none';
	}

	window.openFeedbackPrompt = function() {
		document.getElementById('sl-of-widget-container').style.display = 'flex';
	}
	
	// docs: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
	// see: https://www.webrtc-experiment.com/Pluginfree-Screen-Sharing/#20893521368186473
	// see: https://github.com/muaz-khan/WebRTC-Experiment/blob/master/Pluginfree-Screen-Sharing/conference.js

	function getDisplayMedia(options) {
		if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
			return navigator.mediaDevices.getDisplayMedia(options)
		}
		if (navigator.getDisplayMedia) {
			return navigator.getDisplayMedia(options)
		}
		if (navigator.webkitGetDisplayMedia) {
			return navigator.webkitGetDisplayMedia(options)
		}
		if (navigator.mozGetDisplayMedia) {
			return navigator.mozGetDisplayMedia(options)
		}
		throw new Error('getDisplayMedia is not defined')
	}
	function getUserMedia(options) {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			return navigator.mediaDevices.getUserMedia(options)
		}
		if (navigator.getUserMedia) {
			return navigator.getUserMedia(options)
		}
		if (navigator.webkitGetUserMedia) {
			return navigator.webkitGetUserMedia(options)
		}
		if (navigator.mozGetUserMedia) {
			return navigator.mozGetUserMedia(options)
		}
		throw new Error('getUserMedia is not defined')
	}
	async function takeScreenshotStream() {
		// see: https://developer.mozilla.org/en-US/docs/Web/API/Window/screen
		const width = screen.width * (window.devicePixelRatio || 1)
		const height = screen.height * (window.devicePixelRatio || 1)

		const errors = []
		let stream
		try {
			stream = await getDisplayMedia({
				audio: false,
				// see: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints/video
				video: {
					width,
					height,
					frameRate: 1,
				},
			})
		} catch (ex) {
			errors.push(ex)
		}

		// for electron js
		if (navigator.userAgent.indexOf('Electron') >= 0) {
			try {
				stream = await getUserMedia({
					audio: false,
					video: {
						mandatory: {
							chromeMediaSource: 'desktop',
							// chromeMediaSourceId: source.id,
							minWidth         : width,
							maxWidth         : width,
							minHeight        : height,
							maxHeight        : height,
						},
					},
				})
			} catch (ex) {
				errors.push(ex)
			}
		}

		if (errors.length) {
			console.debug(...errors)
			if (!stream) {
				throw errors[errors.length - 1]
			}
		}

		return stream
	}
	async function takeScreenshotCanvas() {
		const stream = await takeScreenshotStream()

		// from: https://stackoverflow.com/a/57665309/5221762
		const video = document.createElement('video')
		const result = await new Promise((resolve, reject) => {
			video.onloadedmetadata = () => {
				video.play()
				video.pause()

				// from: https://github.com/kasprownik/electron-screencapture/blob/master/index.js
				const canvas = document.createElement('canvas')
				canvas.width = video.videoWidth
				canvas.height = video.videoHeight
				const context = canvas.getContext('2d')
				// see: https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement
				context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
				resolve(canvas)
			}
			video.srcObject = stream
		})

		stream.getTracks().forEach(function (track) {
			track.stop()
		})

		if (result == null) {
			throw new Error('Cannot take canvas screenshot')
		}

		return result
	}
	// from: https://stackoverflow.com/a/46182044/5221762
	function getJpegBlob(canvas) {
		return new Promise((resolve, reject) => {
			// docs: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
			canvas.toBlob(blob => resolve(blob), 'image/jpeg', 0.95)
		})
	}
	async function getJpegBytes(canvas) {
		const blob = await getJpegBlob(canvas)
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader()

			fileReader.addEventListener('loadend', function () {
				if (this.error) {
					reject(this.error)
					return
				}
				resolve(this.result)
			})

			fileReader.readAsArrayBuffer(blob)
		})
	}
	async function takeScreenshotJpegBlob() {
		const canvas = await takeScreenshotCanvas()
		return getJpegBlob(canvas)
	}
	async function takeScreenshotJpegBytes() {
		const canvas = await takeScreenshotCanvas()
		return getJpegBytes(canvas)
	}
	function blobToCanvas(blob, maxWidth, maxHeight) {
		return new Promise((resolve, reject) => {
			const img = new Image()
			img.onload = function () {
				const canvas = document.createElement('canvas')
				const scale = Math.min(
					1,
					maxWidth ? maxWidth / img.width : 1,
					maxHeight ? maxHeight / img.height : 1,
				)
				canvas.width = img.width * scale
				canvas.height = img.height * scale
				const ctx = canvas.getContext('2d')
				ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
				resolve(canvas)
			}
			img.onerror = () => {
				reject(new Error('Error load blob to Image'))
			}
			img.src = URL.createObjectURL(blob)
		})
	}
})();