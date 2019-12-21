import React, { Component } from 'react';
import AppStyle, { Main } from './styles/AppStyles';
import Curtains from './Curtains';
import Pages from '../pages';

export default class App extends Component {
	state = {
		pages: [{
			"title": "Winter",
        	"pivotX": 32.5,
        	"pivotY": 22,
			"backgroundColor": "rgb(200, 255, 100)"
		}],
		scale: 1,
		scaleDepth: 1.5,
		numberScales: 0,
		curtains: false,
		page: 0
	}

	handleScroll = event => {		
		event.deltaY > 0 ? this.scrollUp() : this.scrollDown();
	}

	scrollUp = () => {
		const numberScales = this.state.numberScales;
		this.setState({ numberScales: numberScales + 1 });

		this.state.numberScales === 1 ? this.inAndOut() : this.allIn();
	}

	scrollDown = () => {
		const page = this.state.page;
		this.setState({ 
			scale: 1,
			numberScales: 0,
			page: page > 0 ? page-1 : 0
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
		const main = document.querySelector('#main');

		if (this.state.page >= this.state.pages.length-1) {
			this.setState({ scale: 50 });
			return;
		}

		const currentPage = this.state.page;
		const pages = this.state.pages;

		let transitionsEnabled = true;

		// zoom all the way in
		this.setState({ scale: 15 });
		// draw the curtains
		main.addEventListener("transitionend", () => {
			const main_title = main.querySelector("#main_title");
			main_title.style = "color: " + pages[currentPage+1].backgroundColor;
			this.setState({ scale: 50 });
			main.addEventListener("transitionend", () => {
				this.setState({ curtains: true });				
				// reset Main 
				this.setState({ 
					scale: 1,
					numberScales: 0,
				});
				// update the assets
				main_title.style = "color: black;"
				// take down the curtains
				this.setState({ page: 1 });
				this.setState({ curtains: false });
				// fire the animation
				main.addEventListener("transitionend", () => {
					if (transitionsEnabled) {
						main_title.classList.add("main_title_animation");
						main_title.addEventListener("animationend", () => {
							main_title.classList.remove("main_title_animation");
						});
					}
					transitionsEnabled = false;
				});
			});
		});	

	}
	
	componentDidMount() {
		this.setState({ pages: Pages });
		document.addEventListener("wheel", this.handleScroll);
	}

  	render() {
		return (
			<AppStyle 
				id="app" 
				color={this.state.pages[this.state.page].backgroundColor}
			>
				<Main 
					id="main"
					scale={this.state.scale}
					pivotX={this.state.pages[this.state.page].pivotX}
					pivotY={this.state.pages[this.state.page].pivotY}
				>
					<div id="main_title"> {this.state.pages[this.state.page].title} </div>
				</Main>
				<Curtains 
					status={this.state.curtains}
					color="red"
				/>
			</AppStyle>
		);
  	}
}
