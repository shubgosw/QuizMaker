export interface QuizCategory {
    id: number;
    name : string;
}

export interface QuizCategoryResponse{
    trivia_categories : QuizCategory[];
}