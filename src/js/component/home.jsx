import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [task, setTask] = useState([]);
	const [loading, setLoading] = useState(false);

	const getTask = async () => {
		try {
			let response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/jhont"
			);
			console.log(response.ok); // will be true if the response is successfull
			console.log(response.status); // the status code = 200 or code = 400 etc.
			let responseObject = await response.json();
			setTask(responseObject);
		} catch (error) {
			console.log(error);
		}
	};

	const updateTask = async (newTask) => {
		setLoading(true);
		try {
			let response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/jhont",
				{
					method: "PUT",
					body: JSON.stringify(newTask),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.ok) {
				getTask(newTask);
				setLoading(false);
			} // will be true if the response is successfull
			console.log(response.status); // the status code = 200 or code = 400 etc.
			//await console.log(response.json());
			//getTask();
		} catch (error) {
			console.log(error);
		}
	};

	// Leo el input, valido que no este vacio y lo guardo en la lista de tareas
	const addTodos = () => {
		if (inputValue === "") alert("The input cannot be empty");
		else {
			const newTask = [...task, { label: inputValue, done: false }];
			updateTask(newTask);
			setInputValue("");
		}
	};

	// Busco el index del elemento de la lista y lo elimino, esta funcion se activa al usar el boton
	const eliminarInput = (indexBorrar) => {
		const newTask = task.filter((item, index) => index !== indexBorrar);
		updateTask(newTask);
	};

	useEffect(() => {
		getTask();
	}, []);

	// return donde se imprime la pagina
	return (
		<div>
			<h2 className="d-flex justify-content-center text-center">
				My To-Do List
			</h2>
			<div className="d-flex justify-content-center">
				<input
					type="text"
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Ingrese una nueva tarea"
					value={inputValue}
				/>
				<button className="btn btn-outline-primary" onClick={addTodos}>
					{loading ? (
						<>
							<span
								class="spinner-border spinner-border-sm"
								role="status"
								aria-hidden="true"></span>
							Cargando ...
						</>
					) : (
						"Añadir"
					)}
				</button>
			</div>

			<br />
			<div className="text-center">
				<ul className="list-group">
					{task.map((item, index) => (
						<li key={index} className="list-group-item">
							{item.label}
							<button
								className="btn"
								onClick={() => eliminarInput(index)}>
								<i className="fas fa-minus-circle"></i>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Home;
