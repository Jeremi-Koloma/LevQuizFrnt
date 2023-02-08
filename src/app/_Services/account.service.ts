import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'; // pour les requêtes http
import { JwtHelperService } from '@auth0/angular-jwt'; // importation de JwtHelperService
import { serverConstant } from '../_Constant/serverConstant'; // Importation de la classe Constantes
import { PasswordChange } from '../_Models/password-change'; // Importation de la classe changPassword
import { Quiz } from '../_Models/quiz'; // Importation de la classe Quiz
import { User } from '../_Models/user'; // Importation de la classe User
import { Observable } from 'rxjs'; // pour l'utilisation des observable
import { UserFormateur } from '../_Models/user-formateur';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // Déclarons des variables
  // Créeons un object de constante pour avoir accès aux méthodes définient dans cette classe 

  constant: serverConstant = new serverConstant();
  public userHost = this.constant.userPicture;
  public postHost = this.constant.quizPicture;

  // Une variable pour le host : le server backend
  public host: string = this.constant.host;
  // une variable pour le token
  public token!: any;
  // une varibale pour déteminer le nom d'utilisateur
  public loggInUsername!: string;
  // redirection ou actuel url de l'utilisateur
  public redirectUrl!: string;
  // ma clé googleMapApi pour avoir la Géolocalisation
  private googleMapsAPIKey = 'AIzaSyCEqs-KvBQeWnsz9NxbVhB5W_4uXCQSKqo';
  private googleMapsAPIUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
  // La dépendance que nous venons d'ajouter
  private jwtHelper = new JwtHelperService();

  // créeons une instance http dans le constructeur pour avoir accès au verbe http
  constructor(private http: HttpClient) { }


  // *****************************     LOGIN      ****************************************
  // Une fonction pour le login
  login(user: User): Observable<HttpErrorResponse | HttpResponse<any>> {
    return this.http.post<HttpErrorResponse | HttpResponse<any>>(`${this.host}/user/login`, user, { observe: 'response' });
  }



  // *****************************      INSCRIPTION APPRENANT       ******************************* 
  // Une fonction pour le le Register
  register(user: User): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/register`, user);
  }



   // *****************************      INSCRIPTION FORMATEUR        ******************************* 
  // Une fonction pour le le Register
  registerForamteur(userFormateur: UserFormateur): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/registerFormateur`, userFormateur);
  }




  // *****************************      MOTS PASSE OUBLIER       **************************************
  // Une fonction pour le mots de passe oublié
  resetPassword(email: string) {
    return this.http.get(`${this.host}/user/resetPassword/${email}`, {
      // on retourne seulement un simple text
      responseType: 'text'
    });
  }



  // *****************************      DECONNEXION      *********************************************
  // une fonction pour la Déconnexion
  logOut(): void {
    // in prend le token, on l'affecte null et on le supprime dans localStorage
    this.token = null;
    localStorage.removeItem('token');
  }



  // *****************************      POUR LA GESTION DU TOKEN        *******************************
  // Une fonction pour stocker d'abord le token
  saveToken(token: string): void {
    // on affecte le token à notre variable token que nous avons déclarer en haut
    this.token = token;
    // on stock le token dans localStorage comme ('Clé : valeur')
    localStorage.setItem('token', token);
  }


  // Une fonction qui va charger le token
  loadToken(): void {
    // recupérons le token dans le localStorage
    this.token = localStorage.getItem('token');
  }


  // Une fonction pour retourner le Token
  getToken(): string {
    // maintenant retournons le token
    return this.token;
  }



  // *************************  VERIFIONS SI L'UTULISATEUR ARRIVE A SE CONNECTER  ********************
  // Une pour vérifier si la connexion de l'utilisateur a réussi
  isLoggedIn(): boolean {
    // on charge son token
    this.loadToken();
    // vérifions que le token n'est pas null ou vide
    if (this.token != null && this.token !== '') {
      // si le token est valide, Alors on décode le token et on recupère le username (sub) dans le token mais on vérifie si le username existe
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        // vérifions encore si le token n'est pas expiré.
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          // si le token n'est fonctionnel, maintenant on recupère le username de l'utilisateur
          this.loggInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        } else {
          // sionon on le déconnecte
          this.logOut();
          return false;
        }
      } else {
        // sionon on le déconnecte
        this.logOut();
        return false;
      }
    } else {
      // sionon on le déconnecte
      this.logOut();
      return false;
    }
  }



  // *****************************      INFORMATION D'UN UTILISATEUR    ******************************
  // Une fonction qui va retourner les informations sur un utilsateur
  getUserInformation(username: string): Observable<User> {
    return this.http.get<User>(`${this.host}/user/${username}`);
  }



  // *****************************      LISTE DE QUIZ       *******************************
  // Une fonction pour avoir la liste des Quiz
  getQuiz(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.host}/quiz/list`);
  }



  // *****************************      RECHERCHER UN UTILISATEUR       *******************************
  // Une fonction pour la la liste des utilisateurs en cas de Recherches
  searchUsers(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/findByUsername/${username}`);
  }



  // *****************************     GEOLOCALISATION       *******************************
  // Une fonction pour avoir la Géolocalisation de l'utlisateur
  getLocation(latitude: string, longitude: string): Observable<any> {
    return this.http.get<any>(`${this.googleMapsAPIUrl}` + `${latitude},${longitude}&key=${this.googleMapsAPIKey}`);
  }



  // *****************************     MODIFIER UN L'UTILISATEUR   *******************************
  // Une fonction pour modifier un l'utlisateur
  updateUser(updateUser: User): Observable<User> {
    return this.http.post<User>(`${this.host}/user/update`, updateUser);
  }



  // *****************************     CHANGER SON MOTS DE PASSE   *******************************
  // Une fonction pour changer le mots de passe de l'utilisateur
  changePassword(changePassword: PasswordChange) {
    return this.http.post(`${this.host}/user/changePassword`, changePassword, { responseType: 'text' });
  }



  // *****************************     CHANGER SA PHOTO DE PROFIL    *******************************
  // Une fonction pour que l'utilisateur mèttre son profile à jour
  uploadeUserProfilePicture(profilePicture: File) {
    // créeons un object javaScript
    const fd = new FormData();
    fd.append('image', profilePicture);
    // Quand nous avons l'image, on l'envoi dans le server
    return this.http
      .post(`${this.host}/user/photo/upload`, fd, { responseType: 'text' })
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }


   //  La méthode qui nous permet d'afficher la liste des employés
   getUserList() : Observable<User[]>{
    return this.http.get<User[]>(`${this.host}/user/listUsers`);
  }



}
