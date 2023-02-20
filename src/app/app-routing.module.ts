import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';
import { QuizresolverService } from './_Services/quizresolver.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate:[AuthenticationGuard] // On Active AuthenticationGuard pour vérifier si l'utilisateur s'est authentifier
  },



  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile/:username',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule), canActivate:[AuthenticationGuard]  // On Active AuthenticationGuard pour vérifier si l'utilisateur s'est authentifier
  },
  {
    path: 'resetpassword',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'quizdetails/:id',
    loadChildren: () => import('./quiz-detail/quiz-detail.module').then( m => m.QuizDetailPageModule), resolve: {resolvedQuiz: QuizresolverService}, canActivate: [AuthenticationGuard]  // On Active AuthenticationGuard pour vérifier si l'utilisateur s'est authentifier, Resolver pour s'assurer que nous avons les informations de Quiz avant de les afficher
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'ajouter-quiz',
    loadChildren: () => import('./ajouter-quiz/ajouter-quiz.module').then( m => m.AjouterQuizPageModule), canActivate:[AuthenticationGuard]   // On Active AuthenticationGuard pour vérifier si l'utilisateur s'est authentifier
  },
  {
    path: 'form-add-quiz',
    loadChildren: () => import('./form-add-quiz/form-add-quiz.module').then( m => m.FormAddQuizPageModule), canActivate:[AuthenticationGuard]   // On Active AuthenticationGuard pour vérifier si l'utilisateur s'est authentifier
  },
  {
    path: 'form-add-question/:id',
    loadChildren: () => import('./form-add-question/form-add-question.module').then( m => m.FormAddQuestionPageModule) , canActivate:[AuthenticationGuard]   // On Active AuthenticationGuard pour vérifier si l'utilisateur s'est authentifier
  },
 
  {
    path: 'add-reponse/:id',
    loadChildren: () => import('./add-reponse/add-reponse.module').then( m => m.AddReponsePageModule) , canActivate:[AuthenticationGuard] // On Active AuthenticationGuard pour vérifier si l'utilisateur s'est authentifier
  },
  {
    path: 'game/:id',
    loadChildren: () => import('./game/game.module').then( m => m.GamePageModule), canActivate:[AuthenticationGuard]
  },
  {
    path: 'assigner-apprenant/:id',
    loadChildren: () => import('./assigner-apprenant/assigner-apprenant.module').then( m => m.AssignerApprenantPageModule) , canActivate:[AuthenticationGuard]
  },
  {
    path: 'register-formateur',
    loadChildren: () => import('./register-formateur/register-formateur.module').then( m => m.RegisterFormateurPageModule)
  },



 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
