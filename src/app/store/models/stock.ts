export interface Stock {
  date: string;
  close: number;
}

export interface StockDetails {
  name: string;
  symbol: string;
}

export interface StockHome {
  symbol: string;
  price: string;
  volume: string;
  changePercent: string;
}

export interface StockState {
  stocks: Stock[];
  loading: boolean;
  error: any;
  details: StockDetails | null;
}
