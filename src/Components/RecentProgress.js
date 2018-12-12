import React, { Component } from 'react';
import { toHoursMinutes } from '../Utils'

class RecentProgress extends Component {

	render() {

		let progressTracking = JSON.parse(window.localStorage.getItem("progressTracking"))
		let workToday = progressTracking.workToday
		let workYesterday = progressTracking.workYesterday
		let currentDate = progressTracking.currentDate
		let lastDate = progressTracking.lastDate


		workToday = workToday/3600
		workYesterday = workYesterday/3600

		let [hours, minutes] = toHoursMinutes(workYesterday)

		let studiedMessage = ''

		if (hours == 0 && minutes == 0)
			lastDate = `Vi har inte kunnat spara några framsteg, dags att börja plugga`

		if (hours != 0)
			studiedMessage += `Du jobbade ${hours} h`

		if (minutes != 0 && hours != 0)
			studiedMessage += `och ${minutes} min`

		if(minutes != 0 && hours == 0)
			studiedMessage += `Du jobbade ${minutes} min`

		let [hours_today, minutes_today] = toHoursMinutes(workToday)

		let studiedToday = ''

		if (hours_today == 0 && minutes_today == 0)
			studiedToday += '0 min'

		if (hours_today != 0)
			studiedToday += `${hours_today} h`

		if (minutes_today != 0)
			studiedToday += `${minutes_today} min`




		return(
			<div className="list progress">
				<h2>SENASTE FRAMSTEG</h2>

				<div>
					<p>{studiedMessage} {lastDate}.</p>
					<p>Idag har du jobbat {studiedToday}.</p>
				</div>

			</div>
		)
	}
}

export default RecentProgress