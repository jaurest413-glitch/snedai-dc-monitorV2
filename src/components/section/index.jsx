export const Section = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 py-16 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 gradient-text bg-gradient-to-br from-primary to-accent long-title animate-fadeInUp">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Surveillance IoT
          </span>
          <span className="bg-gradient-to-r from-accent to-error bg-clip-text text-transparent">
            {' '}
            Premium
          </span>
        </h1>
        <p className="text-xl text-muted mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeInUpDelayed">
          Monitoring intelligent de vos infrastructures critiques en temps réel
          avec des alertes proactives et des analyses avancées.
        </p>
      </div>
    </section>
  )
}
