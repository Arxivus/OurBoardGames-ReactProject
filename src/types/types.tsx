export type SelectOption = {
  value: string;
  label: string;
}

export type BoardGame = {
    id?: string;
    className?: string;
    name: string;
    genre: Array<string>;
    players?: string;
    avgTimeInMinutes?: string;
    imageUrl?: string;
    description?: string;
    owner?: string;
    priceInRubles?: number;
}

export type Match = {
    id?: string;
    gameId: string;
    gameName: string;
    winnerId: string;
    winnerName: string;
    players: Array<string>;
}