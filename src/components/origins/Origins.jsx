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
		   	and is traditionally 20 seconds of intense exercise with 10 seconds of rest for 8 rounds
		   	comprising a four minute butt-kicking workout. There are a multitude of benefits, and the trade-off
		   	for intensity and a short duration are really convenient, efficient, and continue to burn calories for 
		   		much longer after the exercise than traditional cardio. Now, 20 seconds of giving your all 
		   	and then only 10 seconds of rest, when done properly, can be, well, pretty intense. So, it's totally up to you
		   	how much time and intensity you want to give it, because the timer can be used for any type of interval training. Say,
		   	for instance, you want to do 6 minutes of all out ab training. Set the work timer for 60 seconds and the rest for 30 seconds
		   		for 4 rounds, and ensuring you rest no more than 30 seconds, and I promise this is more difficult and more effective than it sounds.
		   	But the Tabata method is definitely worth a try. If you want to read more about it, check out the link below.
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