import { Notifications } from "./notifications"; // importation de la classe Notifications pour avoir la liste de notification de l'utilisateur
import { Quiz } from "./quiz";  // importation de la classe Quiz pour avoir la liste de Quiz de l'utilisateur
import { Role, UserRoles } from "./role";
import { Score } from "./Score";

export class User {
    
     id !: number;
     firstname !: string;
     lastname !: string;
     username !: string;
     password !: string;
     email !: string;
     createdDate !: Date;
     notificationsList !: Notifications[];
     quizList !: Quiz[];
     scoresList !: Score[];
     userRoles!:UserRoles[]

}
