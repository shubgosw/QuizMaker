export interface QuizQuestion{
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
    answerList : string[],
    chosenAnswer : string
}