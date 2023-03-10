import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../_Models/user';
import { AccountService } from '../_Services/account.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

 
   // Déclarons une variable liste de subscriptions
   private subscriptions: Subscription[] = [];
   // un object d'utilisateur
   user = new User();
   userScoreList !: any
   userphoto!: string;
   paginateNumber : number = 1;


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
        },
        error => {
          console.log(error);
          this.router.navigateByUrl('/login');
        }
      ));
  }


}
