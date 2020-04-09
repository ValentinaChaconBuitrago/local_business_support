import React, {useState, useRef} from "react";
import PropTypes from "prop-types";

const Answers = props =>{
	//Todos los hooks se declaran al inicio de la funcion
	const [votes, setVotes]= useState(0);
	const formRef = useRef();


	const renderAnswers = () => props.answers.map(a => (
		<div key={"answer" + props.question + a.answer} className="form-check">
			<label className="form-check-label">
	  			<input
	  			className="form-check-input"
	  			type="radio"
	  			name="answer"
	  			value={a.answer}
	  			required={true}
	  			/>
	  			<span>
				{a.answer} : {a.votes} {votes}
	  			</span>

  			</label>
		</div>
	));


	const onVote = evt =>{
		//Con el prevent default se evita que la pagina se re-renderice que es el comportamiento normal de un formulario
		evt.preventDefault();

		//Se crea a partir del formulario
		const formData = new FormData(formRef.current);
		//answer es el campo name en el input de renderAnswers
		const answer = formData.get("answer");
		props.onVote(props.question, answer);

		//setVotes(prevV => prevV+1);
	};


	return(
		<div className="Answers">
			<form ref={formRef} onSubmit={onVote}>
				{renderAnswers()}
				<button type="submit" className="btn btn-primary">Vote</button>
			</form>
		</div>
	);
};


Answers.propTypes = {
	answers: PropTypes.array.isRequired,
	question: PropTypes.string.isRequired,
	onVote: PropTypes.func.isRequired
};

export default Answers;



