import { TemperatureCard } from './TemperatureCard'
import { HumidityCard } from './HumidityCard'

export const Gauges = (props) => {
  const { latestReading } = props

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <TemperatureCard temperature={latestReading.temperature_c} />
      <HumidityCard humidityPercentage={latestReading.humidity_percent} />
    </div>
  )
}
