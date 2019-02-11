import React, {Component} from 'react';
import EnvHelper from '../helpers/EnvHelper';

class TopBar extends Component {

	componentWillMount() {
		this.items = [
			{
				name: 'Record',
				key: 'record',
				link: '/record'
			},
			{
				name: 'Playback!',
				key: 'playback',
				link: '/playback'
			}];
		this.setState({selectedKey: this.items[0].key});
		this.onItemClicked = this.onItemClicked.bind(this);
	}

	onItemClicked(itemSelected) {
		this.setState({selectedKey: itemSelected.key});
		EnvHelper.push(itemSelected.link);
	}

	render() {
		let selectedStyle = {borderBottomStyle: 'solid', margin: 7, fontWeight: 'bold', cursor: 'pointer'};
		let normalStyle = {margin: 7, cursor: 'pointer'};
		return (
			<div style={{
				width: '100%',
				boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.1)',
				margin: 'auto'
			}}>
				<div style={{
					margin: 'auto',
					height: '40px',
					display: 'flex',
					alignItems: 'left',
					width: '80%',
				}}>
					{
						this.items.map((item) => {
							return <nav key={item.key} onClick={() => {
								this.onItemClicked(item)
							}}
										style={item.key === this.state.selectedKey ? selectedStyle : normalStyle}>{item.name}
										</nav>;
						})
					}
				</div>
			</div>
		);
	}
}

export default TopBar;
