import { Link } from 'react-router-dom';
import './About.styles.scss';

function About () {
	return (
		<div>
			<p>
				I started this FocusFit timer app because I've found that it's
				helpful to have a set amount of time to sit and work on a problem, 
				and while there have been plenty of timers or apps available for such
				a problem, even the timers or stopwatch on your phone clock app,
				I never found one that allowed me to set the study time and a dedicated
				break time. Because when you have just one timer, when it goes off, you lose
				focus and momentum, and especially if it's on your phone, you may wander off
				more than intended. So, I decided to make a pomodoro-based timer app myself.
				If you want to know more about pomodoro and what it's all about check out the
				<Link className="link" to="/origins"> Origins</Link> page

			</p>
		</div>
	);
}

export default About;