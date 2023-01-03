import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {TodoService} from "../todoService";
import {Todo} from "./todo";
import {delay} from "rxjs";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements AfterViewInit{
  constructor(@Inject(TodoService) private todoService: TodoService) {}

  todos: Todo[] = [];
  isTodoNull = true;

  async ngAfterViewInit(): Promise<void> {
    this.todos = await this.todoService.getAllTodos();

    this.todos.filter(x => x.finished == true).forEach(x => {
      let element = document.getElementById(x.uuid);
      if (element != null){
        element.classList.toggle("finished");
      }
    });
  }

  async addTodo(event:any){
    if(event.key === "Enter") {
      if (event.target.value.trim() == ""){
        return;
      }

      let todo = await this.todoService.addTodo({uuid: "", title: event.target.value, finished:false})
      this.todos.push(todo);
      event.target.value = "";
    }

  }

  async finishTodo(event:any){
    let div = event.target
    if (div.id == "")
      div = event.target.parentNode;

    await this.todoService.finishTodo(div.id);
    let todo = this.todos.find(x => x.uuid ==div.id);
    if (todo != null){
      todo.finished = !todo.finished
      div.classList.toggle("finished");
    }
  }

  async deleteTodo(event:any){
    await this.todoService.deleteTodo(event.target.parentNode.id)
    let todo = this.todos.find(x => x.uuid == event.target.parentNode.id);
    if (todo != null){
      this.todos.splice(this.todos.indexOf(todo), 1);
    }
  }

  async deleteAllFinished(){
    let finishedTodos = this.todos.filter(x => x.finished == true);
    for (const x of finishedTodos) {
      await this.todoService.deleteTodo(x.uuid)
      this.todos.splice(this.todos.indexOf(x), 1);
    }
  }
}
