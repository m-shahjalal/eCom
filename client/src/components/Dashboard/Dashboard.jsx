import classes from './Dashboard.module.css';

const Dashboard = () => {
	return (
		<div className={classes.main}>
			<div className={classes.dashboard}>
				<h1 className={classes.mainHead}>Welcome to dashboard</h1>
				<p className={classes.text}>
					A dashboard is a type of graphical user interface which
					often provides at-a-glance views of key performance
					indicators (KPIs) relevant to a particular ...
				</p>
			</div>
		</div>
	);
};

export default Dashboard;
