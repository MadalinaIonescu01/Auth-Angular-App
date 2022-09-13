import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: `app-auth`,
    templateUrl: `./auth.component.html`

})

export class AuthComponent{
    //variabila pt switch login to singup
    isAuth = true;
    //variabila pt login spinner
    isLoading = false;
    //variabila pt store error
    error: string = null;


    constructor(private authService: AuthService, private router: Router){}


    //switch mode button
    onIsAuth(){
        this.isAuth = !this.isAuth;
    }

    //submit button
    onSubmit(form: NgForm){
        //daca formul nu este valid return
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        //daca se apasa butonul submit login devine true (apare spinnerul)
        this.isLoading = true;

        //cream un observable de tipul ARD (interfata din service.ts)
        let authObsv: Observable<AuthResponseData>;

        //daca auth este true (login) observerul apeleaza login 
        if(this.isAuth){
            authObsv = this.authService.login(email, password);
            //daca auth este false (singup) observerul apeleaza singup
        }else { 
            authObsv = this.authService.signUp(email, password);
    }
        //daca se inregistreaza modificari vom fi redirectionati catre input-data
    authObsv.subscribe(restData => {
        console.log(restData);
        //daca logarea a avut succes spinnerul e false
        this.isLoading = false;
        this.router.navigate(['/input-data']);
    },
        //block pt afisarea msj de eroare 
    errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        //daca logarea nu a avut succes spinnerul e false
        this.isLoading = false;

    })
       
        //reseteaza form
        form.reset();
    }

}