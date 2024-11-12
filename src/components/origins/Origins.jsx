import { Link } from 'react-router-dom';

function Origins () {
	return (
		<div>
		  <h1>Origins of:</h1>
		  <span></span>
		  <h2>Pomodoro</h2>
		  <p>
		     The "Pomodoro Technique" is a method for productivity during a task that one
		     is procrastinating to avoid, or is likely to procrastinate to avoid. The method gets 
		     its name from the Italian word "pomodoro", which means tomato, because when it was originally
		     tried, a tomato kitchen timer was used. Its usefulness is in the fact that you set your timer
		     and focus on whatever task it is you want to work on, and do whatever you can do in that time,
		     then take a shorter break. Originally, the focus time was 25 minutes, and the break 5 minutes. After
		     doing a few rounds of this, taking a longer 15 to 30 minute break. If you want to read more about
		     the Pomodoro Technique and the creator, Francesco Cirillo, check out the link below.
		  </p>
		  <Link
		     className="link" 
		     target="blank" 
		     to="https://todoist.com/productivity-methods/pomodoro-technique"> 
		     https://todoist.com/productivity-methods/pomodoro-technique
		     </Link>
		   <span/>
		   <h2>Tabata</h2>
		   <p>
		   	Tabata is a method for intense interval exercise, named after Dr. Izumi Tabata
		   	and is traditionally 20 seconds of maximal-effort exercise with 10 seconds of rest for 8 rounds
		   	comprising a four minute butt-kicking workout. I use the tabata method at times,
		   	but the timer is also great for other forms of interval training that may be slightly less intense.
		   	If If you want to read more about it, check out the link below.
		   </p>
		   <Link
		     className="link"
		     target="blank"
		     to="https://www.solutionhealth.org/the-power-of-tabata-start-your-fitness-journey-with-high-intensity-intervals/"
		    >
		    https://www.solutionhealth.org/the-power-of-tabata-start-your-fitness-journey-with-high-intensity-intervals/
		    </Link>
		</div>
	);
}

export default Origins;