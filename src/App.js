import React, { Component } from 'react';
import './App.css';

let createReactClass = require('create-react-class');

let items = [];
let totalSteps;
const maxSteps= 64;
let marioMoves;

function Home(props) {
	return (
		<div>
			<h2>Mario Maze Board Game</h2>
		</div>
	)}

let Cell = createReactClass({
	getInitialState: function() {
		return {selected: false}
	},
	render: function() {
		return (
		<div className={this.state.selected?"cell active":"cell"}
			id={this.props.id}>
		</div>
	)}
})

function checkFinish() {
	if(totalSteps === maxSteps){
		let confirm = window.confirm("Mario has completed 64 moves. Do you want to play again?");
		if (confirm === true){
			window.location.reload();
		}
	}
	let check = document.getElementsByClassName('active');
	if(check.length === 0){
		let game_complete = window.confirm("Congrats! You have completed the game within "+ totalSteps + " moves.");
		if (game_complete === true){
			window.location.reload();
		}
	}
}
/* Function for Square Board */
let Square = createReactClass({
	getInitialState: function() {
		/* Build the cells in an array form */
		let c = []  
		for(let i=1; i<=this.props.matrix; i++){ 
			c.push( <Cell key={i} id={i} cells={c} /> )
			items.push(i)
		}
		return {cells: c} 
	},
	render: function() {
		return (
		  <div> { this.state.cells } </div>
		)    
	}
})

/* Randomize array element order in-place */
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

function movement(event){
	/* Event keycode for moving left horizontally */
	if (event.keyCode === 37){
		let mario = document.getElementsByClassName('mario');
		let marioid = mario[0].id;
		let move = document.getElementById(marioid-1);
		if(move != null){
			if(move.classList.contains('active')){
				move.classList.toggle('active');
			}
			move.innerHTML = document.getElementById(marioid).innerHTML;
			document.getElementById(marioid).innerHTML = "";
			document.getElementById(marioid).classList.toggle('mario');
			move.classList.toggle('mario');
			marioid = marioid-1;
			}else{
				totalSteps = totalSteps-1;
			}
	}
	/* Event keycode for moving up vertically */
	if (event.keyCode === 38){
		let mario = document.getElementsByClassName('mario')
		let marioid = mario[0].id;
		let move_up = parseInt(marioid,10) - parseInt(marioMoves,10);
		let move = document.getElementById(move_up);
		if(move != null){
			if(move.classList.contains('active')){
				move.classList.toggle('active');
			}
			move.innerHTML = document.getElementById(marioid).innerHTML;
			document.getElementById(marioid).innerHTML = "";
			document.getElementById(marioid).classList.toggle('mario');
			move.classList.toggle('mario');
			marioid = marioid-marioMoves;
			}else{
				totalSteps = totalSteps-1;
			}
	}
	/* Event keycode for moving right horizontally */
	if (event.keyCode ===39){
		let mario = document.getElementsByClassName('mario');
		let marioid = mario[0].id;
		let move_right = parseInt(marioid,10) + 1;
		let move = document.getElementById(move_right);
		if(move != null){
			if(move.classList.contains('active')){
				move.classList.toggle('active');
			}
			move.innerHTML = document.getElementById(marioid).innerHTML;
			document.getElementById(marioid).innerHTML = "";
			document.getElementById(marioid).classList.toggle('mario');
			move.classList.toggle('mario');
			marioid = marioid+1
			}else{
				totalSteps = totalSteps-1;
			}
	}
	/* Event keycode for moving down vertically */
	if (event.keyCode === 40){
		let mario = document.getElementsByClassName('mario');
		let marioid = mario[0].id;
		let move_up = parseInt(marioid,10) + parseInt(marioMoves,10);
		let move = document.getElementById(move_up);
		if(move != null){
			if(move.classList.contains('active')){
				move.classList.toggle('active');
			}
			move.innerHTML = document.getElementById(marioid).innerHTML;
			document.getElementById(marioid).innerHTML = "";
			document.getElementById(marioid).classList.toggle('mario');
			move.classList.toggle('mario');
			marioid = marioid + marioMoves;
			}else{
				totalSteps = totalSteps-1;
			}
	    }
	}

/* Generate the game functions */
class App extends Component {
 	constructor(props){
		super(props);
		let width = prompt("Please enter the board width: ");
		let height = prompt("Please enter the board height: ");
		if(height == null || width == null || isNaN(width) === true || isNaN(height) === true){
			height = 10;
			width = 10;
		}
		let matrix_size = height * width;
		marioMoves = width;
		this.state = {
			matrix_size:matrix_size,
			width:width,
			height:height
		}
	}
	componentDidMount() {
		window.addEventListener('load', this.handleLoad(this.state.width,this.state.height));
	}

	handleLoad(width,height){
		let matrix = document.getElementById('root');
		matrix.style.height = 40 * height + "px";
		matrix.style.width = 40 * width + "px";
		let shuffled_data = shuffleArray(items);
		let truncated_data = shuffled_data.slice(0,parseInt(this.state.matrix_size/10,10));

		for (let i = 0; i < truncated_data.length; i++) {
			let elem_position = document.getElementById(truncated_data[i])
			elem_position.innerHTML="<img src='mario-mashroom.jpeg' alt='mario' class='maze-image'/>";
			elem_position.classList.toggle('active')
		}

		let unique_data = shuffled_data.filter(function(obj) { return truncated_data.indexOf(obj) === -1; });
		let item = unique_data[Math.floor(Math.random()*unique_data.length)];
		let marioposition=document.getElementById(item);
		marioposition.classList.toggle('mario')
		marioposition.innerHTML="<img src='mario-icon.png' alt='mario' class='maze-image'/>";
	}
	
	onKeyPress(event){
		if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
			if (totalSteps === undefined){
			  	totalSteps = 0
			}
			totalSteps = totalSteps+1;
		}
		movement(event); 
		checkFinish();
	}

	componentWillMount() {
		document.addEventListener("keydown", this.onKeyPress);
	}
	render() {
		return (
			<div className="App">
				<Home/>
				<Square matrix={this.state.matrix_size}/>
		    </div>
		);
	}
}

export default App;
