export interface Reward {
  id: string;
  title: string;
  category: 'Cafetería' | 'Campus' | 'Académico';
  pointsCost: number;
  description: string;
  partner: string;
  icon: string;
  available: boolean;
}

export interface Quest {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  rewardPoints: number;
  daysLeft: number;
  sponsor: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  entity: string; // Facultad o Campus
  avatar: string;
  recycledKg: number;
  points: number;
  isCurrentUser?: boolean;
}

export interface DepositResult {
  detectedObject: 'Botella PET (Polímero 01)' | 'Tapa HDPE (Polímero 02)' | 'Material No Clasificable';
  purityScore: number;
  weightGrams: number;
  co2SavedGrams: number;
  pointsEarned: number;
  status: 'approved' | 'rejected';
}
