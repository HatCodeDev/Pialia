export interface Reward {
  id: string;
  title: string;
  category: 'Cafetería' | 'Campus' | 'Académico';
  pointsCost: number;
  description: string;
  partner: string;
  icon: 'coffee' | 'package' | 'award';
  available: boolean;
}

export interface Quest {
  id: string;
  title: string;
  currentKg: number;
  targetKg: number;
  unit: string;
  rewardPoints: number;
  daysLeft: number;
  sponsor: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  entity: string; // Carrera / Facultad
  avatar: string;
  bottlesCount: number;
  capsCount: number;
  weightGrams: number;
  points: number;
  isCurrentUser?: boolean;
}

export interface EntityLeaderboard {
  rank: number;
  name: string;
  bottlesCount: number;
  recycledKg: number;
  participants: number;
}

export interface DepositResult {
  detectedObject: 'Botella PET (Polímero 01)' | 'Tapa HDPE (Polímero 02)' | 'Material No Clasificable';
  purityScore: number;
  weightGrams: number;
  bottlesCount: number;
  capsCount: number;
  co2SavedGrams: number;
  pointsEarned: number;
  status: 'approved' | 'rejected';
}
