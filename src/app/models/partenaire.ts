export interface Partenaire {
  id?: number;
  prenom: string;
  nom: string;
  password: string;
  email: string;
  role?: string;
  isActive?: boolean;
  rc: string;
  ninea: string;
  montant: number;
}
