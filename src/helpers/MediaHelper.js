export default class MediaHelper {

	static mediaRecorder;

	static initMediaRecorder(onDataAvailable) {
		return navigator.mediaDevices.getUserMedia({
			audio: true
		}).then((stream) => {
			this.mediaRecorder = new MediaRecorder(stream);
			this.mediaRecorder.addEventListener('dataavailable', (e) => {
				onDataAvailable(e.data);
			});
		});
	}

	static isMediaRecorderReady() {
		return this.mediaRecorder !== undefined && this.mediaRecorder !== null;
	}

	static start() {
		if (this.isMediaRecorderReady() && this.mediaRecorder.state === 'inactive') {
			this.mediaRecorder.start();
		}
		else {
			console.log("MediaRecorder is not ready to start.");
		}
	}

	static stop() {
		if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
			this.mediaRecorder.stop();
		}
		else {
			console.log("MediaRecorder is not ready to stop.");
		}
	}
}
