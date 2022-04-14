import { PersonForm } from './components/PersonForm';
import { PersonList } from './components/PersonList';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [list, setList] = useState([]);

	const fetchData = () => {
		axios.get('http://localhost:8089/persona/listAll').then(res => {
			console.log(res);
			let data = res.data;
			const newData = data.map(person => {
				return { ...person, hiringDate: person.hiringDate.split('T')[0] };
			});
			setList(newData);
		});
	};

	useEffect(fetchData, []);

	const addPerson = person => {
		axios
			.post('http://localhost:8089/persona/save', person)
			.catch(err => console.log(err))
			.then(res => {
				console.log(res);
				fetchData();
			});
	};

	return (
		<div>
			<div className='mx-auto my-2 p-2 rounded-lg w-fit border-2'>
				<PersonForm onSubmit={addPerson} />
			</div>
			
			<PersonList list={list} updateList={fetchData} />
		</div>
	);
}

export default App;
