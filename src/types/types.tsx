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