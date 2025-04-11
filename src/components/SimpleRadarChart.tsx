'use client';

import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const data = {
  labels: ['React', 'Next.js', 'TypeScript', 'Firebase', 'Go'],
  datasets: [
    {
      label: '自分のスキル習熟度',
      data: [4, 3, 4, 2, 1], // 1〜5段階など自由に
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    r: {
      beginAtZero: true,
      max: 5,
    },
  },
};

export default function SimpleRadarChart() {
  return (
    <div style={{ width: '400px', height: '400px' }}>
      <h2>スキル習熟度レーダーチャート</h2>
      <Radar data={data} options={options} />
    </div>
  );
}
