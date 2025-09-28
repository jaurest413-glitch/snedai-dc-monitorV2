export const DropdownButton = ({ selectedSite, onToggle }) => {
  const onDropClicked = () => {
    onToggle()
  }

  return (
    <button
      id="dropdown-btn"
      onClick={onDropClicked}
      className="w-full cursor-pointer bg-gradient-to-br from-primary to-info text-white px-6 py-4 rounded-2xl font-bold text-lg flex justify-between items-center shadow-lg shadow-primary/30 transition-all duration-400 hover:-translate-y-1 hover:scale-102 hover:shadow-2xl hover:shadow-primary/40 relative overflow-hidden"
    >
      <span id="selected-site">{selectedSite}</span>
      <span>▼</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
    </button>
  )
}
