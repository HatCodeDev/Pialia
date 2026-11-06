import type { FC } from 'react';
import { 
  X, 
  HelpCircle, 
  Sparkles, 
  Flame, 
  Coffee, 
  Award, 
  Check, 
  ArrowRight,
  TrendingUp,
  Scale,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface PointsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenScanner?: () => void;
}

export const PointsGuideModal: FC<PointsGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenScanner
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="guide-title"
        className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]"
      >
        {/* Cabecera del Modal */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50/70 to-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 id="guide-title" className="text-sm font-bold text-slate-900">
                Guía de Puntos & Equivalencias
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Economía circular transparente y alcanzable en Campus UVP
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar guía de puntos"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contenido con scroll */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-slate-800">
          
          {/* Bloque Destacado: El Principio Esfuerzo vs. Recompensa */}
          <div className="bg-emerald-950 text-white rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-sm">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold tracking-wider uppercase mb-2">
                <Sparkles className="w-3 h-3 text-emerald-300" />
                Impacto Real y alcanzable
              </div>
              <h3 className="text-base font-extrabold text-white leading-tight">
                ¿Cuánto esfuerzo cuesta un café gratis?
              </h3>
              <p className="text-xs text-emerald-100/90 mt-1.5 leading-relaxed">
                No necesitas kilos imposibles ni cientos de envases. Con sólo el consumo de una semana universitaria obtienes recompensas directas y tangibles.
              </p>

              {/* Comparador Visual Directo */}
              <div className="mt-3.5 pt-3 border-t border-emerald-800/80 grid grid-cols-2 gap-3 text-left">
                <div className="bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-700/50">
                  <div className="text-[10px] text-emerald-300 uppercase font-semibold">Opción 1: Botellas</div>
                  <div className="text-sm font-extrabold text-white mt-0.5">3 Botellas PET</div>
                  <div className="text-[11px] text-emerald-200 mt-1 flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 text-emerald-400" />
                    <span>= 75 pts (1 Café)</span>
                  </div>
                </div>

                <div className="bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-700/50">
                  <div className="text-[10px] text-emerald-300 uppercase font-semibold">Opción 2: Tapitas</div>
                  <div className="text-sm font-extrabold text-white mt-0.5">8 Tapitas HDPE</div>
                  <div className="text-[11px] text-emerald-200 mt-1 flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 text-emerald-400" />
                    <span>= 80 pts (1 Café)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Acento sutil en background */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Sección 1: Tabla de Tarifas Base por Envase */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-slate-400" />
                Puntaje Base por Material Verificado
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Balanza IoT 0.1g</span>
            </div>

            <div className="space-y-2">
              {/* Fila 1: Botella */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-emerald-700 shrink-0 shadow-2xs">
                    PET
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">1 Botella PET</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-emerald-50 text-emerald-700 rounded font-semibold border border-emerald-200/60">
                        Limpia y aplastada
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Refrescos o aguas (350ml a 1.5L) • Masa aprox. 15g a 30g
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-2">
                  <div className="text-sm font-black text-emerald-700 tabular-nums">+25 pts</div>
                  <div className="text-[10px] text-slate-400 font-medium">Por unidad</div>
                </div>
              </div>

              {/* Fila 2: Tapita */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-emerald-700 shrink-0 shadow-2xs">
                    HDPE
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">1 Tapita Plástica</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-emerald-50 text-emerald-700 rounded font-semibold border border-emerald-200/60">
                        Polímero 02 o 05
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Tapas de rosca de bebidas y lácteos • Masa aprox. 2g a 3g
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-2">
                  <div className="text-sm font-black text-emerald-700 tabular-nums">+10 pts</div>
                  <div className="text-[10px] text-slate-400 font-medium">Por unidad</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 2: Bonificaciones y Multiplicadores */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Bonos Especiales & Constancia
              </span>
              <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Aceleradores
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Racha Diaria */}
              <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/70">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                  </div>
                  <span className="text-xs font-bold text-slate-900">Racha Semanal (5 Días)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Depositar al menos 1 envase al día de lunes a viernes en el campus.
                </p>
                <div className="mt-2 text-xs font-extrabold text-amber-800">
                  +20 pts bono adicional
                </div>
              </div>

              {/* Retos Colectivos */}
              <div className="p-3 bg-indigo-50/60 rounded-2xl border border-indigo-200/70">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-900">Retos Colectivos</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Cumplir la meta de la semana con tu facultad o campus UVP.
                </p>
                <div className="mt-2 text-xs font-extrabold text-indigo-800">
                  +50 a +100 pts por meta
                </div>
              </div>
            </div>
          </div>

          {/* Sección 3: Tabla de Recompensas y Esfuerzo Requerido */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-emerald-600" />
                ¿Qué puedes canjear y cuánto necesitas?
              </span>
              <span className="text-[10px] text-slate-400">Sin sorteos</span>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 text-xs">
              <div className="p-3 bg-slate-50/80 grid grid-cols-12 font-bold text-slate-500 text-[10px] uppercase">
                <span className="col-span-5">Recompensa</span>
                <span className="col-span-3 text-center">Costo</span>
                <span className="col-span-4 text-right">Esfuerzo Estimado</span>
              </div>

              <div className="p-3 bg-white grid grid-cols-12 items-center">
                <div className="col-span-5 flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-900">Café de Especialidad</span>
                </div>
                <div className="col-span-3 text-center font-bold text-emerald-700">75 pts</div>
                <div className="col-span-4 text-right text-[11px] text-slate-600 font-medium">
                  3 botellas ó 8 tapitas
                </div>
              </div>

              <div className="p-3 bg-white grid grid-cols-12 items-center">
                <div className="col-span-5 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-900">Termo de Acero UVP</span>
                </div>
                <div className="col-span-3 text-center font-bold text-emerald-700">200 pts</div>
                <div className="col-span-4 text-right text-[11px] text-slate-600 font-medium">
                  8 botellas (2 semanas)
                </div>
              </div>

              <div className="p-3 bg-white grid grid-cols-12 items-center">
                <div className="col-span-5 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-900">Horas RSU Oficiales</span>
                </div>
                <div className="col-span-3 text-center font-bold text-emerald-700">300 pts</div>
                <div className="col-span-4 text-right text-[11px] text-slate-600 font-medium">
                  12 botellas + 1 reto
                </div>
              </div>
            </div>
          </div>

          {/* Reglas de Calidad / Auditoría */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 text-[11px] text-slate-600 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Requisitos para validación exitosa:
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-500 pl-1">
              <li>Los envases deben estar vacíos y libres de residuos líquidos densos.</li>
              <li>Aplastarlas facilita el almacenamiento de la estación EcoSort.</li>
              <li>Las tapitas se colocan en el lector superior independiente.</li>
            </ul>
          </div>

        </div>

        {/* Footer con llamada a la acción */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Entendido
          </button>
          {onOpenScanner && (
            <button
              onClick={() => {
                onClose();
                onOpenScanner();
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <span>Ir a Depositar Ahora</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
