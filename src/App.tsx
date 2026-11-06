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
  Award,
  CircleDot,
  Info,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { ScannerModal } from './components/ScannerModal';
import { PointsGuideModal } from './components/PointsGuideModal';
import type { DepositResult, Reward, Quest, LeaderboardUser, EntityLeaderboard } from './types';

export function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState<'home' | 'leaderboard' | 'rewards'>('home');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  
  // Interactive user state for pitch: realistic student units
  const [userPoints, setUserPoints] = useState(140);
  const [bottlesDeposited, setBottlesDeposited] = useState(12);
  const [capsDeposited, setCapsDeposited] = useState(16);
  const [weightGrams, setWeightGrams] = useState(384); // 12 botellas x 28g + 16 tapitas x 3g = 384 gramos
  const [co2SavedGrams, setCo2SavedGrams] = useState(576);
  const [activeStreak] = useState(4);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [claimedSuccess, setClaimedSuccess] = useState(false);

  // Leaderboard filter
  const [leaderboardFilter, setLeaderboardFilter] = useState<'individual' | 'entity'>('individual');

  // Realistic individual metrics: students deposit between 6 and 30 items per week
  const individualLeaderboard: LeaderboardUser[] = [
    { rank: 1, name: 'Valeria Méndez', entity: 'Ing. Biomédica', avatar: 'VM', bottlesCount: 28, capsCount: 34, weightGrams: 886, points: 410 },
    { rank: 2, name: 'Carlos Arriaga', entity: 'Administración', avatar: 'CA', bottlesCount: 24, capsCount: 22, weightGrams: 738, points: 350 },
    { rank: 3, name: 'Sofía Téllez', entity: 'Diseño Gráfico', avatar: 'ST', bottlesCount: 19, capsCount: 28, weightGrams: 616, points: 295 },
    { 
      rank: 7, 
      name: 'Tu Perfil (Demo)', 
      entity: 'UVP Campus Central', 
      avatar: 'TU', 
      bottlesCount: bottlesDeposited, 
      capsCount: capsDeposited, 
      weightGrams: weightGrams, 
      points: userPoints, 
      isCurrentUser: true 
    },
    { rank: 8, name: 'Esteban Morales', entity: 'Ing. Sistemas', avatar: 'EM', bottlesCount: 10, capsCount: 14, weightGrams: 322, points: 135 },
  ];

  // Collective entity metrics: campus-level sum of hundreds of students makes kilograms sensible
  const entityLeaderboard: EntityLeaderboard[] = [
    { rank: 1, name: 'Facultad de Ingenierías', bottlesCount: 4210, recycledKg: 118.2, participants: 184 },
    { rank: 2, name: 'Facultad de Negocios y Turismo', bottlesCount: 3140, recycledKg: 89.4, participants: 142 },
    { rank: 3, name: 'Ciencias de la Salud', bottlesCount: 2450, recycledKg: 68.6, participants: 119 },
  ];

  const quest: Quest = {
    id: 'q1',
    title: 'Meta Colectiva: 250 Kg en Campus UVP',
    currentKg: 184,
    targetKg: 250,
    unit: 'Kg colectivos',
    rewardPoints: 50,
    daysLeft: 5,
    sponsor: 'Banco de Tapitas A.C.'
  };

  const rewards: Reward[] = [
    {
      id: 'r1',
      title: 'Café de Especialidad UVP',
      category: 'Cafetería',
      pointsCost: 75,
      description: 'Canjeable por 1 café americano o capuchino en cafetería central del campus.',
      partner: 'Cafetería Central UVP',
      icon: 'coffee',
      available: true,
    },
    {
      id: 'r2',
      title: 'Termo Reutilizable Térmico',
      category: 'Campus',
      pointsCost: 200,
      description: 'Termo de acero inoxidable de 600ml de grado alimentario, libre de BPA.',
      partner: 'Tienda Institucional UVP',
      icon: 'package',
      available: true,
    },
    {
      id: 'r3',
      title: 'Constancia de Horas RSU',
      category: 'Académico',
      pointsCost: 300,
      description: 'Acreditación oficial de 10 horas de Responsabilidad Social y Compromiso Ecológico.',
      partner: 'Dirección de Formación Integral',
      icon: 'award',
      available: true,
    },
  ];

  const renderRewardIcon = (icon: 'coffee' | 'package' | 'award') => {
    switch (icon) {
      case 'coffee':
        return <Coffee className="w-5 h-5 text-emerald-700" />;
      case 'package':
        return <Package className="w-5 h-5 text-emerald-700" />;
      case 'award':
        return <Award className="w-5 h-5 text-emerald-700" />;
    }
  };

  const handleDepositSuccess = (result: DepositResult) => {
    setUserPoints(prev => prev + result.pointsEarned);
    setBottlesDeposited(prev => prev + result.bottlesCount);
    setCapsDeposited(prev => prev + result.capsCount);
    setWeightGrams(prev => prev + result.weightGrams);
    setCo2SavedGrams(prev => prev + result.co2SavedGrams);
  };

  const handleRedeemReward = (reward: Reward) => {
    if (userPoints >= reward.pointsCost) {
      setUserPoints(prev => prev - reward.pointsCost);
      setClaimedSuccess(true);
      setTimeout(() => {
        setClaimedSuccess(false);
        setSelectedReward(null);
      }, 2400);
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-slate-950 flex justify-center py-0 sm:py-6 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Shell Móvil Premium Adaptable a iOS/Android */}
      <main className="w-full sm:max-w-[420px] bg-slate-50 min-h-screen min-h-[100dvh] sm:min-h-[840px] sm:max-h-[920px] sm:rounded-[36px] shadow-2xl flex flex-col overflow-hidden sm:border sm:border-slate-800/60 relative">
        
        {/* Cabecera Institucional con Safe Area Top */}
        <header className="px-5 pt-safe pb-3.5 bg-white border-b border-slate-200/80 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-base shadow-xs shrink-0">
              P
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-bold text-slate-900 tracking-tight">Pialia EcoSort</h1>
                <span className="text-[10px] px-1.5 py-0.5 font-bold bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200/60">
                  UVP Puebla
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                Estación Campus Central • En Línea
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-full border border-amber-200 text-amber-900 text-xs font-bold shrink-0">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{activeStreak} días racha</span>
          </div>
        </header>

        {/* Contenido con Scroll fluido */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 pb-safe-nav space-y-4">
          
          {/* TAB: INICIO */}
          {activeTab === 'home' && (
            <>
              {/* Tarjeta de Impacto Individual Realista */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3.5 pb-2.5 border-b border-slate-100">
                  <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Auditoría Personal del Estudiante
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Mat: UVP-2026
                  </span>
                </div>

                {/* Métricas Primarias: Envases & Puntos */}
                <div className="grid grid-cols-2 gap-4 pb-4">
                  <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[11px] font-semibold text-slate-500">Saldo Canjeable</span>
                        <button
                          onClick={() => setIsGuideOpen(true)}
                          title="¿Cómo ganar puntos?"
                          aria-label="Ver equivalencias de puntos"
                          className="text-[10px] text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-0.5 transition-colors"
                        >
                          <HelpCircle className="w-3 h-3" />
                          <span>Guía</span>
                        </button>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                          {userPoints}
                        </span>
                        <span className="text-xs text-emerald-700 font-bold">pts</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">Listo para cafetería</span>
                  </div>

                  <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">Envases Aportados</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-emerald-800 tracking-tight tabular-nums">
                          {bottlesDeposited + capsDeposited}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">uds</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      {bottlesDeposited} botellas • {capsDeposited} tapitas
                    </span>
                  </div>
                </div>

                {/* Sub-métricas Técnicas Reales (Gramos auditados por báscula IoT) */}
                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <CircleDot className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Masa real: <strong className="text-slate-900 font-bold tabular-nums">{weightGrams} gramos</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 justify-end">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>CO2 evitado: <strong className="text-slate-900 font-bold tabular-nums">{co2SavedGrams} g</strong></span>
                  </div>
                </div>
              </div>

              {/* Botón Principal: Escanear Residuo */}
              <button
                onClick={() => setIsScannerOpen(true)}
                className="w-full py-4 px-4 sm:px-5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white rounded-2xl shadow-lg shadow-emerald-700/20 font-bold text-sm transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold leading-tight">Depositar Residuo</div>
                    <div className="text-emerald-100 text-xs font-normal">Clasificación asistida por visión artificial</div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </button>

              {/* Meta Colectiva del Campus (Donde los kilos SÍ tienen sentido grupal) */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-amber-50 text-amber-700">
                      <Trophy className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs font-bold text-slate-900">{quest.title}</span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    +{quest.rewardPoints} pts bono
                  </span>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2 overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-2.5 rounded-full transition-all duration-700" 
                    style={{ width: `${(quest.currentKg / quest.targetKg) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span className="tabular-nums">
                    <strong>{quest.currentKg} Kg</strong> de {quest.targetKg} Kg ({((quest.currentKg / quest.targetKg) * 100).toFixed(0)}%)
                  </span>
                  <span className="flex items-center gap-1 text-slate-400 font-medium">
                    <Clock className="w-3 h-3" />
                    Quedan {quest.daysLeft} días
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Alianza: {quest.sponsor}</span>
                  <span className="font-semibold text-emerald-700">Meta Comunitaria</span>
                </div>
              </div>

              {/* Banner / Acceso a Guía de Puntos */}
              <button
                onClick={() => setIsGuideOpen(true)}
                className="w-full p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 hover:from-emerald-100/70 hover:to-teal-100/70 rounded-2xl border border-emerald-200/80 text-left transition-all shadow-2xs flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>¿Cómo ganar puntos?</span>
                      <span className="text-[10px] bg-emerald-700 text-white px-1.5 py-0.2 rounded font-bold">
                        3 botellas = 1 café
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Revisa equivalencias reales, bonos de racha y retos de campus
                    </p>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-emerald-800 shadow-2xs group-hover:translate-x-0.5 transition-transform">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>

              {/* Acceso Rápido */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveTab('leaderboard')}
                  className="p-3.5 bg-white rounded-2xl border border-slate-200 text-left hover:border-slate-300 transition-colors shadow-xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">Ranking Real</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Envases individuales</div>
                </button>

                <button
                  onClick={() => setActiveTab('rewards')}
                  className="p-3.5 bg-white rounded-2xl border border-slate-200 text-left hover:border-slate-300 transition-colors shadow-xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">Recompensas</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Cafetería y campus</div>
                </button>
              </div>

              {/* Nota de Transparencia de Escala */}
              <div className="bg-slate-100/80 rounded-xl p-3 flex items-start gap-2.5 text-slate-600 text-[11px]">
                <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p>
                  1 botella de 600ml pesa aprox. <strong>28 gramos</strong>. 1 tapita pesa <strong>3 gramos</strong>. Tu progreso se audita por pieza y por peso real en la estación.
                </p>
              </div>
            </>
          )}

          {/* TAB: RANKING / CLASIFICACIÓN */}
          {activeTab === 'leaderboard' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Tabla de Clasificación</h2>
                <p className="text-xs text-slate-500 mt-0.5">Medición real por botellas y tapitas auditadas</p>
              </div>

              {/* Selector de Vista */}
              <div className="flex bg-slate-200/70 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setLeaderboardFilter('individual')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    leaderboardFilter === 'individual' 
                      ? 'bg-white text-slate-900 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Estudiantes (Envases)
                </button>
                <button
                  onClick={() => setLeaderboardFilter('entity')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    leaderboardFilter === 'entity' 
                      ? 'bg-white text-slate-900 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Facultades (Kilos)
                </button>
              </div>

              {leaderboardFilter === 'individual' ? (
                <div className="space-y-2">
                  <div className="text-[11px] text-slate-400 px-1 flex justify-between">
                    <span>Posición & Alumno</span>
                    <span>Envases / Gramos / Puntos</span>
                  </div>
                  {individualLeaderboard.map((item) => (
                    <div
                      key={item.name}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                        item.isCurrentUser
                          ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                          : 'bg-white border-slate-200'
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
                              <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-semibold">
                                Tu Perfil
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">{item.entity}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-900 tabular-nums">
                          {item.bottlesCount + item.capsCount} envases
                        </div>
                        <div className="text-[10px] text-slate-500 tabular-nums">
                          {item.weightGrams}g • <span className="text-emerald-700 font-semibold">{item.points} pts</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="text-[11px] text-slate-400 px-1">
                    Acumulado colectivo inter-facultades UVP
                  </div>
                  {entityLeaderboard.map((item) => (
                    <div key={item.name} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                            <Building2 className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-slate-900">{item.name}</span>
                        </div>
                        <span className="text-xs font-extrabold text-emerald-800 tabular-nums">
                          {item.recycledKg} Kg
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                        <span className="tabular-nums">{item.bottlesCount.toLocaleString()} botellas procesadas</span>
                        <span>{item.participants} alumnos participando</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: RECOMPENSAS */}
          {activeTab === 'rewards' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Catálogo de Recompensas</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Financiado por economía circular UVP</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Saldo</span>
                  <div className="text-sm font-extrabold text-emerald-700 tabular-nums">{userPoints} pts</div>
                </div>
              </div>

              {/* Botón "¿Cómo ganar puntos?" en Recompensas */}
              <button
                onClick={() => setIsGuideOpen(true)}
                className="w-full p-3 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/80 rounded-2xl flex items-center justify-between transition-colors text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      ¿Cómo ganar más puntos?
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Conoce las equivalencias y metas para desbloquear premios
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              <div className="space-y-3">
                {rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                        {renderRewardIcon(reward.icon)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
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
                        className={`py-1.5 px-3.5 rounded-xl text-xs font-semibold transition-all ${
                          userPoints >= reward.pointsCost
                            ? 'bg-slate-900 text-white hover:bg-slate-800'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {userPoints >= reward.pointsCost ? 'Canjear Cupón' : 'Faltan Puntos'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal de Canje de Cupón */}
        {selectedReward && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl border border-slate-100">
              {claimedSuccess ? (
                <div className="py-4 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Cupón Canjeado con Éxito</h3>
                  <p className="text-xs text-slate-500">
                    Se descontaron {selectedReward.pointsCost} puntos de tu saldo. Muestra el código en caja.
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
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
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
                    >
                      Confirmar Canje ({selectedReward.pointsCost} pts)
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Modal del Escáner Asistido por IA */}
        <ScannerModal
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onSuccess={handleDepositSuccess}
        />

        {/* Modal de Guía de Puntos y Equivalencias */}
        <PointsGuideModal
          isOpen={isGuideOpen}
          onClose={() => setIsGuideOpen(false)}
          onOpenScanner={() => setIsScannerOpen(true)}
        />

        {/* Barra de Navegación Inferior Robusta (Safe Area Bottom para iOS Home Bar y Android Gestures) */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-6 pt-2 pb-safe flex items-center justify-around z-10">
          <button
            onClick={() => setActiveTab('home')}
            className={`min-h-[44px] min-w-[56px] flex flex-col items-center justify-center gap-0.5 transition-colors ${
              activeTab === 'home' ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Recycle className="w-5 h-5" />
            <span className="text-[10px]">Inicio</span>
          </button>

          <button
            onClick={() => setIsScannerOpen(true)}
            className="flex flex-col items-center -mt-5 min-h-[56px] justify-center"
          >
            <div className="w-13 h-13 rounded-full bg-emerald-600 shadow-md shadow-emerald-700/30 flex items-center justify-center text-white active:scale-95 transition-transform p-3.5">
              <Camera className="w-6 h-6" />
            </div>
            <span className="text-[10px] text-slate-700 font-bold mt-1">Escanear</span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`min-h-[44px] min-w-[56px] flex flex-col items-center justify-center gap-0.5 transition-colors ${
              activeTab === 'leaderboard' ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-[10px]">Ranking</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`min-h-[44px] min-w-[56px] flex flex-col items-center justify-center gap-0.5 transition-colors ${
              activeTab === 'rewards' ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-600'
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
