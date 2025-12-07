export type Player = {
  uniquePlayerId?: string;
  playerName: string;
  role?: string;
  teamName?: string;
  countryName?: string;
  age?: number;
  battingStyle?: string;
  runsScored?: number;
  centuriesScored?: number;
  wicketsTaken?: number;
  image?: string;
};

export type TeamSection = {
  teamName: string;
  members: Player[];
};
