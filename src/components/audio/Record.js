import React, {Component} from 'react';
import MediaHelper from '../../helpers/MediaHelper';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome/index.es';
import Player from './Player';
import {uploadAudioFile} from '../../actions/AudioActions';

class Record extends Component {

	constructor() {
		super();
		this.state = {isRecording: false, isRecorderReady: false, audioSrc: null, isSuccess: false, isError: false};
		this.chunks = [];
		this.onPushToRecord = this.onPushToRecord.bind(this);
		this.onMediaAvailable = this.onMediaAvailable.bind(this);
		this.saveAudioFile = this.saveAudioFile.bind(this);
	}

	componentWillMount() {
		MediaHelper.initMediaRecorder(this.onMediaAvailable).then(() => {
			this.setState({isRecorderReady: MediaHelper.isMediaRecorderReady()});
		});
	}

	onMediaAvailable(data) {
		this.chunks.push(data);
		if (this.chunks && this.chunks.length > 0) {
			let blob = new Blob(this.chunks, {'type': 'audio/ogg; codecs=opus'});
			this.setState({audioSrc: window.URL.createObjectURL(blob)});
		}
	}

	saveAudioFile() {
		if (this.chunks) {
			let blob = new Blob(this.chunks, {'type': 'audio/ogg; codecs=opus'});
			let form = new FormData();
			form.append('file', blob, 'audiofile');
			uploadAudioFile(form).then(result => {
				if (result && result.status === 200) {
					this.chunks = [];
					this.setState({audioSrc: null, isSuccess: true});
				}
				else {
					this.setState({isError: true});
				}
			}).catch((err) => {
				this.setState({isError: true});
			});
		}
		else {
			console.log('nothing to save.')
		}
	}

	onPushToRecord() {
		let isRecording = !this.state.isRecording;
		this.chunks = [];
		this.setState({isRecording: isRecording, isSuccess: false, isError: false, audioSrc: null});
		if (!this.state.isRecording) {
			MediaHelper.start();
		}
		else {
			MediaHelper.stop();
		}
	}

	render() {

		if (!this.state.isRecorderReady) {
			return (<div style={{width: '100%', margin: 'auto', textAlign: 'center', paddingTop: '30%'}}>
				<h2>Loading...</h2>
			</div>);
		}

		let icon = <FontAwesomeIcon style={{paddingRight: 10}} icon={'microphone'}/>;
		return (
			<div style={{
				width: '80%',
				marginTop: '20px',
				margin: 'auto',
			}}>
				<div style={{
					backgroundColor: 'whitesmoke',
					boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
					cursor: 'pointer',
					padding: 20,
				}}>
					<div onClick={this.onPushToRecord} style={{color: this.state.isRecording ? 'red' : 'blue'}}>
						<h3>{icon} Click to record!</h3>
					</div>
				</div>
				{this.state.audioSrc &&
				 <Player audioSrc={this.state.audioSrc} isTempRecording={true} onSaveClicked={this.saveAudioFile}/>
				}
				{this.state.isSuccess &&
				 <div style={{color: 'green'}}>
					 <h3>Recording saved!</h3>
				 </div>
				}
				{this.state.isError &&
				 <div style={{color: 'red'}}>
					 <h3>Failed to save recording.</h3>
				 </div>
				}
			</div>
		);
	}
}

export default Record;
