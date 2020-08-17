export interface User {
  id?: number;
  prenom: string;
  nom: string;
  password: string;
  email: string;
  role: string;
  isActive?: boolean;
}
