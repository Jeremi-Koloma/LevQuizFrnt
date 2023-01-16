export class serverConstant {
    // Dev Enviroment

    // Le Serveur backend
    public host: string = 'http://localhost:8080';

    // le Serveur client
    public client: string = 'http://localhost:8200';

    // Stockage de photo de l'utilisateur 
    public userPicture: string = `${this.host}/image/profiluser`;

    // Stockage de photo de Quiz
    public quizPicture: string = `${this.host}/image/quizs`;
}
