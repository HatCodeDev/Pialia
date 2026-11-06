import { useState, useEffect, useRef, useCallback } from 'react';
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
  X,
  CameraOff,
  RefreshCw,
  Video
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
  
  // Real Camera Hardware States
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera tracks cleanly
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        try {
          track.stop();
        } catch {
          // ignore track stop error
        }
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  }, []);

  // Start hardware camera stream
  const startCamera = useCallback(async (facing: 'environment' | 'user' = 'environment') => {
    stopCamera();
    setCameraError(null);

    // Verify browser support for mediaDevices
    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Dispositivo sin acceso a cámara web o contexto no seguro (HTTPS). Modo simulación activo.');
      setCameraActive(false);
      return;
    }

    try {
      // Prioritize environment camera on mobile (back camera)
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {
            // auto-play prevented, ignore
          });
        };
      }
      setCameraActive(true);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      if (errorMsg.includes('NotAllowedError') || errorMsg.includes('Permission')) {
        setCameraError('Permiso de cámara declinado. Mostrando vista simulada de auditoría.');
      } else if (errorMsg.includes('NotFoundError') || errorMsg.includes('DevicesNotFoundError')) {
        setCameraError('No se encontró sensor de cámara físico. Modo simulación activo.');
      } else {
        // Fallback to basic video without facingMode constraint if environment failed
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          streamRef.current = fallbackStream;
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play().catch(() => {});
            };
          }
          setCameraActive(true);
          setCameraError(null);
          return;
        } catch {
          setCameraError('Cámara no disponible en este momento. Modo simulación activo.');
        }
      }
      setCameraActive(false);
    }
  }, [stopCamera]);

  // Flip between front and rear cameras
  const toggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  useEffect(() => {
    if (isOpen) {
      setDemoState('idle');
      setAnalyzing(false);
      startCamera(facingMode);
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, startCamera, stopCamera, facingMode]);

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
          particleCount: 50,
          spread: 55,
          origin: { y: 0.65 },
          colors: ['#059669', '#10B981', '#34D399', '#F59E0B']
        });
      } else {
        setDemoState('rejected');
      }
    }, 1500);
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
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="scanner-modal-title"
    >
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[96dvh] sm:max-h-[92vh]">
        
        {/* Header de Telemetría */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cameraActive ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${cameraActive ? 'bg-emerald-600' : 'bg-amber-500'}`}></span>
            </span>
            <span id="scanner-modal-title" className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Sensor Óptico • Módulo EcoSort UVP
            </span>
          </div>

          <div className="flex items-center gap-1">
            {cameraActive && (
              <button
                onClick={toggleFacingMode}
                title="Cambiar lente"
                aria-label="Cambiar entre cámara frontal y trasera"
                className="p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
            <button 
              onClick={onClose}
              aria-label="Cerrar modal"
              className="p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewfinder con Hardware Stream Real y Fallback Gráfico */}
        <div className="relative h-64 sm:h-72 bg-slate-950 flex items-center justify-center overflow-hidden shrink-0">
          {/* Elemento de Video Real */}
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              cameraActive ? 'opacity-90' : 'opacity-0 pointer-events-none'
            }`}
          />

          {/* Fallback de Fondo cuando la cámara no está activa */}
          {!cameraActive && (
            <div className="absolute inset-0 bg-radial from-slate-900 via-slate-950 to-black flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border border-emerald-500/10 animate-pulse pointer-events-none" />
            </div>
          )}

          {/* Overlay Grid y HUD Técnico */}
          <div className="absolute inset-3 border border-white/10 rounded-2xl pointer-events-none flex flex-col justify-between p-3 z-10">
            <div className="flex justify-between items-center text-[10px] font-mono text-emerald-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
              <span className="flex items-center gap-1.5">
                <Video className="w-3 h-3 text-emerald-400" />
                {cameraActive ? 'STREAM ACTIVO (LIVE)' : 'MODO SIMULACIÓN'}
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                CALIBRADO UVP
              </span>
            </div>
            
            {/* Retícula Central con Mira Láser */}
            <div className="self-center flex flex-col items-center">
              <div className="w-36 h-40 border border-dashed border-emerald-400/50 rounded-2xl relative flex items-center justify-center bg-emerald-950/10 backdrop-blur-[1px]">
                <Maximize2 className="w-6 h-6 text-emerald-400/50" />
                {analyzing && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_14px_#10B981] animate-scan-line"></div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
              <span>Balanza: 0.1g</span>
              <span>Espectrometría NIR</span>
            </div>
          </div>

          {/* Aviso contextual cuando cámara no disponible */}
          {cameraError && demoState === 'idle' && (
            <div className="absolute top-12 inset-x-4 z-20 bg-amber-950/85 border border-amber-500/40 text-amber-200 text-[10px] py-1.5 px-3 rounded-lg flex items-center gap-2 backdrop-blur-sm">
              <CameraOff className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              <span className="truncate">{cameraError}</span>
            </div>
          )}

          {/* Estados visuales dinámicos */}
          {demoState === 'idle' && (
            <div className="text-center z-10 p-4 max-w-xs bg-slate-950/40 backdrop-blur-xs rounded-2xl">
              <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mx-auto mb-2">
                <Camera className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              <p className="text-white text-xs sm:text-sm font-semibold">Listo para recepción de envases</p>
              <p className="text-slate-300 text-[11px] mt-0.5">Apunte la cámara a una botella o tapita para auditar</p>
            </div>
          )}

          {demoState === 'scanning' && (
            <div className="text-center z-20 bg-slate-900/90 p-5 rounded-2xl border border-emerald-500/40 backdrop-blur-md max-w-xs shadow-xl">
              <Sparkles className="w-7 h-7 text-emerald-400 mx-auto mb-2 animate-spin" />
              <p className="text-white text-sm font-bold">Identificando resina y tara...</p>
              <p className="text-emerald-300 text-[11px] font-mono mt-1">YOLOv8-Polymer • 120 FPS</p>
            </div>
          )}

          {demoState === 'success' && (
            <div className="text-center z-20 bg-slate-900/95 p-5 rounded-2xl border border-emerald-500/60 backdrop-blur-md max-w-xs animate-scale-up shadow-2xl">
              <CheckCircle2 className="w-9 h-9 text-emerald-400 mx-auto mb-1.5" />
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
            <div className="text-center z-20 bg-slate-900/95 p-5 rounded-2xl border border-rose-500/60 backdrop-blur-md max-w-xs animate-scale-up shadow-2xl">
              <XCircle className="w-9 h-9 text-rose-400 mx-auto mb-1.5" />
              <p className="text-white text-base font-bold">Residuo No Válido</p>
              <p className="text-rose-300 text-xs font-medium mt-0.5">Contenido no reciclable / Residuos orgánicos</p>
              <p className="text-slate-300 text-[11px] mt-2 leading-relaxed">
                Compuerta bloqueada automáticamente para proteger el lote del campus.
              </p>
            </div>
          )}
        </div>

        {/* Panel Interactivo de Casos de Prueba para el Pitch */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 pb-safe">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[11px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              Simular detección en cámara
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Modo Auditoría</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3.5">
            <button
              onClick={() => triggerScan('bottle')}
              disabled={analyzing}
              className={`min-h-[44px] p-2.5 text-left rounded-xl border text-xs transition-all active:scale-95 ${
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
              className={`min-h-[44px] p-2.5 text-left rounded-xl border text-xs transition-all active:scale-95 ${
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
              className={`min-h-[44px] p-2.5 text-left rounded-xl border text-xs transition-all active:scale-95 ${
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
              className="w-full min-h-[46px] py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              Confirmar Recepción y Acreditar Puntos
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 justify-center py-1">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Validación óptica en tiempo real asistida por computadora</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
