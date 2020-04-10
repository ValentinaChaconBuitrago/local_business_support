import React, {useState,useEffect} from "react";
import Piecito from "./layout/Footer.js";
import Questions from "./components/Questions.js";
import Login from "./components/Login.js";
import FormCreateQuestion from "./components/FormCreateQuestion.js";

const App = () => {
	const [questions, setQuestions] = useState([
		{
			question: "Dummy?",
			answers: [
				{
					answer: "You are the dummy",
					votes: 10,
				},
				{
					answer: "I'm dummy",
					votes: 2,
				},
			],
		},
		{
			question: "All Dummy?",
			answers: [
				{
					answer: "We are the dummy",
					votes: 11,
				},
				{
					answer: "We are not the dummy",
					votes: 21,
				},
			],
		},
	]);

	const [user, setUser] = useState(null);
	//TODO: revisar como manejar el error en el fetch
	useEffect(() => {
		console.log("getUser");
		fetch("/getUser")
			.then((res) => res.json())
			.then((user) => setUser(user));
	},[]);

	const onVote = (question, answer) => {
		setQuestions((prevQuestions) => {
			const newQuestions = [...prevQuestions];

			const qObj = newQuestions.find((q) => q.question === question);
			const newAnswers = qObj.answers.map((a) =>
				a.answer === answer ? { answer: a.answer, votes: a.votes + 1 } : a
			);
			qObj.answers = newAnswers;

			return newQuestions;
		});
	};

	const onLogout = () =>{
		fetch("/logout")
		.then(() => setUser(null));
	};

	return (
		<div>
			<div className="container">
				<h2>Questionator!</h2>
				{!user ? <Login></Login> : <div>Welcome {user.username} <button onClick={onLogout}>Logout</button></div>}

				{/* -- START ROW -- */}
				<div className="row">
					<div className="col-8">
						Aqui van las preguntas
						<Questions questions={questions} onVote={onVote}></Questions>
					</div>
					<div className="col-4">
						Aqui se crea una pregunta
						<FormCreateQuestion></FormCreateQuestion>
					</div>
				</div>

				{/* -- END ROW -- */}
			</div>

			{/* -- START FOOTER -- */}
			<Piecito></Piecito>
			{/* -- END FOOTER -- */}
		</div>
	);
};

export default App;
