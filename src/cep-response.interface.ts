export interface State {
  id: number | null;
  name: string;
  acronym: string;
}

export interface City {
  id: number | null;
  name: string;
}

export interface CEPResponse {
  cep: string;
  state: string | State;
  city: string | City;
  neighborhood?: string;
  address?: string;
  complement?: string;
}
