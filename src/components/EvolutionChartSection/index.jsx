import React, { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartLine,
  faSatelliteDish,
  faChartPie,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'

// Enregistrer tous les scales et plugins nécessaires
Chart.register(...registerables)

export const EvolutionChartSection = (props) => {
  // 🎯 RÉCUPÉRATION DES DONNÉES VIA PROPS
  const { readings = [], selectedSite = 'SANON' } = props

  // 🔧 RÉFÉRENCES POUR ÉVITER LES FUITES MÉMOIRE
  const chartRef = useRef(null)
  const canvasRef = useRef(null)
  const isInitializedRef = useRef(false)

  // 🧭 NAVIGATION SÉCURISÉE VERS LE DASHBOARD
  const goToDashboard = () => {
    console.log('🔄 Navigation vers le dashboard...')
    
    try {
      // ✅ NAVIGATION SIMPLE SANS ÉVÉNEMENTS CUSTOM
      const url = new URL(window.location)
      url.searchParams.set('page', 'dashboard')
      window.history.pushState({ page: 'dashboard' }, '', url.toString())
      
      // 🔄 DÉCLENCHER UN ÉVÉNEMENT STANDARD
      window.dispatchEvent(new PopStateEvent('popstate'))
      
    } catch (error) {
      console.error('❌ Erreur lors de la navigation:', error)
      // Fallback: rechargement contrôlé si nécessaire
      console.log('🔄 Fallback: utilisation du hash')
      window.location.hash = '#dashboard'
    }
  }

  // 🏗️ INITIALISATION DU GRAPHIQUE - VERSION OPTIMISÉE
  useEffect(() => {
    console.log('📊 Initialisation du graphique Chart.js...')

    // 🛡️ PROTECTION: Éviter les initialisations multiples
    if (isInitializedRef.current) {
      console.log('⚠️ Graphique déjà initialisé, mise à jour des données uniquement')
      updateChartData()
      return
    }

    // 🎯 ATTENDRE QUE LE CANVAS SOIT DISPONIBLE
    const initializeChart = () => {
      const canvas = canvasRef.current
      if (!canvas) {
        console.log('⏳ Canvas pas encore disponible, nouvelle tentative...')
        setTimeout(initializeChart, 100)
        return
      }

      // 🗑️ NETTOYER LE GRAPHIQUE EXISTANT
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }

      // 🏗️ CRÉER LE NOUVEAU GRAPHIQUE
      try {
        const chart = new Chart(canvas, {
          type: 'line',
          data: {
            labels: [],
            datasets: [
              {
                label: 'Température',
                data: [],
                borderColor: '#F05A28',
                backgroundColor: 'rgba(240, 90, 40, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#F05A28',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#F05A28',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 3,
              },
              {
                label: 'Humidité',
                data: [],
                borderColor: '#2B6CB0',
                backgroundColor: 'rgba(43, 108, 176, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#2B6CB0',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#2B6CB0',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 3,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 0, // ✅ DÉSACTIVER ANIMATIONS POUR ÉVITER CONFLITS
            },
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  usePointStyle: true,
                  padding: 20,
                  font: {
                    size: 14,
                    weight: '600',
                    family: 'Inter, sans-serif',
                  },
                },
              },
              tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                titleColor: '#0F172A',
                bodyColor: '#0F172A',
                borderColor: '#D9E2EC',
                borderWidth: 2,
                padding: 12,
                cornerRadius: 12,
                callbacks: {
                  title: function (context) {
                    return context[0].label
                  },
                  label: function (context) {
                    const label = context.dataset.label
                    const value = context.parsed.y
                    const unit = label.includes('Température') ? '°C' : '%'
                    return `${label}: ${value}${unit}`
                  },
                },
              },
            },
            interaction: {
              mode: 'index',
              intersect: false,
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Date et Heure',
                  font: { size: 14, weight: '600' },
                  color: '#486581',
                },
                grid: {
                  color: 'rgba(217, 226, 236, 0.3)',
                },
                ticks: {
                  font: { size: 11, weight: '500' },
                  color: '#486581',
                  maxRotation: 45,
                  maxTicksLimit: 10,
                },
              },
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                min: 10,
                max: 90,
                title: {
                  display: true,
                  text: 'Valeurs',
                  font: { size: 14, weight: '600' },
                  color: '#486581',
                },
                grid: {
                  color: 'rgba(217, 226, 236, 0.3)',
                },
                ticks: {
                  font: { size: 11, weight: '500' },
                  color: '#486581',
                  stepSize: 10,
                },
              },
            },
          },
        })

        // 📝 STOCKER LA RÉFÉRENCE
        chartRef.current = chart
        isInitializedRef.current = true

        console.log('✅ Graphique Chart.js créé avec succès')

        // 🔄 CHARGER LES DONNÉES INITIALES
        updateChartData()

      } catch (error) {
        console.error('❌ Erreur lors de la création du graphique:', error)
      }
    }

    // 🚀 DÉMARRER L'INITIALISATION
    initializeChart()

    // 🧹 NETTOYAGE AU DÉMONTAGE
    return () => {
      console.log('🧹 Nettoyage du graphique Chart.js...')
      if (chartRef.current) {
        try {
          chartRef.current.destroy()
        } catch (error) {
          console.warn('⚠️ Erreur lors du nettoyage du graphique:', error)
        }
        chartRef.current = null
      }
      isInitializedRef.current = false
    }
  }, []) // ✅ EFFET UNIQUE SANS DÉPENDANCES

  // 🔄 FONCTION DE MISE À JOUR DES DONNÉES
  const updateChartData = () => {
    if (!chartRef.current || !chartRef.current.data) {
      console.log('⚠️ Graphique non initialisé pour la mise à jour')
      return
    }

    console.log(`📊 Mise à jour du graphique pour ${selectedSite}`)

    try {
      // 🏷️ MISE À JOUR DES LABELS
      chartRef.current.data.datasets[0].label = `Température (${selectedSite})`
      chartRef.current.data.datasets[1].label = `Humidité (${selectedSite})`

      if (readings && readings.length > 0) {
        // 📊 TRAITEMENT DES DONNÉES
        const labels = readings
          .map((d) => {
            const date = new Date(d.recorded_at)
            const day = String(date.getDate()).padStart(2, '0')
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const hours = String(date.getHours()).padStart(2, '0')
            const minutes = String(date.getMinutes()).padStart(2, '0')
            return `${day}/${month} ${hours}:${minutes}`
          })
          .reverse()

        const temperatures = readings.map((d) => d.temperature_c).reverse()
        const humidities = readings.map((d) => d.humidity_percent).reverse()

        // 📈 MISE À JOUR DES DONNÉES
        chartRef.current.data.labels = labels
        chartRef.current.data.datasets[0].data = temperatures
        chartRef.current.data.datasets[1].data = humidities

        console.log(`✅ Données mises à jour: ${readings.length} points`)
      } else {
        // 📭 GRAPHIQUE VIDE POUR LES SITES HORS LIGNE
        chartRef.current.data.labels = []
        chartRef.current.data.datasets[0].data = []
        chartRef.current.data.datasets[1].data = []

        console.log(`⚠️ Site ${selectedSite} hors ligne - graphique vidé`)
      }

      // 🔄 MISE À JOUR DU GRAPHIQUE
      chartRef.current.update('none') // Sans animation

    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour du graphique:', error)
    }
  }

  // 🔄 MISE À JOUR QUAND LES DONNÉES OU LE SITE CHANGENT
  useEffect(() => {
    console.log(`🔄 Données ou site changé - Mise à jour graphique`)
    updateChartData()
  }, [readings, selectedSite])

  return (
    <div id="evolution-chart-container" className="mb-12 mx-4 mobile-optimized">
      {/* Conteneur Principal */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl shadow-gray-900/10 border border-gray-200/60 overflow-hidden transition-all duration-300 hover:shadow-3xl hover:shadow-gray-900/20">
        
        {/* Titre Professionnel */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>

          <div className="flex items-center justify-between relative z-10">
            {/* Section gauche - Titre */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="text-white text-xl relative z-10"
                />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-wide bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  ÉVOLUTION EN TEMPS RÉEL
                </h2>
                <p className="text-blue-200 text-sm font-medium mt-1">
                  Surveillance continue des paramètres critiques
                </p>
              </div>
            </div>

            {/* Section droite - Indicateurs */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/20">
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-sm font-semibold">24H</span>
              </div>

              <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/20">
                <FontAwesomeIcon
                  icon={faSatelliteDish}
                  className="text-blue-400 text-sm"
                />
                <span className="text-sm font-semibold">LIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Graphique */}
        <div className="bg-white p-2 sm:p-3 lg:p-4">
          <div className="bg-gray-50/50 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border border-gray-100">
            <div className="relative" style={{ padding: '5px' }}>
              <canvas
                ref={canvasRef}
                style={{
                  height:
                    window.innerWidth < 640
                      ? '250px'
                      : window.innerWidth < 768
                        ? '300px'
                        : '550px',
                  width: '100%',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>

        {/* Bouton Analyses Avancées */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-t border-gray-200/60 px-6 py-4">
          <div className="flex justify-center">
            <button
              onClick={goToDashboard}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-semibold text-lg flex items-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 action-button min-h-[50px] w-full sm:w-auto"
            >
              <FontAwesomeIcon icon={faChartPie} className="mr-3" />
              Analyses Avancées
              <FontAwesomeIcon icon={faArrowRight} className="ml-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}