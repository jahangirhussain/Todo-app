import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


export interface Addtodo_interface
{
  new_todo:any;
  user_id:string;
}
@Injectable()
export class TodoService {
user_data:any;
token:any;
addtodointerface:Addtodo_interface={
  new_todo:'',
  user_id:''
  
}
 constructor(public http:HttpClient,public auth:AuthenticationService)
  {  
    
  }
public addtodoservice(todo_string):Observable<any>
{
  this.addtodointerface.new_todo=todo_string;
  let temp=this.auth.getUserDetails();

  this.addtodointerface.user_id=temp._id;

 return this.http.post('http://localhost:3000/api/addtodo',this.addtodointerface);

}
public deletetodo(id):Observable<any>
{
  const params = new HttpParams()
  .set('todo_id', id)
  return this.http.delete('http://localhost:3000/api/deletetodo',{params})

}

public getusertodos():Observable<any>
{
  this.token=this.auth.getUserDetails(); 
  const params = new HttpParams()
  .set('user_id', this.token._id)

  return this.http.get('http://localhost:3000/api/getusertodos',{params})


}

}
