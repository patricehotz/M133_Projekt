import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import {Todo} from "./todo/todo";

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  rootURL = 'http://localhost:3000/todo/';

  async getAllTodos(): Promise<Todo[]> {
    try {
      return await lastValueFrom(this.http.request<Todo[]>('GET', this.rootURL));
    } catch (response) {
      alert((response as any).error);
      return null as any;
    }
  }

  async addTodo(todo:Todo): Promise<Todo> {
    try {
      return await lastValueFrom(this.http.request<Todo>('Post', this.rootURL + "new/", { body: todo}));
    } catch (response) {
      alert((response as any).error);
      return null as any;
    }
  }

  async finishTodo(id:string): Promise<void> {
    try {
      return await lastValueFrom(this.http.request<void>('Post', this.rootURL + "finish/" + id));
    } catch (response) {
      alert((response as any).error);
      return null as any;
    }
  }

  async deleteTodo(id:string): Promise<void> {
    try {
      return await lastValueFrom(this.http.request<void>('Delete', this.rootURL + "delete/" + id));
    } catch (response) {
      alert((response as any).error);
      return null as any;
    }
  }
}
