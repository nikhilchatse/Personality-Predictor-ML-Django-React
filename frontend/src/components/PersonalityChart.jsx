import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// 1. Register the Chart.js modules we need
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const PersonalityChart = ({ scores }) => {
    // 2. Prepare the data for the chart
    // We expect 'scores' to be an object: { openness: 3.5, conscientiousness: 4.2 ... }
    const data = {
        labels: ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'],
        datasets: [
            {
                label: 'Personality Profile',
                data: [
                    scores.openness,
                    scores.conscientiousness,
                    scores.extraversion,
                    scores.agreeableness,
                    scores.neuroticism,
                ],
                backgroundColor: 'rgba(34, 202, 236, 0.2)', // Light Blue Fill
                borderColor: 'rgba(34, 202, 236, 1)',       // Blue Border
                borderWidth: 2,
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: { display: false },
                suggestedMin: 0,
                suggestedMax: 5, // Because our scale is 1-5
            },
        },
    };

    return <Radar data={data} options={options} />;
};

export default PersonalityChart;