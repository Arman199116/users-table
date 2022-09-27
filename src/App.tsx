import React from 'react';
import './App.css';
import UsersTable from './components/UsersTable';
import CurrentUser from './components/CurrentUser';

function App() {

	return (
		<div className="App">
			
			<UsersTable />
			<CurrentUser />
		</div>
	);
}

export default App;
