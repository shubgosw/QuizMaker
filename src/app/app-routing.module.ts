import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizResultsComponent } from './components/quiz-results/quiz-results.component';
import { QuizComponent } from './components/quiz/quiz.component';

const routes: Routes = [
  {path: 'quiz', component : QuizComponent},
  {path : 'quiz-results', component : QuizResultsComponent},
  {path: '', redirectTo : 'quiz' , pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
