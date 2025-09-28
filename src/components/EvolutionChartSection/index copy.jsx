import React, { useEffect } from 'react'
import { Chart, registerables } from 'chart.js'

// Enregistrer tous les scales et plugins nécessaires
Chart.register(...registerables)

export const EvolutionChartSection = (props) => {
  // 🎯 RÉCUPÉRATION DES DONNÉES VIA PROPS
  const { readings = [], selectedSite = 'SANON' } = props

  const goToDashboard = () => {
    // ✅ NAVIGATION VERS LE DASHBOARD (sans rechargement)
    console.log('🔄 Redirection vers le dashboard...')

    // Changer l'URL et notifier le changement
    window.history.pushState({ page: 'dashboard' }, '', '?page=dashboard')
    window.dispatchEvent(
      new CustomEvent('urlChanged', {
        detail: { page: 'dashboard' },
      }),
    )
  }

  useEffect(() => {
    // 🎯 FONCTION POUR CHARGER LES DONNÉES (uniquement via props comme index1.jsx)
    const loadInitialData = async (chart, site) => {
      try {
        console.log(`📊 Chargement des données initiales pour ${site}...`)

        // 🎯 UTILISATION UNIQUEMENT DES DONNÉES PROPS (comme index1.jsx)
        if (readings && readings.length > 0) {
          console.log(
            `✅ Utilisation des données props: ${readings.length} points`,
          )

          // Préparer les données pour le graphique
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

          // ✅ CORRECTION : Vérifier que le graphique est valide avant de le mettre à jour
          if (
            chart &&
            chart.data &&
            chart.data.datasets &&
            chart.data.datasets.length >= 2
          ) {
            // Mettre à jour le graphique avec les données props
            chart.data.labels = labels
            chart.data.datasets[0].data = temperatures
            chart.data.datasets[1].data = humidities
            chart.data.datasets[0].label = `Température (${site})`
            chart.data.datasets[1].label = `Humidité (${site})`

            // Mise à jour sécurisée
            try {
              if (chart && typeof chart.update === 'function') {
                chart.update('none') // Animation désactivée pour éviter les conflits
              } else {
                console.warn('⚠️ Chart non valide pour mise à jour')
              }
            } catch (updateError) {
              console.warn('⚠️ Erreur mise à jour graphique:', updateError)
            }
          } else {
            console.warn('⚠️ Graphique non valide, impossible de mettre à jour')
          }

          console.log(
            `✅ Graphique initial mis à jour avec les données props pour ${site}`,
          )
        } else {
          console.log(
            `⚠️ Aucune donnée props trouvée - Affichage graphique vide`,
          )
          showEmptyChart(chart, site)
        }
      } catch (error) {
        console.error(
          `❌ Erreur chargement données initiales pour ${site}:`,
          error,
        )
        showEmptyChart(chart, site)
      }
    }

    // Fonction pour afficher un graphique vide (sites sans données)
    const showEmptyChart = (chart, site) => {
      try {
        console.log(`📊 Affichage graphique vide pour ${site} (pas de données)`)

        // ✅ VÉRIFICATION: S'assurer que le chart est valide
        if (
          !chart ||
          !chart.data ||
          !chart.data.datasets ||
          chart.data.datasets.length < 2
        ) {
          console.warn(
            '⚠️ Graphique non valide, impossible de mettre à jour (vide)',
          )
          return
        }

        // Vider les données
        chart.data.labels = []
        chart.data.datasets[0].data = []
        chart.data.datasets[1].data = []

        // Mettre à jour les labels pour indiquer l'absence de données
        chart.data.datasets[0].label = `Température (${site} - Hors ligne)`
        chart.data.datasets[1].label = `Humidité (${site} - Hors ligne)`

        // Mise à jour sécurisée
        try {
          if (chart && typeof chart.update === 'function') {
            chart.update('none') // Animation désactivée pour éviter les conflits
          } else {
            console.warn('⚠️ Chart non valide pour mise à jour (vide)')
          }
        } catch (updateError) {
          console.warn('⚠️ Erreur mise à jour graphique vide:', updateError)
        }

        console.log(`✅ Graphique vidé pour ${site}`)
      } catch (error) {
        console.error(`❌ Erreur vidage graphique pour ${site}:`, error)
      }
    }

    // Initialiser le graphique Chart.js avec l'import npm
    const initializeChart = () => {
      console.log('🔍 Initialisation du graphique avec Chart.js npm...')
      console.log('Chart importé:', Chart)

      const ctx = document.getElementById('evolutionChart')
      console.log('Canvas trouvé:', !!ctx)
      if (ctx && ctx.ownerDocument) {
        // ✅ CORRECTION: Détruire le graphique existant sur ce canvas
        const existingChart = Chart.getChart(ctx)
        if (existingChart) {
          console.log('🗑️ Destruction du graphique existant:', existingChart.id)
          existingChart.destroy()
        }

        // Configuration exacte du graphique avec l'import npm
        const chart = new Chart(ctx, {
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
                tension: 0.4, // Courbes plus lisses
                pointBackgroundColor: '#F05A28',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 0, // Points masqués par défaut
                pointHoverRadius: 6, // Visibles au survol
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
                tension: 0.4, // Courbes plus lisses
                pointBackgroundColor: '#2B6CB0',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 0, // Points masqués par défaut
                pointHoverRadius: 6, // Visibles au survol
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
              duration: 0, // Désactiver les animations pour de meilleures performances
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
                    // Format: "24/09 14:24"
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
                  maxTicksLimit: 10, // Limiter le nombre de ticks pour éviter la surcharge
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

        // Stocker le graphique globalement pour les mises à jour
        window.evolutionChart = chart
        console.log('✅ Graphique Chart.js créé et stocké globalement')

        // ✅ CORRECTION : Attendre que le graphique soit complètement initialisé
        // avant de charger les données
        setTimeout(() => {
          const currentSite = 'SANON' // Site par défaut
          console.log(
            `📊 EvolutionChart: Initialisation avec le site ${currentSite}`,
          )
          // Vérifier que le chart existe avant de l'utiliser
          if (chart && typeof chart.update === 'function') {
            loadInitialData(chart, currentSite)
          } else {
            console.warn(
              '⚠️ Chart non initialisé, impossible de charger les données',
            )
          }
        }, 500) // Délai pour s'assurer que Chart.js est prêt
      } else {
        console.log('❌ Canvas non trouvé')
      }
    }

    // ✅ SUPPRESSION: Écouteur d'événement redondant - les props gèrent déjà le changement

    // ✅ SIMPLIFICATION: Initialisation directe avec Chart.js npm
    console.log('🚀 Initialisation du composant EvolutionChartSection...')

    // ✅ CORRECTION: Éviter les initialisations multiples
    if (window.evolutionChartInitialized) {
      console.log('⚠️ Graphique déjà initialisé, skip...')
      return
    }

    // Marquer comme initialisé IMMÉDIATEMENT pour éviter les doublons
    window.evolutionChartInitialized = true

    // ✅ CORRECTION: Attendre que le canvas soit dans le DOM avec limite
    let retryCount = 0
    const maxRetries = 10 // Limite à 10 tentatives

    const waitForCanvas = () => {
      const canvas = document.getElementById('evolutionChart')
      if (canvas && canvas.ownerDocument) {
        console.log('✅ Canvas trouvé et valide, création du graphique...')
        window.evolutionChartInitialized = true
        initializeChart()
      } else if (retryCount < maxRetries) {
        retryCount++
        console.log(
          `⏳ Canvas pas encore disponible, tentative ${retryCount}/${maxRetries}...`,
        )
        setTimeout(waitForCanvas, 100)
      } else {
        console.error('❌ Canvas non trouvé après 10 tentatives, abandon...')
      }
    }

    // Démarrer l'attente du canvas
    setTimeout(waitForCanvas, 100)

    // ✅ SUPPRESSION: Plus besoin d'écouter les événements - les props gèrent le changement

    // ✅ CORRECTION: Nettoyage simplifié sans événements
    return () => {
      if (
        window.evolutionChart &&
        typeof window.evolutionChart.destroy === 'function'
      ) {
        window.evolutionChart.destroy()
        window.evolutionChart = null
      }
      // Reset du flag d'initialisation
      window.evolutionChartInitialized = false
    }
  }, []) // ✅ CORRECTION: Pas de dépendances pour éviter la boucle infinie

  // ✅ CORRECTION: Mise à jour du graphique avec selectedSite dynamique
  useEffect(() => {
    if (window.evolutionChart && readings && readings.length > 0) {
      console.log(
        `📊 Mise à jour du graphique avec ${readings.length} nouvelles données pour le site ${selectedSite}`,
      )

      // Préparer les données pour le graphique
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

      // Mettre à jour le graphique
      if (window.evolutionChart.data && window.evolutionChart.data.datasets) {
        window.evolutionChart.data.labels = labels
        window.evolutionChart.data.datasets[0].data = temperatures
        window.evolutionChart.data.datasets[1].data = humidities
        window.evolutionChart.data.datasets[0].label = `Température (${selectedSite})`
        window.evolutionChart.data.datasets[1].label = `Humidité (${selectedSite})`

        try {
          window.evolutionChart.update('none')
          console.log(
            `✅ Graphique mis à jour avec les nouvelles données pour ${selectedSite}`,
          )
        } catch (error) {
          console.warn('⚠️ Erreur mise à jour graphique:', error)
        }
      }
    }
  }, [readings, selectedSite]) // Se déclenche quand readings ou selectedSite change

  return (
    <div
      id="evolution-chart-container"
      className="mb-6 sm:mb-8 lg:mb-12 mx-2 sm:mx-4 mobile-optimized"
    >
      {/* Conteneur Principal avec Bordures Optimisées */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl shadow-gray-900/10 border border-gray-200/60 overflow-hidden transition-all duration-300 hover:shadow-3xl hover:shadow-gray-900/20">
        {/* Titre Professionnel Premium */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white p-3 sm:p-4 lg:p-6 relative overflow-hidden">
          {/* Effet de brillance animé */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between relative z-10 gap-3 sm:gap-4">
            {/* Section gauche - Titre principal */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
                <i className="fas fa-chart-line text-white text-sm sm:text-lg lg:text-xl relative z-10"></i>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-black tracking-wide bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  ÉVOLUTION EN TEMPS RÉEL
                </h2>
                <p className="text-blue-200 text-xs sm:text-sm font-medium mt-1">
                  Surveillance continue des paramètres critiques
                </p>
              </div>
            </div>

            {/* Section droite - Indicateurs professionnels */}
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-center sm:justify-end">
              {/* Indicateur 24H */}
              <div className="flex items-center space-x-1 sm:space-x-2 bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 border border-white/20 min-h-[36px] sm:min-h-[44px] touch-manipulation">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-xs sm:text-sm font-semibold">24H</span>
              </div>

              {/* Indicateur de statut */}
              <div className="flex items-center space-x-1 sm:space-x-2 bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 border border-white/20 min-h-[36px] sm:min-h-[44px] touch-manipulation">
                <i className="fas fa-satellite-dish text-blue-400 text-xs sm:text-sm"></i>
                <span className="text-xs sm:text-sm font-semibold">LIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Graphique Agrandie */}
        <div className="bg-white p-2 sm:p-3 lg:p-4">
          <div className="bg-gray-50/50 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border border-gray-100">
            {/* Canvas responsive avec hauteur adaptative */}
            <div className="relative" style={{ padding: '5px' }}>
              <canvas
                id="evolutionChart"
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
              ></canvas>
            </div>
          </div>
        </div>

        {/* Bouton Analyses Avancées */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-t border-gray-200/60 px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex justify-center">
            <button
              onClick={goToDashboard}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 action-button min-h-[48px] sm:min-h-[56px] w-full sm:w-auto touch-manipulation"
            >
              <i className="fas fa-chart-pie mr-2 sm:mr-3 text-sm sm:text-base"></i>
              <span className="text-xs sm:text-sm lg:text-base">
                Analyses Avancées
              </span>
              <i className="fas fa-arrow-right ml-2 sm:ml-3 text-sm sm:text-base"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
