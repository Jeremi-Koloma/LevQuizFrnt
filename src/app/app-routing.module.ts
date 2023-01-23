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
    path: 'quizdetails/:quizId',
    loadChildren: () => import('./quiz-detail/quiz-detail.module').then( m => m.QuizDetailPageModule), resolve: {resolvedQuiz: QuizresolverService}, canActivate: [AuthenticationGuard]  // On Active AuthenticationGuard pour vérifier si l'utilisateur s'est authentifier, Resolver pour s'assurer que nous avons les informations de Quiz avant de les afficher
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
