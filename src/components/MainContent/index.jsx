import { SiteSelector } from '../SiteSelector'
import { LastUpdate } from '../LastUpdate'
import { Gauges } from '../Gauges'
import { EvolutionChartSection } from '../EvolutionChartSection'

export const MainContent = (props) => {
  const {
    latestReading,
    fetchLatestData,
    readings,
    selectedSite,
    handleSelectSite,
  } = props

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 main-content">
      <SiteSelector
        selectedSite={selectedSite}
        handleSelectSite={handleSelectSite}
      />
      <LastUpdate
        fetchLatestData={fetchLatestData}
        timestamp={latestReading.recorded_at}
      />
      <Gauges latestReading={latestReading} />
      <EvolutionChartSection readings={readings} selectedSite={selectedSite} />
    </div>
  )
}
