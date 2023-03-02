import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../_Models/user';
import { AccountService } from '../_Services/account.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {

  
   // Déclarons une variable liste de subscriptions
   private subscriptions: Subscription[] = [];
   // un object d'utilisateur
   user = new User();
   userScoreList !: any
   userphoto!: string;
   p: number = 1;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.getUserInfo(this.accountService.loggInUsername);
    this.userphoto = this.accountService.userHost;
    //this.userid = this.route.snapshot.params["id"]
    
  }


   // Une fonctions qui va retourné les informations d'un utilisateur qui va prendre le nom de user en param
   getUserInfo(username: string): void {
    this.subscriptions.push(
      this.accountService.getUserInformation(username).subscribe(
        (response: User) => {
          this.user = response;
          this.userScoreList = this.user.scoresList;
          console.log(this.userScoreList)
        },
        error => {
          console.log(error);
          this.router.navigateByUrl('/login');
        }
      ));
  }



}
