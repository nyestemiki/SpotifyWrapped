import React, { Component } from 'react';
import AppStyle, { Main } from './styles/AppStyles';

export default class App extends Component {
	state = {
		scale: 1
	}

	handleScroll = event => {
		const scaleDepth = 1.45;
		const scaleSize = event.deltaY > 0 ? scaleDepth : 1/scaleDepth;

		this.setState({scale: this.state.scale*scaleSize});
	}

	componentDidMount() {
		document.addEventListener("wheel", this.handleScroll);
	}

  	render() {
		return (
			<AppStyle>
				<Main scale={this.state.scale}>Winter</Main>
			</AppStyle>
		);
  	}
}
