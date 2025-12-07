export type TeamParam = {
    name: string;
    shortName?: string;
    captain?: string;
    owner?: string;
    logo?: string;
};

export type RootStackNavigationType = {
    teams: undefined;
    teamdetails: TeamParam;
    playersInfo: { team?: string; screen?: string; params?: Partial<TeamParam> & { team?: string; teamName?: string } };
    newPlayer: undefined;
};
