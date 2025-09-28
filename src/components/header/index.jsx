export const Header = ({ onNavigate, currentPage = 'home' }) => {
  return (
    <header className="glass-effect border-b border-white/20 sticky top-0 z-[100] shadow-xl shadow-[rgba(31,38,135,0.37)]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-info rounded-xl flex items-center justify-center text-white font-bold text-xl relative overflow-hidden shadow-xl shadow-primary/30">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
            S
          </div>
          <h1 className="text-2xl font-black gradient-text bg-gradient-to-br from-primary to-accent long-title">
            SNEDAI DC MONITORING
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div id="connection-status" className="hidden">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              Connecté
            </span>
          </div>

          <ul className="flex space-x-2">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate('home')
                }}
                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-400 relative overflow-hidden ${
                  currentPage === 'home' 
                    ? 'text-white bg-gradient-to-br from-primary to-info shadow-lg hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40' 
                    : 'text-muted bg-white/10 backdrop-blur-md border border-white/20 hover:text-white hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40'
                }`}
              >
                <span className="mr-2">🏠</span> Accueil
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate('dashboard')
                }}
                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-400 relative overflow-hidden ${
                  currentPage === 'dashboard' 
                    ? 'text-white bg-gradient-to-br from-primary to-info shadow-lg hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40' 
                    : 'text-muted bg-white/10 backdrop-blur-md border border-white/20 hover:text-white hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40'
                }`}
              >
               <span className="mr-2">📊</span> Dashboard
                {currentPage !== 'dashboard' && (
                  <span className="absolute inset-0 bg-gradient-to-br from-primary to-info rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                )}
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate('about')
                }}
                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-400 relative overflow-hidden ${
                  currentPage === 'about' 
                    ? 'text-white bg-gradient-to-br from-primary to-info shadow-lg hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40' 
                    : 'text-muted bg-white/10 backdrop-blur-md border border-white/20 hover:text-white hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40'
                }`}
              >
                <span className="mr-2">ℹ️</span>
                <span className="nav-text">À propos</span>
                {currentPage !== 'about' && (
                  <span className="absolute inset-0 bg-gradient-to-br from-primary to-info rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                )}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}