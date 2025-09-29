import React from 'react'

/**
 * 🛡️ COMPOSANT DE PROTECTION CONTRE LES ERREURS
 *
 * Ce composant empêche les erreurs JavaScript de causer
 * des rechargements de page en les capturant et les gérant
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Mettre à jour l'état pour afficher l'UI de fallback
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log l'erreur sans recharger la page
    console.error('🚨 Erreur capturée par ErrorBoundary:', error)
    console.error("📊 Détails de l'erreur:", errorInfo)

    this.setState({
      error: error,
      errorInfo: errorInfo,
    })

    // Ne pas recharger la page automatiquement
    // L'utilisateur peut continuer à utiliser l'application
  }

  render() {
    if (this.state.hasError) {
      // UI de fallback personnalisée
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl border border-red-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Erreur de l'Application
              </h2>
              <p className="text-gray-600 mb-6">
                Une erreur s'est produite, mais l'application continue de
                fonctionner. Les données continuent de s'actualiser normalement.
              </p>
              <button
                onClick={() => {
                  this.setState({
                    hasError: false,
                    error: null,
                    errorInfo: null,
                  })
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
