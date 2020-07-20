import { Router } from "@angular/router";
import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.page.html",
  styleUrls: ["./registro.page.scss"],
})
export class RegistroPage implements OnInit {
  protected email = "";
  protected password = "";
  public errorMessage = "";
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  checkForm() {
    return (
      this.password.length < 8 ||
      !this.email.match("[A-Za-z0-9._-]@[A-Za-z0-9._-].[A-Za-z0-9._-]")
    );
  }

  ngOnInit() {}

  register() {
    this.authService.register(this.email, this.password).then(() => {
        this.userService.addUserToDB().then(
          () => this.router.navigateByUrl("/main/messages")
        ).catch(
          () => {
            this.errorMessage = "It wasn't possible to create the user correctly. Try later"
          }
        );
      }).catch((error) => {
        this.errorMessage = error.message;
      });
  }
}
