import { AlertType } from "../_Enum/alert-type"; // importation de notre classe Enum

export class Alert {
    // Cette classe va envoyé des notification à l'utilisateur quand il se connecte ou deconnect
    
    text!: string;
    type!: AlertType;

    // Créeons un constructeur pour prendre le type de message success qu'on veut géré 
    constructor(text='', type = AlertType.SUCCESS){
        // affectons un text à notre variable text
        this.text = text;
        this.type = type;
    }
}
