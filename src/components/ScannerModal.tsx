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
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { DepositResult } from '../types';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (result: DepositResult) => void;
}

export const ScannerModal: FC<ScannerModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [demoState, setDemoState] = useState<'idle' | 'scanning' | 'success' | 'rejected'>('idle');
  const [simulatedItem, setSimulatedItem] = useState<'pet' | 'unsupported'>('pet');

  useEffect(() => {
    if (isOpen) {
      setDemoState('idle');
      setAnalyzing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const triggerScan = (type: 'pet' | 'unsupported') => {
    setSimulatedItem(type);
    setAnalyzing(true);
    setDemoState('scanning');

    setTimeout(() => {
      setAnalyzing(false);
      if (type === 'pet') {
        setDemoState('success');
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#10B981', '#059669', '#F59E0B']
        });
      } else {
        setDemoState('rejected');
      }
    }, 1800);
  };

  const handleClaim = () => {
    const result: DepositResult = {
      detectedObject: 'Botella PET (Polímero 01)',
      purityScore: 99.4,
      weightGrams: 32,
      co2SavedGrams: 48,
      pointsEarned: 50,
      status: 'approved',
    };
    onSuccess(result);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-bio-500 animate-ping"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Sensor Óptico • Punto EcoSort #03
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Viewfinder Simulado */}
        <div className="relative h-72 bg-slate-900 flex items-center justify-center overflow-hidden">
          {/* Cámara Viewfinder Overlay */}
          <div className="absolute inset-4 border-2 border-dashed border-white/20 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
            <div className="flex justify-between items-center text-[11px] font-mono text-bio-400/80 bg-slate-950/60 px-2 py-0.5 rounded">
              <span>FOV: 78° | ISO AUTO</span>
              <span>ESTABILIZADO</span>
            </div>
            
            {/* Retícula Central */}
            <div className="self-center flex flex-col items-center">
              <div className="w-32 h-44 border border-bio-400/40 rounded-xl relative flex items-center justify-center">
                <Maximize2 className="w-6 h-6 text-bio-400/30" />
                {analyzing && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-bio-400 shadow-[0_0_12px_#10B981] animate-scan-line"></div>
                )}
              </div>
            </div>

            <div className="text-[10px] text-center font-mono text-slate-400">
              Coloque el residuo en la boca de recepción
            </div>
          </div>

          {/* Estado En Vivo */}
          {demoState === 'idle' && (
            <div className="text-center z-10 p-4">
              <Camera className="w-10 h-10 text-white/50 mx-auto mb-2 animate-pulse" />
              <p className="text-white text-sm font-medium">Esperando detección del residuo...</p>
              <p className="text-slate-400 text-xs mt-1">Seleccione un caso de prueba para la demo</p>
            </div>
          )}

          {demoState === 'scanning' && (
            <div className="text-center z-10 bg-slate-950/80 p-4 rounded-2xl border border-bio-500/30 backdrop-blur-md">
              <Sparkles className="w-7 h-7 text-bio-400 mx-auto mb-2 animate-spin" />
              <p className="text-white text-sm font-semibold">Analizando espectro óptico...</p>
              <p className="text-bio-300 text-xs font-mono mt-1">YOLOv8 Nano • UVP Cloud AI</p>
            </div>
          )}

          {demoState === 'success' && (
            <div className="text-center z-10 bg-bio-950/90 p-5 rounded-2xl border border-bio-500/50 backdrop-blur-md max-w-xs animate-scale-up">
              <CheckCircle2 className="w-10 h-10 text-bio-400 mx-auto mb-2" />
              <p className="text-white text-base font-bold">¡Residuo Validado!</p>
              <p className="text-bio-200 text-xs font-medium mt-0.5">Botella PET • 99.4% pureza</p>
              <div className="mt-3 py-1.5 px-3 bg-bio-900/60 rounded-lg inline-block border border-bio-400/20 text-bio-300 font-mono text-xs font-bold">
                +50 Pts Pialia acreditados
              </div>
            </div>
          )}

          {demoState === 'rejected' && (
            <div className="text-center z-10 bg-rose-950/90 p-5 rounded-2xl border border-rose-500/50 backdrop-blur-md max-w-xs animate-scale-up">
              <XCircle className="w-10 h-10 text-rose-400 mx-auto mb-2" />
              <p className="text-white text-base font-bold">Residuo No Permitido</p>
              <p className="text-rose-200 text-xs font-medium mt-0.5">Detectado: Desecho Orgánico / Mixto</p>
              <p className="text-slate-300 text-[11px] mt-2">La compuerta permanece bloqueada para evitar contaminación cruzada.</p>
            </div>
          )}
        </div>

        {/* Controles de Demostración para el Pitch */}
        <div className="p-5 bg-slate-50 border-t border-slate-100">
          <div className="text-[11px] font-semibold uppercase text-slate-500 tracking-wider mb-2.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Control de Simulación en Vivo (Pitch Controls)
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <button
              onClick={() => triggerScan('pet')}
              disabled={analyzing}
              className={`p-3 text-left rounded-xl border text-xs font-medium transition-all ${
                simulatedItem === 'pet' && demoState !== 'idle'
                  ? 'border-bio-500 bg-bio-50/80 text-bio-900 font-semibold shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-100/70 text-slate-700'
              }`}
            >
              <span className="block text-bio-600 font-bold mb-0.5">✓ Caso Válido</span>
              Detectar Botella PET
            </button>

            <button
              onClick={() => triggerScan('unsupported')}
              disabled={analyzing}
              className={`p-3 text-left rounded-xl border text-xs font-medium transition-all ${
                simulatedItem === 'unsupported' && demoState !== 'idle'
                  ? 'border-rose-400 bg-rose-50/80 text-rose-900 font-semibold shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-100/70 text-slate-700'
              }`}
            >
              <span className="block text-rose-600 font-bold mb-0.5">✕ Caso Contaminante</span>
              Detectar Basura Mixta
            </button>
          </div>

          {demoState === 'success' ? (
            <button
              onClick={handleClaim}
              className="w-full py-3 px-4 bg-bio-600 hover:bg-bio-700 active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              Confirmar Depósito y Cerrar Compuerta
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
              <Info className="w-3.5 h-3.5" />
              Demostración interactiva de Computer Vision y desbloqueo IoT
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
