import React, { useState, useEffect } from "react";

export default function PowerBIDashboard() {
  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState("--:--");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      updateLastSync();
    }, 2000);
  }, []);

  const updateLastSync = () => {
    const now = new Date();
    setLastSync(now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
  };

  const refreshPowerBI = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateLastSync();
    }, 2000);
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 mb-12 border border-white/30 shadow-xl shadow-primary/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold gradient-text bg-gradient-to-br from-primary to-accent powerbi-title">
          <i className="fas fa-chart-pie mr-2"></i> Dashboard PowerBI - DATACENTER V1.2
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-success bg-success/10 px-3 py-1 rounded-full flex items-center">
            <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse"></div>
            Connecté
          </div>
          <button
            onClick={refreshPowerBI}
            className="bg-gradient-to-br from-info to-primary text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            <i className="fas fa-sync-alt mr-2"></i> Actualiser
          </button>
        </div>
      </div>

      {/* PowerBI Dashboard Intégré */}
      <div className="relative bg-white rounded-2xl shadow-inner border border-gray-200 overflow-hidden">
        <div className="powerbi-container powerbi-chart" id="powerbi-container">
          <iframe
            id="powerbi-iframe"
            title="DATACENTER V1.2 - Dashboard IoT Optimisé"
            width="100%"
            height="804"
            src="https://app.powerbi.com/view?r=eyJrIjoiZWVmZGYyY2YtYzQxYy00OGJiLThkZjYtOTVjOGQxODQ4ZjE4IiwidCI6ImIwNGI3ZTQ1LWMyYzgtNGFiNC04M2VlLTE4YmJiNzVlNmZhZSIsImMiOjh9"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            style={{
              border: "none",
              borderRadius: "12px",
              maxWidth: "1024px",
              margin: "0 auto",
              display: "block",
            }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
          ></iframe>
        </div>

        {loading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6 mx-auto"></div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Chargement du Dashboard Power BI</h3>
              <p className="text-gray-600 font-semibold mb-4">Connexion aux données Supabase...</p>
              <p className="text-sm text-gray-500 mt-2">Cela peut prendre 30-60 secondes selon votre connexion</p>
            </div>
          </div>
        )}
      </div>

      {/* Contrôles PowerBI */}
      <div className="mt-6 flex items-center justify-between bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            <i className="fas fa-info-circle mr-1 text-info"></i>
            Dashboard connecté au service PowerBI
          </div>
          <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-md">
            Dernière sync: <span>{lastSync}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() =>
              window.open(
                "https://app.powerbi.com/view?r=eyJrIjoiZWVmZGYyY2YtYzQxYy00OGJiLThkZjYtOTVjOGQxODQ4ZjE4IiwidCI6ImIwNGI3ZTQ1LWMyYzgtNGFiNC04M2VlLTE4YmJiNzVlNmZhZSIsImMiOjh9",
                "_blank"
              )
            }
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <i className="fas fa-external-link-alt mr-1"></i> Ouvrir dans PowerBI
          </button>
        </div>
      </div>
    </div>
  );
}
