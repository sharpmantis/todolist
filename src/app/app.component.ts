import { Component } from '@angular/core';
import { TodoInterface } from './shared/interfaces/todo-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: String = 'TodoList Generator v1.0';

  /**
   * @var todos:TodoInterface
   * qui cree le Tableau des Todos
   */

  public todos: TodoInterface[];



  /**
   * nouveau todo a ajouter a notre liste
   */
  public aTodo: String;

  /**
   * Constructeur de la classe appComponent
   * invoqué dès la creation d'un objet de type AppComponent
   */


  public constructor() {
    /** 
    this.todos = [
      { title: 'nouveau todo', isChecked: false },
      { title: 'WTF!', isChecked: false }
    ];
    */
    this.aTodo = '';
  }


  public ajoutEnabled(): Boolean {

    let status: Boolean = false;
    for (const todo of this.todos) {
      if (this.aTodo.length <= 5) {
        status = true;
      }
    }
    return status;
  }
  /**
   * Ajouter la methode d'ajout de todo
   */

   
  public addTodo(): void {
    //this.todos.push({ title: this.aTodo, isChecked: false });
    this.aTodo='';
  }

  /**
   * méthode de suppression de todo
   */
  public delete(index: number): void {
    console.log('Je dois enlever l\'element a l\'indice : ' + index);
    this.todos.splice(index, 1);
  }



  public deleteMultiple(index: number): void {
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].isChecked) {
        this.todos.splice(i, 1)
      }
    }
  }

  


 
}
