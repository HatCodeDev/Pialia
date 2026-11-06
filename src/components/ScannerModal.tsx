import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { 
  Camera, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Maximize2, 
  Info,
  Layers,
  ArrowRight,
  ShieldCheck,
  Scale,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { DepositResult } from '../types';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (result: DepositResult) => void;
}

type ScanType = 'bottle' | 'cap' | 'unsupported';

export const ScannerModal: FC<ScannerModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [demoState, setDemoState] = useState<'idle' | 'scanning' | 'success' | 'rejected'>('idle');
  const [simulatedItem, setSimulatedItem] = useState<ScanType>('bottle');

  useEffect(() => {
    if (isOpen) {
      setDemoState('idle');
      setAnalyzing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const triggerScan = (type: ScanType) => {
    setSimulatedItem(type);
    setAnalyzing(true);
    setDemoState('scanning');

    setTimeout(() => {
      setAnalyzing(false);
      if (type === 'bottle' || type === 'cap') {
        setDemoState('success');
        confetti({
          particleCount: 55,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#059669', '#10B981', '#34D399', '#F59E0B']
        });
      } else {
        setDemoState('rejected');
      }
    }, 1600);
  };

  const handleClaim = () => {
    let result: DepositResult;
    if (simulatedItem === 'bottle') {
      result = {
        detectedObject: 'Botella PET (Polímero 01)',
        purityScore: 99.4,
        weightGrams: 28, // peso realista de una botella comercial de 600ml
        bottlesCount: 1,
        capsCount: 0,
        co2SavedGrams: 42,
        pointsEarned: 25,
        status: 'approved',
      };
    } else if (simulatedItem === 'cap') {
      result = {
        detectedObject: 'Tapa HDPE (Polímero 02)',
        purityScore: 99.8,
        weightGrams: 3, // peso realista de una tapa de polipropileno/HDPE
        bottlesCount: 0,
        capsCount: 1,
        co2SavedGrams: 5,
        pointsEarned: 10,
        status: 'approved',
      };
    } else {
      return;
    }
    onSuccess(result);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        {/* Header de Telemetría */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Sensor Óptico • Módulo EcoSort UVP
            </span>
          </div>
          <button 
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewfinder Simulado de IA */}
        <div className="relative h-72 bg-slate-950 flex items-center justify-center overflow-hidden">
          {/* Overlay Grid y HUD */}
          <div className="absolute inset-3 border border-white/10 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
            <div className="flex justify-between items-center text-[10px] font-mono text-emerald-400/90 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/5">
              <span>CANAL OPT: 540nm</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                CALIBRADO UVP
              </span>
            </div>
            
            {/* Retícula Central con Mira Láser */}
            <div className="self-center flex flex-col items-center">
              <div className="w-36 h-44 border border-dashed border-emerald-400/40 rounded-2xl relative flex items-center justify-center bg-emerald-950/5">
                <Maximize2 className="w-6 h-6 text-emerald-400/40" />
                {analyzing && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_14px_#10B981] animate-scan-line"></div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-white/5">
              <span>Balanza de precisión: 0.1g</span>
              <span>Espectrometría NIR</span>
            </div>
          </div>

          {/* Estados visuales dinámicos */}
          {demoState === 'idle' && (
            <div className="text-center z-10 p-4 max-w-xs">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-2.5">
                <Camera className="w-6 h-6 text-emerald-400 animate-pulse" />
              </div>
              <p className="text-white text-sm font-semibold">Listo para recepción de envases</p>
              <p className="text-slate-400 text-xs mt-1">Coloque 1 envase o tapita en la ranura de auditoría</p>
            </div>
          )}

          {demoState === 'scanning' && (
            <div className="text-center z-10 bg-slate-900/90 p-5 rounded-2xl border border-emerald-500/40 backdrop-blur-md max-w-xs shadow-xl">
              <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-2 animate-spin" />
              <p className="text-white text-sm font-bold">Identificando resina y tara...</p>
              <p className="text-emerald-300 text-xs font-mono mt-1">YOLOv8-Polymer • 120 FPS</p>
            </div>
          )}

          {demoState === 'success' && (
            <div className="text-center z-10 bg-slate-900/95 p-5 rounded-2xl border border-emerald-500/60 backdrop-blur-md max-w-xs animate-scale-up shadow-2xl">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <p className="text-white text-base font-bold">
                {simulatedItem === 'bottle' ? 'Botella PET Verificada' : 'Tapita HDPE Verificada'}
              </p>
              <p className="text-emerald-300 text-xs font-medium mt-0.5">
                {simulatedItem === 'bottle' ? '28 gramos • Pureza 99.4%' : '3 gramos • Pureza 99.8%'}
              </p>
              <div className="mt-3 py-1 px-3 bg-emerald-500/15 rounded-lg inline-flex items-center gap-1.5 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                {simulatedItem === 'bottle' ? '+25 Pts acreditados' : '+10 Pts acreditados'}
              </div>
            </div>
          )}

          {demoState === 'rejected' && (
            <div className="text-center z-10 bg-slate-900/95 p-5 rounded-2xl border border-rose-500/60 backdrop-blur-md max-w-xs animate-scale-up shadow-2xl">
              <XCircle className="w-10 h-10 text-rose-400 mx-auto mb-2" />
              <p className="text-white text-base font-bold">Residuo No Válido</p>
              <p className="text-rose-300 text-xs font-medium mt-0.5">Contenido no reciclable / Residuos orgánicos</p>
              <p className="text-slate-400 text-[11px] mt-2 leading-relaxed">
                Compuerta bloqueada automáticamente para proteger el lote del campus.
              </p>
            </div>
          )}
        </div>

        {/* Panel Interactivo de Casos de Prueba para el Pitch */}
        <div className="p-5 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2.5">
            <div className="text-[11px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              Simular depósito de estudiante
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Modo Auditoría</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => triggerScan('bottle')}
              disabled={analyzing}
              className={`p-2.5 text-left rounded-xl border text-xs transition-all ${
                simulatedItem === 'bottle' && demoState !== 'idle'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold shadow-xs ring-1 ring-emerald-500'
                  : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
              }`}
            >
              <span className="block text-emerald-700 font-bold text-[11px]">1 Botella</span>
              <span className="text-[10px] text-slate-500">PET ~28g</span>
            </button>

            <button
              onClick={() => triggerScan('cap')}
              disabled={analyzing}
              className={`p-2.5 text-left rounded-xl border text-xs transition-all ${
                simulatedItem === 'cap' && demoState !== 'idle'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold shadow-xs ring-1 ring-emerald-500'
                  : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
              }`}
            >
              <span className="block text-emerald-700 font-bold text-[11px]">1 Tapita</span>
              <span className="text-[10px] text-slate-500">HDPE ~3g</span>
            </button>

            <button
              onClick={() => triggerScan('unsupported')}
              disabled={analyzing}
              className={`p-2.5 text-left rounded-xl border text-xs transition-all ${
                simulatedItem === 'unsupported' && demoState !== 'idle'
                  ? 'border-rose-400 bg-rose-50 text-rose-950 font-semibold shadow-xs ring-1 ring-rose-400'
                  : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
              }`}
            >
              <span className="block text-rose-600 font-bold text-[11px]">Contaminante</span>
              <span className="text-[10px] text-slate-500">Mixto / Sucio</span>
            </button>
          </div>

          {demoState === 'success' ? (
            <button
              onClick={handleClaim}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              Confirmar Recepción y Acreditar Puntos
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 justify-center">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Validación fotométrica instantánea sin manipulación manual</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
