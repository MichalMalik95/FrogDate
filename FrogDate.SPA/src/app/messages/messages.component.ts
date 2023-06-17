import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { Pagination, PaginationResult } from '../models/pagination';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  // messageContainer: 'Unread';
  messageContainer: string;
  flagOutbox = false;


  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages(){
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
                                  this.pagination.itemsPerPage, this.messageContainer)
                    .subscribe((res:PaginationResult<Message[]>) => {
                      this.messages = res.result;
                      this.pagination = res.pagination;

                      if(res.result[0].messageContainer === 'Outbox') {
                        this.flagOutbox = true;
                      }
                      else {
                        this.flagOutbox = false;
                      }
                    }, error => {
                      this.alertify.error(error);
                    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.alertify.confirm("Are you shure you want to delete this message?", () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success("Message succesfully deleted");
      }, error => {
        this.alertify.error("Error with deleting message");
      });
    });

  }

}
