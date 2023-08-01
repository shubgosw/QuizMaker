import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizQuestion } from 'src/app/models/quiz-question.model';
import { QuizDataService } from 'src/app/services/quiz-data.service';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {

  quizQuestions: QuizQuestion[] = [];
  userScore: number = 0;
  statusColor: string = 'bg-red';
  constructor(private quizData: QuizDataService,
    private router : Router ) {

  }

  ngOnInit() {
    this.quizQuestions = this.quizData.fetchQuizQuestions();
    if (this.quizQuestions && this.quizQuestions.length) {
      let questionsCorretlyAnswered = this.quizQuestions
        .filter(question => question.chosenAnswer === question.correct_answer)
      this.userScore = questionsCorretlyAnswered.length;
      this.assignStatusColor(this.userScore);
    }
  }

  assignStatusColor(score: number) {
    if (score <= 1) {
      this.statusColor = 'bg-red';
    }
    else if (score <= 3) {
      this.statusColor = 'bg-yellow'
    }
    else {
      this.statusColor = 'bg-green'
    }
  }

  createNewQuiz() {
    this.router.navigate(['/']);
  }
}
