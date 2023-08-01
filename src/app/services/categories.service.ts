import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuizCategory, QuizCategoryResponse } from '../models/quiz-category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl = 'https://opentdb.com/api_category.php';
  constructor(private httpClient : HttpClient) { }

  getCategories(): Observable<QuizCategory[]>{
    return this.httpClient.get<QuizCategoryResponse>(this.baseUrl).pipe(
      map((data)=>{
        return data.trivia_categories;
      })
    )
  }
}
