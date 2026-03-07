import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '@toolkit-pm/design-system/components';
import './SurvivalChart.css';

export default function SurvivalChart({ cohorts }) {
  // Prepare data for chart
  const maxPeriod = Math.max(...cohorts.flatMap(c => c.data?.map(d => d.period) || [0]));

  const chartData = [];
  for (let period = 0; period <= maxPeriod; period++) {
    const dataPoint = { period };
    cohorts.forEach(cohort => {
      const periodData = cohort.data?.find(d => d.period === period);
      if (periodData) {
        const survivalRate = (periodData.survived / periodData.total) * 100;
        dataPoint[cohort.name] = survivalRate.toFixed(1);
      }
    });
    chartData.push(dataPoint);
  }

  return (
    <ChartContainer
      title="Survival Curves"
      isEmpty={cohorts.length === 0}
      emptyMessage="Add cohorts to see the survival curves."
      emptyIcon="📈"
    >
      <p className="section-description">
        Visualize and compare survival rates across cohorts over time.
      </p>
      <div className="survival-chart">
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="period"
              stroke="#666"
              label={{ value: 'Time Period', position: 'insideBottom', offset: -10 }}
            />
            <YAxis
              stroke="#666"
              label={{ value: 'Survival Rate (%)', angle: -90, position: 'insideLeft' }}
              domain={[0, 100]}
            />
            <Tooltip
              formatter={(value) => `${value}%`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '6px'
              }}
            />
            <Legend />
            {cohorts.map(cohort => (
              <Line
                key={cohort.id}
                type="monotone"
                dataKey={cohort.name}
                stroke={cohort.color}
                strokeWidth={3}
                dot={{ fill: cohort.color, r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>

        <div className="chart-info">
          <p>
            <strong>How to read:</strong> The survival curve shows the percentage of each cohort that
            remains active at each time period. Higher curves indicate better retention. Compare curves
            across cohorts to identify trends.
          </p>
        </div>
      </div>
    </ChartContainer>
  );
}
