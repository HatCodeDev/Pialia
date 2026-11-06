import { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Gift, 
  Camera, 
  Recycle, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Check, 
  Building2, 
  QrCode,
  MapPin,
  Coffee,
  Package,
  Award
} from 'lucide-react';
import { ScannerModal } from './components/ScannerModal';
import type { DepositResult, Reward, Quest, LeaderboardUser } from './types';

export function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState<'home' | 'leaderboard' | 'rewards'>('home');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  
  // Interactive user state for pitch
  const [userPoints, setUserPoints] = useState(450);
  const [recycledGrams, setRecycledGrams] = useState(3840);
  const [co2SavedGrams, setCo2SavedGrams] = useState(5760);
  const [activeStreak] = useState(5);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [claimedSuccess, setClaimedSuccess] = useState(false);

  // Leaderboard filter
  const [leaderboardFilter, setLeaderboardFilter] = useState<'individual' | 'entity'>('individual');

  const individualLeaderboard: LeaderboardUser[] = [
    { rank: 1, name: 'Valeria Méndez', entity: 'Ing. Biomédica', avatar: 'VM', recycledKg: 18.4, points: 1240 },
    { rank: 2, name: 'Carlos Arriaga', entity: 'Administración', avatar: 'CA', recycledKg: 15.2, points: 1010 },
    { rank: 3, name: 'Sofía Téllez', entity: 'Diseño Gráfico', avatar: 'ST', recycledKg: 14.8, points: 980 },
    { rank: 14, name: 'Tu Perfil (Demo)', entity: 'Campus Central', avatar: 'TU', recycledKg: 3.8, points: userPoints, isCurrentUser: true },
    { rank: 4, name: 'Esteban Morales', entity: 'Ing. Sistemas', avatar: 'EM', recycledKg: 12.1, points: 850 },
  ];

  const entityLeaderboard = [
    { rank: 1, name: 'Facultad de Ingenierías', recycledKg: 240.5, participants: 84 },
    { rank: 2, name: 'Facultad de Negocios y Turismo', recycledKg: 188.2, participants: 62 },
    { rank: 3, name: 'Ciencias de la Salud', recycledKg: 142.0, participants: 49 },
  ];

  const quest: Quest = {
    id: 'q1',
    title: 'Meta Colectiva: 500 Kg de PET Limpio',
    current: 382,
    target: 500,
    unit: 'Kg',
    rewardPoints: 200,
    daysLeft: 4,
    sponsor: 'Banco de Tapitas A.C.'
  };

  const rewards: Reward[] = [
    {
      id: 'r1',
      title: 'Café de Especialidad',
      category: 'Cafetería',
      pointsCost: 150,
      description: 'Válido para 1 café americano o capuchino en cafeterías aliadas del campus.',
      partner: 'Cafetería Central',
      icon: 'coffee',
      available: true,
    },
    {
      id: 'r2',
      title: 'Termo Reutilizable de Acero',
      category: 'Campus',
      pointsCost: 400,
      description: 'Termo térmico de 600ml de grado alimentario, libre de BPA.',
      partner: 'Tienda Institucional',
      icon: 'package',
      available: true,
    },
    {
      id: 'r3',
      title: 'Acreditación de Servicio y RSU',
      category: 'Académico',
      pointsCost: 650,
      description: 'Constancia de 10 horas de Responsabilidad Social y Compromiso Ecológico.',
      partner: 'Dirección de RSU',
      icon: 'award',
      available: true,
    },
  ];

  const renderRewardIcon = (icon: string) => {
    switch (icon) {
      case 'coffee':
        return <Coffee className="w-5 h-5 text-slate-700" />;
      case 'package':
        return <Package className="w-5 h-5 text-slate-700" />;
      case 'award':
        return <Award className="w-5 h-5 text-slate-700" />;
      default:
        return <Gift className="w-5 h-5 text-slate-700" />;
    }
  };

  const handleDepositSuccess = (result: DepositResult) => {
    setUserPoints(prev => prev + result.pointsEarned);
    setRecycledGrams(prev => prev + result.weightGrams);
    setCo2SavedGrams(prev => prev + result.co2SavedGrams);
  };

  const handleRedeemReward = (reward: Reward) => {
    if (userPoints >= reward.pointsCost) {
      setUserPoints(prev => prev - reward.pointsCost);
      setClaimedSuccess(true);
      setTimeout(() => {
        setClaimedSuccess(false);
        setSelectedReward(null);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center py-0 sm:py-8 font-sans selection:bg-bio-500 selection:text-white">
      {/* Mobile Shell */}
      <main className="w-full max-w-[420px] bg-slate-50 min-h-screen sm:min-h-[860px] sm:rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-slate-200/80 relative">
        
        {/* Top Header */}
        <header className="px-5 pt-6 pb-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-bio-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              P
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-bold text-slate-900 tracking-tight">Pialia EcoSort</h1>
                <span className="text-[10px] px-1.5 py-0.2 font-semibold bg-bio-50 text-bio-700 rounded-md border border-bio-200">
                  Demo
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                Estación Central • Activa
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 rounded-full border border-amber-200 text-amber-800 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{activeStreak} días</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 pb-24 space-y-5">
          
          {/* TAB: HOME */}
          {activeTab === 'home' && (
            <>
              {/* Verified Impact Card */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-bio-600" />
                    Balance de Impacto Verificado
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">ID: UVP-2026-94</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Puntos Acumulados</span>
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                      {userPoints}
                    </span>
                    <span className="text-xs text-bio-600 font-semibold ml-1.5">Pts</span>
                  </div>

                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Plástico Limpio</span>
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                      {(recycledGrams / 1000).toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold ml-1.5">Kg</span>
                  </div>
                </div>

                <div className="pt-3.5 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-bio-600" />
                    <span>CO2 Evitado: <strong className="text-slate-800 font-semibold tabular-nums">{(co2SavedGrams / 1000).toFixed(2)} kg</strong></span>
                  </div>
                  <span className="text-[11px] text-bio-700 font-medium">99.4% pureza</span>
                </div>
              </div>

              {/* Action Button: Scan */}
              <button
                onClick={() => setIsScannerOpen(true)}
                className="w-full py-4 px-5 bg-bio-600 hover:bg-bio-700 active:scale-[0.99] text-white rounded-2xl shadow-lg shadow-bio-600/20 font-bold text-sm transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold leading-tight">Depositar Residuo</div>
                    <div className="text-bio-100 text-xs font-normal">Escaneo y validación por IA</div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </button>

              {/* Collective Quest */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-amber-50 text-amber-700">
                      <Trophy className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs font-bold text-slate-900">{quest.title}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    +{quest.rewardPoints} pts
                  </span>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
                  <div 
                    className="bg-bio-600 h-2 rounded-full transition-all duration-700" 
                    style={{ width: `${(quest.current / quest.target) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="tabular-nums">
                    <strong>{quest.current}</strong> de {quest.target} {quest.unit} recolectados
                  </span>
                  <span className="flex items-center gap-1 text-slate-400 font-medium">
                    <Clock className="w-3 h-3" />
                    Quedan {quest.daysLeft} días
                  </span>
                </div>
              </div>

              {/* Quick Shortcuts */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveTab('leaderboard')}
                  className="p-3.5 bg-white rounded-2xl border border-slate-200/80 text-left hover:border-slate-300 transition-colors shadow-xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">Ranking Activo</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Top donadores del mes</div>
                </button>

                <button
                  onClick={() => setActiveTab('rewards')}
                  className="p-3.5 bg-white rounded-2xl border border-slate-200/80 text-left hover:border-slate-300 transition-colors shadow-xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-bio-50 text-bio-600 flex items-center justify-center mb-2">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">Premios & Alianzas</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Canjea tus puntos</div>
                </button>
              </div>
            </>
          )}

          {/* TAB: LEADERBOARD */}
          {activeTab === 'leaderboard' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Tabla de Clasificación</h2>
                <p className="text-xs text-slate-500 mt-0.5">Competencia transparente por impacto ecológico real</p>
              </div>

              {/* Filter Selector */}
              <div className="flex bg-slate-200/70 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setLeaderboardFilter('individual')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    leaderboardFilter === 'individual' 
                      ? 'bg-white text-slate-900 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Individual
                </button>
                <button
                  onClick={() => setLeaderboardFilter('entity')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    leaderboardFilter === 'entity' 
                      ? 'bg-white text-slate-900 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Por Facultades
                </button>
              </div>

              {leaderboardFilter === 'individual' ? (
                <div className="space-y-2">
                  {individualLeaderboard.map((item) => (
                    <div
                      key={item.name}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                        item.isCurrentUser
                          ? 'bg-bio-50/70 border-bio-300 shadow-xs'
                          : 'bg-white border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 text-center text-xs font-bold ${
                          item.rank === 1 ? 'text-amber-500' :
                          item.rank === 2 ? 'text-slate-400' :
                          item.rank === 3 ? 'text-amber-700' : 'text-slate-400'
                        }`}>
                          #{item.rank}
                        </span>

                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                          {item.avatar}
                        </div>

                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            {item.name}
                            {item.isCurrentUser && (
                              <span className="text-[10px] bg-bio-600 text-white px-1.5 py-0.2 rounded font-semibold">
                                Vos
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">{item.entity}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-900 tabular-nums">
                          {item.points} pts
                        </div>
                        <div className="text-[11px] text-slate-400 tabular-nums">
                          {item.recycledKg} kg
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {entityLeaderboard.map((item) => (
                    <div key={item.name} className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-bio-600" />
                          <span className="text-xs font-bold text-slate-900">{item.name}</span>
                        </div>
                        <span className="text-xs font-bold text-bio-700 tabular-nums">{item.recycledKg} Kg</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.participants} estudiantes activos contribuyendo
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: REWARDS */}
          {activeTab === 'rewards' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Catálogo de Recompensas</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Financiado por economía circular y alianzas</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Disponibles</span>
                  <div className="text-sm font-extrabold text-bio-600 tabular-nums">{userPoints} pts</div>
                </div>
              </div>

              <div className="space-y-3">
                {rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                        {renderRewardIcon(reward.icon)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-bio-700 bg-bio-50 px-2 py-0.5 rounded">
                            {reward.category}
                          </span>
                          <span className="text-xs font-extrabold text-slate-900 tabular-nums">
                            {reward.pointsCost} pts
                          </span>
                        </div>
                        <h3 className="text-xs font-bold text-slate-900 mt-1">{reward.title}</h3>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">{reward.description}</p>
                      </div>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">{reward.partner}</span>
                      <button
                        onClick={() => setSelectedReward(reward)}
                        disabled={userPoints < reward.pointsCost}
                        className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                          userPoints >= reward.pointsCost
                            ? 'bg-slate-900 text-white hover:bg-slate-800'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {userPoints >= reward.pointsCost ? 'Canjear Cupón' : 'Puntos Insuficientes'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Redeem Coupon */}
        {selectedReward && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl border border-slate-100">
              {claimedSuccess ? (
                <div className="py-4 space-y-3">
                  <div className="w-12 h-12 bg-bio-100 text-bio-600 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Cupón Canjeado con Éxito</h3>
                  <p className="text-xs text-slate-500">
                    Se han descontado {selectedReward.pointsCost} puntos de tu saldo.
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    {renderRewardIcon(selectedReward.icon)}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedReward.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{selectedReward.partner}</p>

                  <div className="my-5 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center">
                    <QrCode className="w-32 h-32 text-slate-800 mb-2" />
                    <span className="text-[10px] font-mono text-slate-400">ECO-CUPON-{selectedReward.id.toUpperCase()}-2026</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedReward(null)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Cerrar
                    </button>
                    <button
                      onClick={() => handleRedeemReward(selectedReward)}
                      className="flex-1 py-2.5 rounded-xl bg-bio-600 hover:bg-bio-700 text-white text-xs font-semibold shadow-xs"
                    >
                      Confirmar Canje
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Modal Scanner IA Simulator */}
        <ScannerModal
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onSuccess={handleDepositSuccess}
        />

        {/* Bottom TabBar */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-6 py-2.5 flex items-center justify-around z-10">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'home' ? 'text-bio-600 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Recycle className="w-5 h-5" />
            <span className="text-[10px]">Inicio</span>
          </button>

          <button
            onClick={() => setIsScannerOpen(true)}
            className="flex flex-col items-center -mt-5"
          >
            <div className="w-12 h-12 rounded-full bg-bio-600 shadow-md shadow-bio-600/30 flex items-center justify-center text-white active:scale-95 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-slate-600 font-medium mt-1">Escanear</span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'leaderboard' ? 'text-bio-600 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-[10px]">Ranking</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'rewards' ? 'text-bio-600 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Gift className="w-5 h-5" />
            <span className="text-[10px]">Premios</span>
          </button>
        </nav>

      </main>
    </div>
  );
}
export default App;
