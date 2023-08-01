import { Component, OnInit } from '@angular/core';
import { QuizCategory } from '../../models/quiz-category.model'
import { CategoriesService } from 'src/app/services/categories.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizQuestion } from 'src/app/models/quiz-question.model';
import { QuizDataService } from 'src/app/services/quiz-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{

  difficultyOptions : Array<string> = ['Easy', 'Medium', 'Hard'];
  selectedCategory : number|null = null;
  selectedDifficulty : string ='';
  quizCategories : QuizCategory[] = []
  noOfQuestion: number = 5;
  quizQuestions: QuizQuestion[] = []
  enableSubmit: boolean = false;

  constructor(private categoriesService : CategoriesService,
    private questionService : QuestionService,
    private quizDataService: QuizDataService,
    private router : Router){

  }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() : void {
    this.categoriesService.getCategories().subscribe({
      next : (response)=> {
        this.quizCategories = response
      }, 
      error : (error) => {
        console.error('Error in pulling Categories', error)
      } 
    })
  }

  generateQuiz(){
    this.enableSubmit = false;
    if(this.selectedCategory && this.selectedDifficulty){
      this.questionService.getQuizData(this.noOfQuestion, this.selectedCategory, this.selectedDifficulty)
      .subscribe((data)=>{
        this.quizQuestions = data.map((question: QuizQuestion)=> {
          return {
            ...question,
            chosenAnswer : ''
          }
        }) 
      });
    }
  }

  checkIfAllSelected(){
    this.enableSubmit = this.quizQuestions.every(question => question.chosenAnswer);
  }

  submitQuiz(){
    let unansweredQuestions = this.quizQuestions.filter(question => !question.chosenAnswer)

    if(unansweredQuestions.length == 0){
      this.quizDataService.saveQuizQuestion(this.quizQuestions);
      this.router.navigate(['/quiz-results'])
    }
    else{
      alert('Please answer all questions before submitting your response');
    }
  }

}
