import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginStatus = false;

  constructor(private router: Router,
     private route: ActivatedRoute,  // injects the currently active route
     private auth: AuthService
     ) { }

  ngOnInit() {
  }

  loadServers(id: number){
   this.router.navigate(['/servers', id, 'edit'], { queryParams: {allowEdit: '1'},fragment:'loading'});  // using absolute path
  
   // this.router.navigate(['servers'],{relativeTo: this.route})  // using relative path. by default relativeTo points to root domain
  } 

  login(){
    this.auth.login();
    this.loginStatus = true;
  }
  logout(){
    this.auth.logout();
    this.loginStatus = false;
  }
}
