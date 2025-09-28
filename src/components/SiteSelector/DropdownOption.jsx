import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const DropdownOption = ({
  site,
  icon,
  status,
  statusText,
  statusColor,
  onClick,
}) => {
  return (
    <div
      className="dropdown-item px-5 py-4 font-semibold text-foreground hover:text-white cursor-pointer transition-all duration-300 hover:pl-6 relative overflow-hidden"
      onClick={() => onClick(site)}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <FontAwesomeIcon icon={icon} className={`mr-3 ${statusColor}`} />
          <div>
            <div className="font-semibold">{site}</div>
          </div>
        </div>
        <div className="text-right">
          <div
            className={`text-xs ${statusColor}/20 ${statusColor} px-2 py-1 rounded-full mb-1`}
          >
            {statusText}
          </div>
          {site === 'SANON' && (
            <div className="text-xs bg-green-600/20 text-green-700 px-2 py-1 rounded-full">
              Site actif
            </div>
          )}
        </div>
      </div>
      <div
        className={`absolute inset-0 bg-gradient-to-r from-${statusColor} to-${statusColor === 'text-success' ? 'emerald-600' : statusColor === 'text-warning' ? 'orange-600' : 'blue-600'} opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10`}
      ></div>
    </div>
  )
}
