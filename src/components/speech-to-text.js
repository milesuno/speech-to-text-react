import React, { Component } from "react";
import "./speech-to-text.css";

class SpeechToText extends Component {
	constructor(props) {
		super(props);
		this.state = {
			textContent: [],
		};
	}

	componentDidMount() {
		window.SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;

		const SpeechRecognition = window.SpeechRecognition;

		let speech = new SpeechRecognition();
		speech.interimResults = true;

		speech.addEventListener("result", this.setText);
		speech.addEventListener("end", speech.start);
		speech.start();
	}

	setText = (e) => {
		let transcript = [...e.results[0]]
			.map((result) => result.transcript)
			.join("");

		console.log(transcript);
		let textContent = this.state.textContent;

        if (e.results[0].isFinal) textContent.push(transcript);
        
		this.setState({ textContent });
	};

	render() {
		return (
			<>
				<div class="words" contenteditable>
                    <p style={{"color": "grey"}}>Speech to Text ...</p>
					{this.state.textContent.map((text) => {
						return <p>{text}</p>;
					})}
				</div>
			</>
		);
	}
}

export default SpeechToText;
