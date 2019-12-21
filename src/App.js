import React, { Component } from 'react';
import AppStyle, { Main } from './styles/AppStyles';
import Curtains from './Curtains';

export default class App extends Component {
	state = {
		scale: 1,
		scaleDepth: 1.5,
		numberScales: 0,
		curtains: false,
		page: 1
	}

	handleScroll = event => {		
		event.deltaY > 0 ? this.scrollUp() : this.scrollDown();
	}

	scrollUp = () => {
		this.setState({ numberScales: this.state.numberScales + 1 });

		this.state.numberScales === 1 ? this.inAndOut() : this.allIn();
	}

	scrollDown = () => {
		this.setState({ 
			scale: 1,
			numberScales: 0
		});
	}

	inAndOut = () => {
		this.setState({ scale: this.state.scale*this.state.scaleDepth });

		document.addEventListener("transitionend", () => {
			if (this.state.numberScales === 1) {
				this.setState({ 
					scale: 1,
					numberScales: 0
				});
			}
		});
	}

	allIn = () => {
		// zoom all the way in
		this.setState({ scale: 35 });
		// draw the curtains
		document.addEventListener("transitionend", () => {
			this.setState({ curtains: true });
			// reset Main 
			this.setState({ 
				scale: 1,
				numberScales: 0,
			});
			document.addEventListener("transitionend", () => {
				// update the assets
				const main_title = document.getElementById("main_title");
				main_title.innerHTML = "Spring";
				// take down the curtains
				this.setState({ curtains: false });
				// fire the animation
				main_title.classList.add("main_title_animation");
				main_title.addEventListener("animationend", () => {
					main_title.classList.remove("main_title_animation");
				});
			});
		});
	}

	componentDidMount() {
		document.addEventListener("wheel", this.handleScroll);
	}

  	render() {
		return (
			<AppStyle>
				<Main scale={this.state.scale}>
					<div id="main_title"> Winter </div>
				</Main>
				<Curtains status={this.state.curtains}/>
			</AppStyle>
		);
  	}
}
