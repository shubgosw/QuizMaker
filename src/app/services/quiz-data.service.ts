import { Injectable } from '@angular/core';
import { QuizQuestion } from '../models/quiz-question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizDataService {

    private quizData : QuizQuestion[] = [];
    contructor() { }

    saveQuizQuestion(quizQuestions : QuizQuestion[]){
        this.quizData = quizQuestions;
    }

    fetchQuizQuestions() : QuizQuestion[]{
        return this.quizData;
    }
  
}
