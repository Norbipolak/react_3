import './App.css';
import TodoList from './components/TodoList';

/*
const arr = [1,2,3,4,5,6,7,8,9,10];
const arr2 = [...arr, 11];
console.log(arr2);

function spread(...elements) {
	console.log(elements);
}

spread(1,2,4,5,6,7,8,9,10,54,324)
*/ 

function App() {
	return(
		<div>
			<TodoList/>
		</div>
	);
}

export default App;
