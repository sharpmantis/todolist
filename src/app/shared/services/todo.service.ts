import { Injectable } from '@angular/core';
import{ HttpClient } from'@angular/common/http'

//importer les modules d'observation
import { Observable, Subject } from 'rxjs';
import { TodoInterface } from './../interfaces/todo-interface'
import { Constants } from './../constants/constants'



//Import de l'abonnement



@Injectable({
  providedIn: 'root'
})
export class TodoService {
  /**
   * Définit un subject observable de type todoInterface
   */
  private todoSubject: Subject<TodoInterface> = new Subject<TodoInterface>();


/**Injection de dépendances httpclient
 * @param _api:httpClient => transport vers le backend
 */
  constructor(private _api:HttpClient) { }


  public getTodo(): Observable<TodoInterface> {
    //J'abonne mon getTodo a l'observation des evenements de TodoInterface
    return this.todoSubject.asObservable();
  }

  //Diffuse le sujet aux "abonnés"
  public sendTodo(todo: TodoInterface) {
    this.todoSubject.next(todo);
  }

  public getTodos(id:number = null): Observable<TodoInterface[]>{
    if (id !== null){
      return this._api.get<TodoInterface[]>(
        Constants._API_ROOT+"/"+id
      );
    }else{
      return this._api.get<TodoInterface[]>(
        Constants._API_ROOT
      );
    }
    
  }
  /**
   * 
   * @param todo insere les todos dans la BDD
   */
  public addTodos(todo: TodoInterface){
    this._api.post<TodoInterface[]>(
      Constants._API_ROOT,
      todo
    ).subscribe((addedTodo)=>{
      addedTodo[0].isChecked=false;
      this.sendTodo(addedTodo[0]);
    });
    
  }
  

}
