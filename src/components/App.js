import React, { Component } from 'react';
import AppStyle, { Main, MainTitle } from './styles/AppStyles';
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
		page: 0,
		rotateX: 0,
		rotateY: 0
	}

	handleMousemove = event => {		
		setInterval(() => {
			const x =  1*(event.clientX-window.innerWidth/2)/10;
			const y = -1*(event.clientY-window.innerHeight/2)/10;

			console.log(event.clientX, x, event.clientY, y);

			this.setState({ rotateX: y });
			this.setState({ rotateY: x });
		}, 300);
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
		this.setState({ scale: 10 });
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
				this.setState({ page: currentPage+1 });
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
		// document.addEventListener("mousemove", this.handleMousemove);
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
					<MainTitle 
						id="main_title"
						rotateX={this.state.rotateX}
						rotateY={this.state.rotateY}
					> 
						{this.state.pages[this.state.page].title}
					</MainTitle>
				</Main>
				<Curtains 
					status={this.state.curtains}
					color="red"
				/>
			</AppStyle>
		);
  	}
}
