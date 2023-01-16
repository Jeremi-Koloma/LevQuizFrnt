import { Questions } from "./questions"; // importation de la classe Question pour avoir une liste de Question à un Quiz

export class Quiz {
    
     id !: number;
     username !: string;
     titre !: string;
     description !: string;
     imagequizid !: number;
     imageName !: string;
     quizDate !: Date;
     questionsList !: Questions[];
}
