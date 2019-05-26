import { Component, OnInit , Inject} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../model/user.model";
import { ApiService } from "../core/api.service";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  user: User;
  maxPage: number;
  page: number = 1;
  user_flag: boolean;

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute) { }

  getUsers() {
    this.apiService.getUsers(this.page)
    .subscribe(
         res => {
             this.maxPage = res.total_pages;
             this.users = res.data;
         }
     );
  }

  getUser(id: number) {
    this.apiService.getUserById(id)
    .subscribe(
         res => {
             this.user = res.data;
         }
     );
  }

  ngOnInit() {
    if( this.route.snapshot.params.id ) {
      this.getUser(this.route.snapshot.params.id);
      this.user_flag = true;
    }
    else {
      this.getUsers();
      this.user_flag = false;
    }
  }

  ChangePagination(dir: string) {
    console.log(this.page);
    if( dir === 'prev' ) {
      if( this.page > 1 ) {
        this.page--;
        this.getUsers();
      }
    }
    else {
      if( this.page < this.maxPage ) {
        this.page++;
        this.getUsers();
      }
    }
  }
}
