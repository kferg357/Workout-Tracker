API.getWorkoutsInRange()

function generatePalette() {
  const arr = [
    "#003f5c",
    "2f4b7c",
    "665191",
    "a05195",
    "d45087",
    "f95d6a",
    "ff7c43",
    "ffa600",
    "003f5c",
    "2f4b7c",
    "665191",
    "a05195",
    "d45087",
    "f95d6a",
    "ff7c43",
    "ffa600"
  ]
  return arr;
}

function calculateTotalWeight(data) {
  const totals = [];

  data.forEach((workout) => {
    const workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
      if (type === 'resistance') {
        return total + weight;
      }
      return total;
    }, 0);

    totals.push(workoutTotal);
  });

  return totals;
}

function populateChart(data) {

  const durations = duration(data);
  const pounds = calculateTotalWeight(data);
  
  let line = document.querySelector('#canvas').getContext('2d');
  let bar = document.querySelector('#canvas2').getContext('2d');


  let labels = data.map(({ day }) => {
    const date = new Date(day);
    //  Use JavaScript's `Intl` object to help format dates
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  });

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      datasets: [
        {
          label: 'Workout Duration In Minutes',
          backgroundColor: 'red',
          borderColor: 'red',
          data: durations,
          fill: false
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Time Spent Working Out (Last 7 days)',
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          label: 'Pounds',
          data: pounds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Pounds Lifted (Last 7 days)',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  
}

function duration(data) {
  let durations = [0, 0, 0, 0, 0, 0, 0];

  data.forEach(workout => {
    let day = new Date(workout.day)
    let dayIndex = day.getDay();
    workout.exercises.forEach(exercise => {
      let newDuration = durations[dayIndex] + exercise.duration
      durations.splice(dayIndex, 1, newDuration);
    });
  });
  return durations;
}

function durationByWorkout(data) {
  let durations = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      durations.push(exercise.duration);
    });
  });
  return durations;
};

function weightByWorkout(data) {
  let total = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      total.push(exercise.weight);
    });
  });
  return total;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      workouts.push(exercise.name);
    });
  });
  return workouts;
}

// get all workout data from back-end
API.getWorkoutsInRange().then((data) => populateChart(data));





