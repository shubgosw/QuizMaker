import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { QuizQuestion } from '../models/quiz-question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl = 'https://opentdb.com/api.php';
  constructor(private httpClient : HttpClient) { }

  getQuizData(noOfQuestion : number, category : number, difficultyLevel : string): Observable<QuizQuestion[]>{
    const queryUrl =  `${this.baseUrl}?amount=${noOfQuestion}&category=${category}
                        &difficulty=${difficultyLevel}&type=multiple`;
    
    return this.httpClient.get<{results: QuizQuestion[]}>(queryUrl).pipe(
      map((data)  => {
        return data.results.map( questionData => {
          let answers = this.shuffleAnswers([questionData.correct_answer, ...questionData.incorrect_answers])
          return {
            ...questionData,
            answerList : answers
          }
        })
      })
    )
  }

  shuffleAnswers(answerArray : string[]): string[]{    
    for (let i = answerArray.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [answerArray[i], answerArray[j]] = [answerArray[j], answerArray[i]]; 
    } 
    return answerArray; 
  }
}
