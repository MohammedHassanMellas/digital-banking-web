import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {catchError, throwError} from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
const authService = inject(AuthService)
  // Récupérer le jeton d'authentification
  const accessToken = authService.accessToken;

  // Vérifier si la requête ne concerne pas l'authentification
  if (!req.url.includes("/auth/login")) {

    // Ajouter le jeton d'authentification à l'en-tête
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
  // Passer à la requête suivante et intercepter les erreurs
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
      }
      // Renvoyer l'erreur pour qu'elle puisse être traitée par l'appelant
      return throwError(error);
    })
  );
};
