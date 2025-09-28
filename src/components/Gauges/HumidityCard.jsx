import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faExclamationTriangle,
  faTint,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'

export const HumidityCard = (props) => {
  const { humidityPercentage } = props
  const [status, setStatus] = useState('')
  const [icon, setIcon] = useState('')
  const [className, setClassName] = useState('')

  useEffect(() => {
    if (humidityPercentage < 40) {
      setStatus('Trop sec (< 40%)')
      setClassName('bg-warning/20 text-warning')
      setIcon(faExclamationTriangle)
    } else if (humidityPercentage > 60) {
      setStatus('Trop humide (> 60%)')
      setClassName('bg-error/20 text-error')
      setIcon(faTint)
    } else {
      setStatus('Optimal (ASHRAE)')
      setClassName('bg-success/20 text-success')
      setIcon(faCheck)
    }
  }, [humidityPercentage])

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/30 shadow-xl shadow-primary/10 transition-all duration-500 hover:-translate-y-3 hover:scale-102 hover:shadow-2xl hover:shadow-primary/20 relative overflow-hidden">
      <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary to-info rounded-full flex items-center justify-center text-3xl text-white shadow-xl shadow-primary/30 relative">
        <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-br from-accent via-primary to-info animate-rotate -z-10"></div>
        💧
      </div>
      <h3 className="text-xl font-extrabold mb-8 gradient-text bg-gradient-to-br from-primary to-accent block-title">
        Humidité Actuelle
      </h3>
      <div className="w-60 h-36 mx-auto mb-8 relative">
        <svg viewBox="0 0 240 140">
          <defs>
            <linearGradient
              id="humidityGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" style={{ stopColor: '#2B6CB0' }} />
              <stop offset="50%" style={{ stopColor: '#10B981' }} />
              <stop offset="100%" style={{ stopColor: '#F59E0B' }} />
            </linearGradient>
          </defs>
          <path className="gauge-bg" d="M 40 100 A 80 80 0 0 1 200 100"></path>
          <path
            className="gauge-fill"
            id="humidity-gauge"
            d="M 40 100 A 80 80 0 0 1 200 100"
            stroke="url(#humidityGradient)"
          ></path>
        </svg>
      </div>
      <div
        className="text-4xl font-black mb-2 gradient-text bg-gradient-to-br from-primary to-accent"
        id="humidity-value"
      >
        {humidityPercentage}%
      </div>
      <div className="text-muted font-semibold mb-4">
        Plage optimale: 40-60% (ASHRAE 2016)
      </div>
      <div
        className={`inline-flex items-center px-4 py-2 rounded-full font-semibold ${className}`}
        id="humidity-status"
      >
        <FontAwesomeIcon icon={icon} className="mr-2" />
        {status}
      </div>
    </div>
  )
}
