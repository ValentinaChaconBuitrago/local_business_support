import React from "react";
import PropTypes from "prop-types";

const FormCreateQuestion = () => (

	<div className = "FormCreateQuestion">
		<form>
			<label  className="form-group">
				<span>Question:</span>
				<input type="text" className="form-control"/>
			</label>
			<button type="submit" className="btn btn-primary">Create</button>
		</form>
	</div>
);

//FormCreateQuestion.propTypes = {};

export default FormCreateQuestion;