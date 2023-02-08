import { User } from "./user";

// Cet model va heriter de la classe mère
export class UserFormateur extends User {

    specialite !: string;
    localite!: string;
    entreprise !: string
    status!: boolean
}
