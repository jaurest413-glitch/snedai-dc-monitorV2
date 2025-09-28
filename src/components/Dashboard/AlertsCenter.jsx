import React, { useEffect, useState } from 'react'

// Composant principal de gestion des alertes
const AlertsSystem = ({
  siteId = 'SANON', // Utiliser siteId au lieu de deviceId
  readingsLimit = 50,
  refreshInterval = 60000, // 1 minute
  alertThresholds = {
    temperature: { min: 18, max: 27, critical: 35 },
    humidity: { min: 40, max: 60, critical: 85 },
  },
}) => {
  const [alerts, setAlerts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState('--:--')

  // Fonction de récupération directe depuis Supabase
  const fetchAlerts = async () => {
    try {
      console.log('🔍 Début de la récupération des alertes...')
      setIsLoading(true)

      // 📡 REQUÊTE DIRECTE SUPABASE
      // 🔍 TEST: Récupérer TOUTES les données pour diagnostic
      const response = await fetch(
        `https://zmdsgzswdovyxrvkfjml.supabase.co/rest/v1/api_sensorreading?order=recorded_at.desc&limit=${readingsLimit}`,
        {
          headers: {
            apikey: 'sb_publishable_KE0jmINtV1X5fPC9ULcmFg_Tsb4s_N4',
            Authorization:
              'Bearer sb_publishable_KE0jmINtV1X5fPC9ULcmFg_Tsb4s_N4',
            'Content-Type': 'application/json',
          },
        },
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const recentReadings = await response.json()
      console.log('📊 Lectures récupérées:', recentReadings)
      console.log('🔍 Nombre de lectures:', recentReadings.length)
      console.log('🔍 Site ID utilisé:', siteId)

      // 🔍 DIAGNOSTIC: Afficher les device_id disponibles
      if (recentReadings.length > 0) {
        const deviceIds = [...new Set(recentReadings.map((r) => r.device_id))]
        console.log('🔍 Device IDs trouvés dans la base:', deviceIds)
      }

      if (recentReadings && recentReadings.length > 0) {
        console.log(`�� Analyse de ${recentReadings.length} lectures...`)

        const newAlerts = []

        // Analyser chaque lecture pour détecter les alertes
        recentReadings.forEach((reading, index) => {
          console.log(
            `📊 Lecture ${index + 1}: Temp=${reading.temperature_c}°C, Hum=${reading.humidity_percent}%`,
          )

          const temp = reading.temperature_c
          const humidity = reading.humidity_percent
          const timestamp = reading.recorded_at

          // Alertes température
          if (temp > alertThresholds.temperature.critical) {
            console.log(`🔥 Alerte température critique détectée: ${temp}°C`)
            newAlerts.push({
              timestamp,
              type: 'Température Critique',
              value: `${temp}°C`,
              severity: 'Critique',
              severityClass: 'error',
              icon: 'fas fa-fire',
            })
          } else if (temp > alertThresholds.temperature.max) {
            console.log(`�� Alerte température élevée détectée: ${temp}°C`)
            newAlerts.push({
              timestamp,
              type: 'Température Élevée',
              value: `${temp}°C`,
              severity: 'Élevé',
              severityClass: 'warning',
              icon: 'fas fa-temperature-high',
            })
          } else if (temp < alertThresholds.temperature.min) {
            console.log(`❄️ Alerte température basse détectée: ${temp}°C`)
            newAlerts.push({
              timestamp,
              type: 'Température Basse',
              value: `${temp}°C`,
              severity: 'Moyen',
              severityClass: 'info',
              icon: 'fas fa-snowflake',
            })
          }

          // Alertes humidité
          if (humidity > alertThresholds.humidity.critical) {
            console.log(`💧 Alerte humidité critique détectée: ${humidity}%`)
            newAlerts.push({
              timestamp,
              type: 'Humidité Critique',
              value: `${humidity}%`,
              severity: 'Critique',
              severityClass: 'error',
              icon: 'fas fa-tint',
            })
          } else if (
            humidity > alertThresholds.humidity.max ||
            humidity < alertThresholds.humidity.min
          ) {
            console.log(`💧 Alerte humidité anormale détectée: ${humidity}%`)
            newAlerts.push({
              timestamp,
              type: 'Humidité Anormale',
              value: `${humidity}%`,
              severity:
                humidity > alertThresholds.humidity.max ? 'Élevé' : 'Moyen',
              severityClass:
                humidity > alertThresholds.humidity.max ? 'warning' : 'info',
              icon: 'fas fa-tint',
            })
          }
        })
        // Trier par date (plus récent en premier) et limiter à 10 alertes
        const sortedAlerts = newAlerts
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 10)

        setAlerts(sortedAlerts)
        setLastUpdate(
          new Date().toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        )
        console.log(
          `✅ ${sortedAlerts.length} alertes générées sur ${newAlerts.length} détectées`,
        )
      } else {
        console.log('⚠️ Aucune lecture trouvée dans la base de données')
        setAlerts([])
      }
    } catch (error) {
      console.error('❌ Erreur actualisation alertes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction utilitaire pour les couleurs de sévérité
  const getSeverityColor = (severityClass) => {
    const severityColors = {
      error: 'from-red-500 to-red-600',
      warning: 'from-yellow-500 to-yellow-600',
      info: 'from-blue-500 to-blue-600',
      success: 'from-green-500 to-green-600',
    }
    return severityColors[severityClass] || 'from-gray-500 to-gray-600'
  }
  // Effet pour initialiser et gérer les intervalles
  useEffect(() => {
    fetchAlerts()
    const interval = setInterval(fetchAlerts, refreshInterval)

    return () => {
      clearInterval(interval)
    }
  }, [siteId, readingsLimit, refreshInterval])

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
          <i className="fas fa-bell mr-2"></i> Centre d'Alertes Avancé
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-md">
            Dernière mise à jour:{' '}
            <span className="font-semibold">{lastUpdate}</span>
          </div>
          <button
            onClick={fetchAlerts}
            disabled={isLoading}
            className="bg-gradient-to-br from-info to-primary text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50"
          >
            <i
              className={`fas fa-sync-alt mr-2 ${isLoading ? 'animate-spin' : ''}`}
            ></i>
            {isLoading ? 'Actualisation...' : 'Actualiser'}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full rounded-2xl overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-gradient-to-br from-primary to-info text-white">
              <th className="px-6 py-4 text-left font-bold">
                <i className="far fa-calendar-alt mr-2"></i> Date / Heure
              </th>
              <th className="px-6 py-4 text-left font-bold">
                <i className="fas fa-search mr-2"></i> Type
              </th>
              <th className="px-6 py-4 text-left font-bold">
                <i className="fas fa-chart-bar mr-2"></i> Valeur
              </th>
              <th className="px-6 py-4 text-left font-bold">
                <i className="fas fa-exclamation mr-2"></i> Sévérité
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {alerts.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  <i className="fas fa-check-circle text-green-500 text-2xl mb-2"></i>
                  <div>
                    {isLoading
                      ? 'Chargement des alertes...'
                      : 'Aucune alerte active'}
                  </div>
                </td>
              </tr>
            ) : (
              alerts.map((alert, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50 transition-all duration-300 hover:scale-[1.005]"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(alert.timestamp).toLocaleString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <i className={`${alert.icon} mr-2`}></i> {alert.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">
                    {alert.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full font-bold text-sm bg-gradient-to-br ${getSeverityColor(alert.severityClass)} text-white`}
                    >
                      <i className="fas fa-exclamation-circle mr-2"></i>{' '}
                      {alert.severity}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Statistiques des alertes */}
      {/* alerts.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-fire text-red-600 text-sm"></i>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {alerts.filter(alert => alert.severityClass === 'error').length}
                </div>
                <div className="text-xs text-red-500 uppercase">Critiques</div>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-exclamation-triangle text-yellow-600 text-sm"></i>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {alerts.filter(alert => alert.severityClass === 'warning').length}
                </div>
                <div className="text-xs text-yellow-500 uppercase">Élevées</div>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-info-circle text-blue-600 text-sm"></i>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {alerts.filter(alert => alert.severityClass === 'info').length}
                </div>
                <div className="text-xs text-blue-500 uppercase">Moyennes</div>
              </div>
            </div>
          </div>
        </div>
      )}*/}
    </div>
  )
}

export default AlertsSystem
