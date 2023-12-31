import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userRole: String = '';

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.userRole = this.authService.role;
  }

}
