import { Link } from 'react-router-dom';
import './About.styles.css';

function About () {
	return (
		<div>
		    <h1>About</h1>
		    <h2>Why FocusFit?</h2>
			<p>
				I started this FocusFit timer app because I have never been able to find a timer that
				had the customization I needed to set sequential timers of variable length. The reason I was looking
				for such a timer was to utilize the
				pomodoro technique. So, I decided to make a pomodoro-based timer app myself.
				If you want to know more about pomodoro and what it's all about check out the
				<Link className="link" to="/origins"> Origins</Link> page
			</p>
			<span/>
			<p>
				Similarly, I never found a tabata timer that had the customization I would like
				for doing HIIT, or High Intensity Interval Training. This way I've set it up so that
					you could have a custom timer that you can set for a prescribed number of rounds
				of work and rest time, and it will alert you so you can just focus on your training until
				all the rounds are complete! More on tabata on the <Link className="link" to="/origins"> 
				Origins</Link> page.
			</p>
		</div>
	);
}

export default About;