import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {grabAudioFileByID} from '../../actions/AudioActions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome/index.es';

class Player extends Component {
	constructor() {
		super();
		this.state = {audioSrc: null, isPlaying: false, isSaving: false, isError: false};
		this.onItemClicked = this.onItemClicked.bind(this);
		this.onSaveClicked = this.onSaveClicked.bind(this);
		this.togglePlay = this.togglePlay.bind(this);
		this.onEnded = this.onEnded.bind(this);
	}

	componentWillMount() {
		if (this.props.audioSrc) {
			this.setState({audioSrc: this.props.audioSrc});
		}
	}

	onItemClicked() {
		if (this.state.audioSrc) {
			this.togglePlay();
			return;
		}
		grabAudioFileByID(this.props.audioID).then((result) => {
			let blob = new Blob([result.value], {'type': 'audio/ogg; codecs=opus'});
			this.setState({audioSrc: window.URL.createObjectURL(blob), isPlaying: !this.state.isPlaying});
		}).catch((err) => {
			console.log(err);
			this.setState({isError: true});
		});
	}

	onSaveClicked() {
		if (this.state.isSaving) {
			return;
		}
		this.setState({isSaving: true});
		if (this.props.onSaveClicked) {
			this.props.onSaveClicked();
		}
		else {
			console.log('No save callback.');
		}
	}

	togglePlay() {
		this.setState({isPlaying: !this.state.isPlaying});
	}

	onEnded() {
		this.setState({isPlaying: false});
	}

	render() {
		let boxStyle = {
			boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
			borderRadius: '10px',
			maxWidth: '400px',
			minWidth: '200px',
			padding: '10px',
			margin: '10px',
			backgroundColor: 'whitesmoke',
			display: 'flex',
			justifyContent: 'space-between',
		};

		if (this.state.isError) {
			return <div style={boxStyle}><h3 style={{color: 'red'}}> Failed to load file.</h3></div>;
		}

		return (
			<div style={boxStyle}>
				<div style={{cursor: 'pointer'}} onClick={this.onItemClicked}>
					<h3>
						<FontAwesomeIcon
							icon={this.state.isPlaying ? 'pause' : 'play'}/>
					</h3>
				</div>
				{this.props.isTempRecording ?
					<div onClick={this.onSaveClicked} style={{cursor: 'pointer', marginLeft: 5}}>
						<h3><FontAwesomeIcon
							icon={this.state.isSaving ? 'spinner' : 'cloud'}/> {this.state.isSaving ? 'Saving' : 'Save'}
						</h3>
					</div>
					: <div>
						<h3>{this.props.name}</h3>
					</div>}
				{this.state.audioSrc && this.state.isPlaying &&
				 <audio src={this.state.audioSrc} autoPlay={true} onEnded={this.onEnded}/>
				}
			</div>
		);
	}
}

Player.defaultProps = {
	isTempRecording: false,
	audioID: null,
	audioSrc: null,
	onSaveClicked: null
};

Player.propTypes = {
	audioID: PropTypes.string,
	audioSrc: PropTypes.string,
	isTempRecording: PropTypes.bool,
	onSaveClicked: PropTypes.func,
	name: PropTypes.string
};

export default Player;
