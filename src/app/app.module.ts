import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// components
import { AppComponent } from './app.component';

// guards
import { AuthenticationGuard } from './guard/authentication.guard';

// services
import { QuizresolverService } from './_Services/quizresolver.service';
import { AccountService } from './_Services/account.service';
import { LoadingService } from './_Services/loading.service';
import { QuizService } from './_Services/quiz.service';
import { AlertService } from './_Services/alert.service';

// intercepteurs
import { AuthInterceptor } from './Interceptor/auth.interceptor';
import { CacheInterceptor } from './Interceptor/cache.interceptor';

// external modules
import { NgxLoadingModule } from 'ngx-loading';
import { CustomDatePipe } from './custom-date.pipe';



@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,  // Pour pouvoir utiliser les Requêtes Http
    FormsModule,
    ReactiveFormsModule,// pour les formulaires reactive
    IonicModule.forRoot(),
    AppRoutingModule, // Nos routagee
    NgxLoadingModule.forRoot({})
  ],
  
  providers: [
    AccountService,
    LoadingService,
    QuizService,
    AlertService,
    QuizresolverService,
    AuthenticationGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
