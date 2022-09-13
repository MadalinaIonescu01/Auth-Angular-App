import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.module";
import { Router } from "@angular/router";

export interface AuthResponseData {
    //response payload from firebase
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    //optional property (required just for singup)
    registered?: boolean;
}

@Injectable({
    providedIn: `root`
})
export class AuthService {

    //create new user
    user = new Subject<User>();


    constructor(
        private http: HttpClient,
        private router: Router
        ) {}

        //http api for signup
    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBdY3QZHLudX2a7dECJruAPp7XPxKcYjnY',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(
                catchError(this.handleError),
                tap(resData => {
               this.handleAuthentification(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
               );
            })
            );
    }


    //http api for login
    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBdY3QZHLudX2a7dECJruAPp7XPxKcYjnY',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(
            catchError(this.handleError),
            //let user to auth
            tap(resData => {
                this.handleAuthentification(
                 resData.email,
                 resData.localId,
                 resData.idToken,
                 //+resData.expiresIn -> convert to number
                 +resData.expiresIn
                );
             }))
    }


    logout(){
        //change values to null
        this.user.next(null);
        //send user to home page
        this.router.navigate(['']);
        
    }

    private handleAuthentification(email: string, userId: string, token: string, expiresIn: number){
        //generate expiration date
        const expirationDate = new Date(
            //*1000 -> new Date este in milisecunde, iar expiresIn in secunde(doc), asa ca trebuie convertit
            new Date().getTime() + expiresIn * 1000);
        //create new user
        const user = new User(
            email, 
            userId, 
            token, 
            expirationDate);
        
        //pass value emitted by observeble
        this.user.next(user);
    }

    //mesaje transmise in caz de eroare
    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is invalid!';
                break;
            case 'WEAK_PASSWORD':
                errorMessage = 'Password should be at least 6 characters!';
                break;
        }
        return throwError(() => errorMessage);
    }





}