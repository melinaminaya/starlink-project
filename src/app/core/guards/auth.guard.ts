import { inject } from "@angular/core";
import { UserService } from "../services/user.service"
import { Router } from "@angular/router";

export const authGuard = () =>{
    const userService = inject(UserService);
    const router = inject(Router);
    console.log('User logged:', userService.isLogged());
    if(userService.isLogged()){
        return true;
    }else{
        router.navigate(['']);
        return false;
    }
}