export interface Mobile {
  nom: string;
  type: 'boat' | 'ground' | 'plane';
  isRandom: boolean;
  schema: null | Schema;
  route: Route[];
}

export interface Route {
  lat: number;
  long: number;
  time: string;
}

export interface Settings {
  rafraichissement: number;
}

export interface Schema {
  // Define schema properties if needed
}

export class SimulationModel {
  public name!: string;
  public mobile!: Mobile[];
  public settings!: Settings;
}




