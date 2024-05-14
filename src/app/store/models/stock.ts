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

export interface HomeState {
  stocks: StockHome[];
  loading: boolean;
  error: any;
}

export interface SearchState {
  results: StockDetails[];
  loading: boolean;
  error: any;
}
