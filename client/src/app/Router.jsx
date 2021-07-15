import { BrowserRouter as BRouter, Route, Switch } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';

const Router = () => {
	return (
		<BRouter>
			<Switch>
				<Route path='/' component={HomeScreen} />
			</Switch>
		</BRouter>
	);
};

export default Router;
