import { ExtendedRequest1 } from "../Middleware"

export interface Question {
    Id:string,
    Question:string,
    UserId:string
}

export interface Choice {
    Id:string,
    QuestionId:string,
    Choice:string
}

export interface Poll {
    Question:Question
    Choices :Choice[]
}


export interface Vote{
    Id:string,
    QuestionId:string,
    ChoiceId:string,
    UserId:string,
}
interface addPoll {
    Question: string
    Choices :string[]
}

export interface PollRequest extends ExtendedRequest1 {
    body:addPoll
}