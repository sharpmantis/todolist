import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateValidators } from './../../shared/validators/date-validators';
import { TodoService } from './../../shared/services/todo.service'

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})

export class TodoFormComponent implements OnInit {

  /**
   * todoForm: FormGroup Prise en charge du formulaire
   * par ReactiveForms
   */

  public todoForm: FormGroup;


  /**
   * rendre dispo "title" dans le controle du formulaire
   */
  public get title() {
    return this.todoForm.controls.title;
  }

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService) { }

  /**
   * Methode definie dans l'interface OnInit
   * est appelée immédiatement après le constructeur
   * de la classe courante
   * 
   * COnstruction du formulaire todoForm
   */

  ngOnInit() {
    //definit le formulaire, ce qu'il contient
    //ainsi que ses regles de validation
    this.todoForm = this.formBuilder.group(
      {
        title: [
          '',//Valeur par défaut du formulaire
          [Validators.required, Validators.minLength(5)] //Regles de validation que je veux appliquer
        ],
        debut: [
          '',
          [Validators.required]
        ],
        fin: [
          '',
          [Validators.required]
        ]
      },
      { validator: Validators.compose([DateValidators.dateLessThan('debut', 'fin', { 'debut': true })]) }
    );
  }

  public saveTodo(): void {
    let _todo = this.todoForm.value;
    _todo.isChecked = false;
    this.todoService.addTodos(_todo);
  }

}
