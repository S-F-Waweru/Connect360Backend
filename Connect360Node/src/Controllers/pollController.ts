import { Request, Response } from "express";
import { v4 as uid } from 'uuid'

import { Choice, Poll, PollRequest, Question, Vote } from "../Models/Polls";
import { DBHelper } from "../DatabaseHelpers";
import { ExtendedRequest1 } from "../Middleware";


const dbInstance = new DBHelper()

export const addPoll = (request: PollRequest, response: Response) => {
    try {
        //get Poll
        const { Question, Choices } = request.body
        // create a question Object
        console.log(Choices);
     

        const UserId = request.info?.Sub
        if (UserId === undefined) {
            return response.status(400).json({ message: "Sign up First!!" })
        }
        console.log(request.info?.Role)
        
        if (request.info?.Role !== 'Gov') {
            return response.status(400).json({ message: "You Must be registered as a Government Official!" })
        }

          //Id for question 
          const Id = uid()

        // const newQuestion: Question = { Id, Question, UserId }
        // console.log(newQuestion);
        //add to database
        // 1 .Questio
        try {
            dbInstance.exec('AddQuestion', {Id, Question, UserId })
        } catch (error:any) {
            console.error('Database Error:', error);
            return response.status(500).json({ Message: 'Database error occurred during Poll Creation'})
        }

        try {
            //create a choice object
        for (const choiceIndex in Choices) {
            const choiceId = uid()
            // choice
            // const newChoice: Choice = { Id: choiceId, Choice: Choices[choice], QuestionId: Id }
            dbInstance.exec('Addchoice',  { Id: choiceId,  QuestionId: Id,Choice: Choices[choiceIndex]})
            // console.log(newChoice)
        }

        return response.status(200).json({Message:'Poll Added successfully '})
        } catch (error) {
            console.error('Database Error:', error);
            return response.status(500).json({ Message: 'Database error occurred during Poll Creation'})
        }
        
    }
    catch (error: any) {
        return response.status(500).json(error.message)
    }

}

export const vote = async (request:ExtendedRequest1, response:Response)=>{
    const{ChoiceId, QuestionId} = request.body
    // userId  , id, choiceid, questionid
    const Id = uid()
    const UserId = request.info?.Sub
    if(!UserId){
        return response.status(401).json({Message : "You must be signed in"})
    }
      //check if user already voted
    const isVoted =(await dbInstance.exec('GetVote', {UserId,QuestionId})).recordset as Vote[]

    if(isVoted.length > 0){
        return response.status(400).json({Message:"You have already voted!"})
    }
    // /save to database
    dbInstance.exec('AddVote',{Id, UserId, ChoiceId, QuestionId})   
}

// retruns aal the records inthe
export const getAllvotes =async (request:Request, response:Response)=>{
    const votes = (await dbInstance.exec('GetAllvotes', {})).recordset as Vote[]

    if(!votes){
        return response.status(404).json({Message:'No Votes Cast Yet.'})
    }

    return response.status(200).json(votes)
}

export const getPolls = async (request:Request,response:Response)=>{
    console.log('Reachig Here');
    
    //get all questions
    //get the choices for each question
    //return all polls
    try {
        //ger question
        const Questions  =(await dbInstance.exec('GetQuestions', {})).recordset as Question[] 
        const Choices = (await dbInstance.exec('GetChoices', {})).recordset as Choice[]

        console.log(Questions);
        console.log(Choices);

        if(Questions.length==0){
            response.status(404).json({message:"No Questions Found"})
        }

        if(Choices.length==0){
            response.status(404).json({message:"No Choices Found"})
        }
        console.log("£");

        console.log(Questions);
        console.log(Choices);


        console.log(Choices);

        let allPolls:Poll[] =[]       
        let choices:Choice[]=[]

        for(let question of Questions){
            console.log(question)
            choices= Choices.filter(c=>c.QuestionId === question.Id)
            const singlePoll  ={
                Question:question,
                Choices: choices
            }

            allPolls.push(singlePoll)
        }

        console.log(allPolls);
        
        
    
       return response.status(200).json(allPolls)

    } catch (error) {
        console.log(error);
        
        return response.status(500).json({Message:'Database Error 4'})
    }
}