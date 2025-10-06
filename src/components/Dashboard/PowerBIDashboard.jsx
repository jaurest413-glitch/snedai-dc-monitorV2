import React, { useState, useEffect } from 'react'

export default function PowerBIDashboard() {
  const [loading, setLoading] = useState(true)
  const [lastSync, setLastSync] = useState('--:--')

  useEffect(() => {
    try {
      setTimeout(() => {
        setLoading(false)
        updateLastSync()
      }, 2000)
    } catch (error) {
      console.error("❌ Erreur lors de l'initialisation PowerBI:", error)
      setLoading(false)
    }
  }, [])

  const updateLastSync = () => {
    const now = new Date()
    setLastSync(
      now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    )
  }

  const refreshPowerBI = () => {
    try {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        updateLastSync()
      }, 2000)
    } catch (error) {
      console.error('❌ Erreur lors du rafraîchissement PowerBI:', error)
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 mb-12 border border-white/30 shadow-xl shadow-primary/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold gradient-text bg-gradient-to-br from-primary to-accent powerbi-title">
          <i className="fas fa-chart-pie mr-2"></i> Dashboard PowerBI - SNEDAI
          DC MONITOR
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-success bg-success/10 px-3 py-1 rounded-full flex items-center">
            <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse"></div>
            Connecté
          </div>
          <button
            onClick={refreshPowerBI}
            className="bg-gradient-to-br from-info to-primary text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            <i className="fas fa-sync-alt mr-2"></i> Actualiser
          </button>
        </div>
      </div>
      {/* PowerBI Dashboard Intégré - RESPONSIVE COMPLET 
      <div className="relative bg-white rounded-2xl shadow-inner border border-gray-200 overflow-hidden max-w-[1024px] mx-auto">
        <div
          className="powerbi-container powerbi-chart relative w-full"
          id="powerbi-container"
          style={{
            paddingBottom: '103.52%', // Ratio exact : 1060/1024 = 1.0352
            height: 0,
          }}
        >
          <iframe
            id="powerbi-iframe"
            title="SNEDAI DC MONITOR - Dashboard Monitoring Datacenter"
            width="1024"
            height="1060"
            src="https://app.powerbi.com/view?r=eyJrIjoiMTliZGVhM2UtNmFlOC00NzkyLWEyYjYtYzk4ODk2NjAyMjU5IiwidCI6ImIwNGI3ZTQ1LWMyYzgtNGFiNC04M2VlLTE4YmJiNzVlNmZhZSIsImMiOjh9&pageName=fd638bbf38e0416c16b1"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '12px',
            }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
          />
        </div>
      </div>*/}

      {/* PowerBI Dashboard Intégré - Responsive 1920x1080 (16:9) */}
      <div className="relative bg-white rounded-2xl shadow-inner border border-gray-200 overflow-hidden">
        <div
          className="powerbi-container powerbi-chart"
          id="powerbi-container"
          style={{ maxWidth: '1920px', margin: '0 auto' }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%', // 1080 / 1920 * 100 = 56.25% (16:9)
            }}
          >
            <iframe
              id="powerbi-iframe"
              title="DATACENTER V1.2 - Dashboard IoT Optimisé"
              width="1920"
              height="1080"
              src="https://app.powerbi.com/view?r=eyJrIjoiMTliZGVhM2UtNmFlOC00NzkyLWEyYjYtYzk4ODk2NjAyMjU5IiwidCI6ImIwNGI3ZTQ1LWMyYzgtNGFiNC04M2VlLTE4YmJiNzVlNmZhZSIsImMiOjh9"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '12px',
              }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
            ></iframe>
          </div>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6 mx-auto"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Chargement du Dashboard Power BI
            </h3>
            <p className="text-gray-600 font-semibold mb-4">
              Connexion aux données Supabase...
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Cela peut prendre 30-60 secondes selon votre connexion
            </p>
          </div>
        </div>
      )}

      {/* Contrôles PowerBI */}
      <div className="mt-6 flex items-center justify-between bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            <i className="fas fa-info-circle mr-1 text-info"></i>
            Dashboard connecté au service PowerBI
          </div>
          <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-md">
            Dernière sync: <span>{lastSync}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() =>
              window.open(
                'https://app.powerbi.com/view?r=eyJrIjoiZWVmZGYyY2YtYzQxYy00OGJiLThkZjYtOTVjOGQxODQ4ZjE4IiwidCI6ImIwNGI3ZTQ1LWMyYzgtNGFiNC04M2VlLTE4YmJiNzVlNmZhZSIsImMiOjh9',
                '_blank',
              )
            }
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <i className="fas fa-external-link-alt mr-1"></i> Ouvrir dans
            PowerBI
          </button>
        </div>
      </div>
    </div>
  )
}
