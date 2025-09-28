import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'        
import {
  faHome,
  faChartBar,
  faChartLine,
  faCog,
  faServer,
  faMicrochip,
} from '@fortawesome/free-solid-svg-icons'
import { faPython, faJsSquare } from '@fortawesome/free-brands-svg-icons'

export const Footer = () => {
  return (
    // Footer Professionnel Premium
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white mt-20 border-t border-gray-700/50">
      {/* Bande décorative supérieure  */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Section principale  */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Marque et description  */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/25">
                <FontAwesomeIcon
                  icon={faServer}
                  className="text-white text-2xl"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  SNEDAI DC Monitor
                </h3>
                <p className="text-blue-400 text-sm font-medium mt-1">
                  IoT Monitoring Solution
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Plateforme avancée de surveillance en temps réel pour
              infrastructures critiques. Monitoring intelligent avec ESP32,
              Supabase et analytics prédictifs.
            </p>
            {/* Métriques  */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                <div className="text-2xl font-bold text-green-400">24/7</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">
                  Surveillance
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                <div className="text-2xl font-bold text-blue-400">
                  Real-time
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">
                  Analytics
                </div>
              </div>
            </div>
          </div>

          {/* Navigation  */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white relative">
              Navigation
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
            </h4>
            <nav className="space-y-3">
              <a
                href="#"
                className="group flex items-center text-gray-300 hover:text-white transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-700/50 group-hover:bg-blue-500/20 flex items-center justify-center mr-3 transition-colors">
                  <FontAwesomeIcon icon={faHome} className="text-xs" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  Accueil
                </span>
              </a>
              <a
                href="dashboard.html"
                className="group flex items-center text-gray-300 hover:text-white transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-700/50 group-hover:bg-blue-500/20 flex items-center justify-center mr-3 transition-colors">
                  <FontAwesomeIcon icon={faChartBar} className="text-xs" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  Dashboard
                </span>
              </a>
              <a
                href="#evolution-chart-container"
                className="group flex items-center text-gray-300 hover:text-white transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-700/50 group-hover:bg-blue-500/20 flex items-center justify-center mr-3 transition-colors">
                  <FontAwesomeIcon icon={faChartLine} className="text-xs" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  Évolution
                </span>
              </a>
              <a
                href="#"
                className="group flex items-center text-gray-300 hover:text-white transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-700/50 group-hover:bg-blue-500/20 flex items-center justify-center mr-3 transition-colors">
                  <FontAwesomeIcon icon={faCog} className="text-xs" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  Paramètres
                </span>
              </a>
            </nav>
          </div>

          {/* Stack technologique  */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white relative">
              Technologie
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-transparent"></div>
            </h4>
            <div className="space-y-3">
              <div className="flex items-center group">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mr-3">
                  <FontAwesomeIcon
                    icon={faMicrochip}
                    className="text-blue-400 text-xs"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-200">
                    ESP32 DHT11
                  </div>
                  <div className="text-xs text-gray-500">IoT Sensor</div>
                </div>
              </div>
              <div className="flex items-center group">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center mr-3">
                  <FontAwesomeIcon
                    icon={faPython}
                    className="text-green-400 text-xs"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-200">
                    Supabase
                  </div>
                  <div className="text-xs text-gray-500">Database & API</div>
                </div>
              </div>
              <div className="flex items-center group">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mr-3">
                  <FontAwesomeIcon
                    icon={faJsSquare}
                    className="text-yellow-400 text-xs"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-200">
                    Chart.js
                  </div>
                  <div className="text-xs text-gray-500">Visualisation</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur décoratif -- */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-r from-slate-900 to-gray-900 px-4">
              <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Footer bottom     */}
        <div className="flex justify-center items-center">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2025{' '}
              <span className="font-semibold text-white">
                SNEDAI DC Monitor
              </span>{' '}
              - Développé par{' '}
              <span className="text-orange-400 font-semibold">
                SNEDAI Technologies
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
