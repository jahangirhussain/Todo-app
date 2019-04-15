import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service'
import { Observable } from 'rxjs/Observable';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import 'rxjs/add/operator/map'
import * as _ from 'underscore';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PagerService } from '../index'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  title = 'World Best Todo App';
  newTodo = ''; 
  todos :any=[];
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
constructor(public toastr: ToastrManager,private todoservice:TodoService, private spinnerService: Ng4LoadingSpinnerService, private pagerService: PagerService)
{  
  this.gettodo()
  
}
// fethcning all the todos of logged in user

gettodo()
{
    this.todoservice.getusertodos().subscribe(user => {
      let todoObj = {
        item : this.newTodo,
        complete : false
      }   
     
 this.todos=[];
        user.forEach((item, index) => {

    this.todos.push(item);
 
              });
              this.allItems = this.todos;

                // initialize to page 1
                this.setPage(1);
           
  }, (err) => {
    console.log(err);
  });
  
}
  // To add list in todo Array as well assave in backend
  addTodo(event) { 

    let todoObj = {
      todostatement : this.newTodo,
      complete : false
    }
   
    this.newTodo = '';
    this.setPage(1);
    this.todoservice.addtodoservice(todoObj.todostatement).subscribe(user => {
      this.todos.push(user);
      this.allItems=this.todos; 

    this.toastr.successToastr('Todo has been added sucsessfully.', 'Todo Added!');
  }, (err) => {
   console.error(err);
  });
  
  
  
  }

  // To mark as Done and delete from backend
  delTodo(i){
   // let index =this.pager.startIndex;
      this.todos[i].complete = true;
      this.allItems[i].complete=true;
      // console.log(this.pager.endIndex);
    this.todoservice.deletetodo(this.todos[i]._id).subscribe(response =>{
      this.toastr.infoToastr('Todo is mark completed.', 'Todo Completed');
    });

  }
  setPage(page: number):Observable<any> {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length,page);

    // get current page of items
   // this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.todos=this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}



}
