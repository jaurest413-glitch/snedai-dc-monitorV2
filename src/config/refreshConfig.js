/**
 * 🔧 CONFIGURATION DES INTERVALLES D'ACTUALISATION
 * VERSION OPTIMISÉE - SANS RECHARGEMENT DE PAGE
 */

export const REFRESH_CONFIG = {
    // ⏱️ INTERVALLES D'ACTUALISATION (en millisecondes)
    DATA_REFRESH: 30000, // 30 secondes - Données principales
    ALERTS_REFRESH: 60000, // 1 minute - Centre d'alertes
    CHART_REFRESH: 30000, // 30 secondes - Graphiques
    GAUGES_REFRESH: 10000, // 10 secondes - Jauges (plus fréquent)
  
    // 🛡️ PROTECTION CONTRE LES ERREURS
    MAX_RETRIES: 3,
    ERROR_DELAY: 5000, // Délai avant retry en cas d'erreur
  
    // 🎯 MODES DE FONCTIONNEMENT
    PRODUCTION_MODE: process.env.NODE_ENV === 'production',
    DEBUG_MODE: process.env.NODE_ENV === 'development',
  
    // 📊 CONFIGURATION DES SITES
    SITES: {
      SANON: {
        deviceId: 'ESP32_DHT11',
        refreshInterval: 30000,
        enabled: true,
      },
      SIEGE: {
        deviceId: 'ESP32_DHT11_SIEGE',
        refreshInterval: 30000,
        enabled: false, // Hors ligne
      },
      PLATEAU: {
        deviceId: 'ESP32_DHT11_PLATEAU',
        refreshInterval: 30000,
        enabled: false, // Hors ligne
      },
    },
  }
  
  /**
   * 🎯 FONCTION UTILITAIRE: Obtenir l'intervalle d'actualisation
   */
  export const getRefreshInterval = (type) => {
    const intervals = {
      DATA: REFRESH_CONFIG.DATA_REFRESH,
      ALERTS: REFRESH_CONFIG.ALERTS_REFRESH,
      CHART: REFRESH_CONFIG.CHART_REFRESH,
      GAUGES: REFRESH_CONFIG.GAUGES_REFRESH,
    }
  
    return intervals[type] || REFRESH_CONFIG.DATA_REFRESH
  }
  
  /**
   * 🛡️ FONCTION UTILITAIRE: Gestion sécurisée des intervalles
   * VERSION OPTIMISÉE - SANS RECHARGEMENT DE PAGE
   */
  export const createSafeInterval = (callback, interval, name = 'Unknown') => {
    console.log(`🔄 Création intervalle sécurisé: ${name} (${interval}ms)`)
    
    let intervalId = null
    let retryCount = 0
    let isActive = true // Flag pour contrôler l'activité
  
    const safeCallback = async () => {
      // 🛡️ PROTECTION: Vérifier si l'intervalle est toujours actif
      if (!isActive) {
        console.log(`⏹️ Intervalle ${name} inactif, skip...`)
        return
      }
  
      try {
        console.log(`🔄 Exécution de l'intervalle: ${name}`)
        
        // 🔄 EXÉCUTION ASYNCHRONE SÉCURISÉE
        await Promise.resolve(callback())
        
        retryCount = 0 // Reset du compteur en cas de succès
        console.log(`✅ Intervalle ${name} exécuté avec succès`)
        
      } catch (error) {
        console.error(`❌ Erreur dans l'intervalle ${name}:`, error)
        retryCount++
  
        if (retryCount >= REFRESH_CONFIG.MAX_RETRIES) {
          console.error(`🚨 Arrêt de l'intervalle ${name} après ${retryCount} erreurs`)
          // 🛡️ ARRÊT PROPRE SANS RECHARGEMENT
          if (intervalId) {
            clearInterval(intervalId)
            intervalId = null
            isActive = false
          }
        } else {
          console.log(`⚠️ Tentative ${retryCount}/${REFRESH_CONFIG.MAX_RETRIES} pour ${name}`)
        }
      }
    }
  
    // 🚀 CRÉATION DE L'INTERVALLE
    intervalId = setInterval(safeCallback, interval)
  
    // 🧹 FONCTION DE NETTOYAGE
    return () => {
      console.log(`🧹 Nettoyage de l'intervalle: ${name}`)
      isActive = false
      
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
    }
  }
  
  /**
   * 🎯 FONCTION UTILITAIRE: Vérifier si un site est actif
   */
  export const isSiteActive = (siteName) => {
    return REFRESH_CONFIG.SITES[siteName]?.enabled || false
  }
  
  /**
   * 🔧 FONCTION UTILITAIRE: Obtenir la configuration d'un site
   */
  export const getSiteConfig = (siteName) => {
    return (
      REFRESH_CONFIG.SITES[siteName] || {
        deviceId: 'UNKNOWN',
        refreshInterval: 30000,
        enabled: false,
      }
    )
  }
  
  /**
   * 🆕 FONCTION UTILITAIRE: Gestion d'erreur sans rechargement
   */
  export const handleApiError = (error, context = 'API') => {
    console.error(`❌ Erreur ${context}:`, error)
    
    // 🛡️ NE JAMAIS RECHARGER LA PAGE
    // Juste logger l'erreur et continuer
    
    return {
      success: false,
      error: error.message || 'Erreur inconnue',
      timestamp: new Date().toISOString()
    }
  }
  
  /**
   * 🆕 FONCTION UTILITAIRE: Retry avec backoff exponentiel
   */
  export const createRetryFunction = (fn, maxRetries = 3, baseDelay = 1000) => {
    return async (...args) => {
      let lastError
      
      for (let i = 0; i < maxRetries; i++) {
        try {
          return await fn(...args)
        } catch (error) {
          lastError = error
          
          if (i === maxRetries - 1) {
            throw lastError
          }
          
          // Backoff exponentiel: 1s, 2s, 4s...
          const delay = baseDelay * Math.pow(2, i)
          console.log(`⏳ Retry ${i + 1}/${maxRetries} dans ${delay}ms...`)
          
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    }
  }