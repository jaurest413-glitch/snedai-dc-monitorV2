import React from "react";

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto pt-20">
  <div className="bg-gradient-to-br from-white/98 via-white/95 to-blue-50/90 backdrop-blur-2xl rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/40 relative transform transition-all duration-500 scale-100 m-6">

        {/* Bouton de fermeture élégant */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
        >
          <span className="text-lg font-bold">×</span>
        </button>

        <div className="p-10">
          {/* Header Premium */}
          <div className="text-center mb-12">
            <div className="relative mb-6 inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center text-white font-black text-4xl mx-auto shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                <div className="relative z-10">S</div>
              </div>
              
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-3">
              SNEDAI DC Monitor
            </h1>

            <div className="flex justify-center space-x-6 flex-wrap">
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg">
                <div className="w-3 h-3 rounded-full bg-white mr-3 animate-pulse"></div>
                Analytics Pro
              </span>
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg">
                <i className="fas fa-chart-line mr-3"></i>
                Real-time
              </span>
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-lg">
                <i className="fas fa-rocket mr-3"></i>
                IoT Ready
              </span>
            </div>
          </div>

          {/* 🎯 Mission & Vision */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 mb-10 border border-blue-100">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Mission & Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                Plateforme de surveillance IoT avancée conçue pour les infrastructures critiques.
                Notre solution combine <strong>analytics en temps réel</strong>, <strong>intelligence artificielle</strong> et
                <strong> alertes prédictives</strong> pour garantir la performance optimale de vos datacenters.
              </p>
            </div>
          </div>

          {/* ⭐ Fonctionnalités Premium */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center">
              <i className="fas fa-star text-yellow-500 mr-3"></i>
              Fonctionnalités Premium
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Bloc 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
                  <i className="fas fa-chart-area"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-3 text-lg">📊 Analytics Multicouches</h3>
                <p className="text-gray-600">
                  Visualisations avancées avec Chart.js, analyses de tendances et métriques en temps réel pour une prise de décision optimale.
                </p>
              </div>
              {/* Bloc 2 */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
                  <i className="fas fa-bell"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-3 text-lg">🚨 Centre d'Alertes IA</h3>
                <p className="text-gray-600">
                  Système d'alertes intelligent avec détection automatique des anomalies et notifications prédictives.
                </p>
              </div>
              {/* Bloc 3 */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
                  <i className="fas fa-brain"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-3 text-lg">🧠 Intelligence Prédictive</h3>
                <p className="text-gray-600">
                  Analyses de tendances et prédictions basées sur l'historique des données pour anticiper les problèmes.
                </p>
              </div>
              {/* Bloc 4 */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-3 text-lg">📅 Rapports Périodiques</h3>
                <p className="text-gray-600">
                  Statistiques journalières, hebdomadaires et mensuelles avec comparaisons et export de données.
                </p>
              </div>
              {/* Bloc 5 */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-3 text-lg">🛡️ Sécurité Avancée</h3>
                <p className="text-gray-600">
                  Authentification API, chiffrement des données et monitoring de sécurité en temps réel.
                </p>
              </div>
              {/* Bloc 6 */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border border-indigo-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-3 text-lg">📱 Interface Responsive</h3>
                <p className="text-gray-600">
                  Design moderne et responsive compatible avec tous les appareils et navigateurs.
                </p>
              </div>
            </div>
          </div>

          {/* 📊 Métriques de Performance */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 mb-10 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
              <i className="fas fa-tachometer-alt text-blue-600 mr-3"></i>
              Métriques de Performance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">60s</div>
                <div className="text-sm text-gray-600 font-semibold">Mise à jour auto</div>
              </div>
              <div className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">15+</div>
                <div className="text-sm text-gray-600 font-semibold">Métriques</div>
              </div>
              <div className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-2">Multi</div>
                <div className="text-sm text-gray-600 font-semibold">Sites</div>
              </div>
              <div className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-black bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-sm text-gray-600 font-semibold">Monitoring</div>
              </div>
            </div>
          </div>

          {/* 🖥️ Stack Technologique */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 mb-10 border border-indigo-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
              <i className="fas fa-code text-indigo-600 mr-3"></i>
              Stack Technologique
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-3 shadow-lg">
                  <i className="fab fa-python"></i>
                </div>
                <div className="font-bold text-gray-800">Supabase</div>
                <div className="text-sm text-gray-600">Backend API</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-3 shadow-lg">
                  <i className="fab fa-js"></i>
                </div>
                <div className="font-bold text-gray-800">Chart.js</div>
                <div className="text-sm text-gray-600">Visualisations</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-3 shadow-lg">
                  <i className="fas fa-database"></i>
                </div>
                <div className="font-bold text-gray-800">PostgreSQL</div>
                <div className="text-sm text-gray-600">Base de données</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-3 shadow-lg">
                  <i className="fas fa-microchip"></i>
                </div>
                <div className="font-bold text-gray-800">ESP32</div>
                <div className="text-sm text-gray-600">IoT Sensors</div>
              </div>
            </div>
          </div>

          {/* 🔗 Navigation & Actions */}
          <div className="text-center">
            <div className="flex justify-center space-x-4 mb-6 flex-wrap">
              <a href="index.html" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <i className="fas fa-home mr-3"></i>
                Page d'accueil
              </a>
              <a href="https://zmdsgzswdovyxrvkfjml.supabase.co" target="_blank" rel="noreferrer" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <i className="fas fa-database mr-2"></i>
                Base de Données Supabase
              </a>
              <a href="https://zmdsgzswdovyxrvkfjml.supabase.co/rest/v1/api_sensorreading" target="_blank" rel="noreferrer" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <i className="fas fa-code mr-2"></i>
                API Supabase
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
