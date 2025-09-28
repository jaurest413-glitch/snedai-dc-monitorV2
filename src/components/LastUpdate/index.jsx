import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt, faClock } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
export const LastUpdate = (props) => {
  const { fetchLatestData, timestamp } = props
  const [formattedTimestamp, setFormattedTimestamp] = useState('')

  useEffect(() => {
    if (!timestamp) return

    const date = new Date(timestamp)
    const formattedDate = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)

    setFormattedTimestamp(formattedDate)
  }, [timestamp])

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 mb-8 border border-white/30 shadow-xl shadow-primary/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <FontAwesomeIcon icon={faClock} className="text-primary text-xl" />
          <div>
            <div className="font-bold text-foreground card-title">
              Dernière Mise à Jour
            </div>
            <div
              id="last-data-update"
              className="text-muted text-lg font-semibold"
            >
              {formattedTimestamp}
            </div>
          </div>
        </div>
        <button
          onClick={fetchLatestData}
          className="cursor-pointer bg-gradient-to-br from-primary to-info text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 min-h-[44px] w-full sm:w-auto"
        >
          <FontAwesomeIcon icon={faSyncAlt} className="mr-2" /> Actualiser
        </button>
      </div>
    </div>
  )
}
