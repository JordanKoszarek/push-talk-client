const serviceUrl = 'http://localhost:8080';

export function uploadAudioFile(data) {
	return fetch(serviceUrl + '/audio/upload', {
		method: 'POST',
		headers: {
			"Access-Control-Allow-Origin": "*"
		},
		body: data
	});
}

export function grabAudioFileIDs() {
	return fetch(serviceUrl + '/audio/all', {
		method: "GET",
		headers: {
			"Content-Type": "application/json;charset=UTF-8",
			"Access-Control-Allow-Origin": "*"
		}
	}).then((result) => {
		if (result.status === 200) {
			return result.json();
		}
	}).catch(err =>{
		console.log("No audio files recorded.");
	});
}

export function grabAudioFileByID(audioID) {
	return fetch(serviceUrl + '/audio/getaudio?id=' + audioID, {
		method: "GET",
		headers: {
			"Access-Control-Allow-Origin": "*"
		},
	}).then((result) => {
		return result.body.getReader().read();
	}).catch((err) => {
		console.log('Failed to fetch audio file');
		return err;
	});
}
