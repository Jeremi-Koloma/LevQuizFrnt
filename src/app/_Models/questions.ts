import { Reponses } from "./reponses"; // importation de la classe Reponses pour avoir une liste de Reponses à chaque questions

export class Questions {

     id !: number;
     question !: string;
     points !: number;
     duree !: number;
     responseList !: Reponses[];
}
