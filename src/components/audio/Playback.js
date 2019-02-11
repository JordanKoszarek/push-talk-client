import React, {Component} from 'react';
import {grabAudioFileIDs} from '../../actions/AudioActions';
import Player from './Player';

class Playback extends Component {

	constructor() {
		super();
		this.state = {audioObjects: []};
	}

	componentWillMount() {
		grabAudioFileIDs().then((result) => {
			this.setState({audioObjects: result});
		});
	}

	render() {
		return (
			<div>
				<div style={{padding: '10px'}}>
					<h1>Recordings</h1>
				</div>
				<div style={{display: 'flex', flexWrap: 'wrap', margin: 'auto'}}>
					{this.state.audioObjects && this.state.audioObjects.length > 0 &&
					 this.state.audioObjects.map((data, index) => {
						 return <Player key={data} audioID={data} name={'Recording #' + index}/>
					 })
					}
				</div>
			</div>
		);
	}
}

export default Playback;