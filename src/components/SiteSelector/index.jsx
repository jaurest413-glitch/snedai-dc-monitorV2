import { useState } from 'react'
import { DropdownButton } from './DropdownButton'
import { DropdownOption } from './DropdownOption'
import {
  faBuilding,
  faMountain,
  faIndustry,
} from '@fortawesome/free-solid-svg-icons'

export const SiteSelector = (props) => {
  const { selectedSite, handleSelectSite } = props
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const selectSite = (site) => {
    handleSelectSite(site)
    setIsDropdownOpen(false)
  }

  const sites = [
    {
      name: 'SANON',
      icon: faIndustry,
      statusColor: 'text-success',
      statusText: 'Système déployé',
    },
    {
      name: 'SIEGE',
      icon: faBuilding,
      statusColor: 'text-warning',
      statusText: 'Hors ligne',
    },
    {
      name: 'PLATEAU',
      icon: faMountain,
      statusColor: 'text-info',
      statusText: 'Hors ligne',
    },
  ]

  return (
    <div className="site-selector-container bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl rounded-3xl p-8 mb-12 shadow-xl shadow-primary/10 relative border border-white/30">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-info animate-gradient"></div>
      <h2 className="text-xl font-extrabold mb-6 gradient-text bg-gradient-to-br from-primary to-accent flex items-center card-title">
        <i className="fas fa-building mr-2"></i> Sélectionner le site à
        surveiller
      </h2>
      <div className="dropdown-container relative inline-block min-w-[350px]">
        <DropdownButton selectedSite={selectedSite} onToggle={toggleDropdown} />

        {isDropdownOpen && (
          <div
            className={`${isDropdownOpen ? 'block' : 'hidden'} absolute w-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/15 border border-white/30  overflow-hidden`}
          >
            {sites.map((site) => (
              <DropdownOption
                key={site.name}
                site={site.name}
                icon={site.icon}
                statusColor={site.statusColor}
                statusText={site.statusText}
                onClick={selectSite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
