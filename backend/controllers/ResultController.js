const Result = require('title_survey, voting_number,result');

const getResults = async (req, res) => {
    try{
        const results = await Result.find({ userId: req.user.Id})
        res.json(results);
    }
    
    catch(error){

            res.status(500).json({ message:error.message});
    }
};

const createResult = async (req, res)=>{
    const{title_survey, voting_number, result} = req.body;
    try{
        const result = await Result.create({userId: req.user.id,title_survey, voting_number, result});
        res.status(201).json(result);
    }
    catch(error){

        res.status(500).json({ message:error.message});
}
};

const updateResult = async(req,res) =>{
    const{title_survey, voting_number,result_of_survey, completed} =req.body;
    try{
    const result = await Result.findById(req.params.id);
    if(!result) return res.status(404).json({ message: 'The Result is not found'});
    
    result.title_survey = title_survey || result.title_survey;
    result.voting_number = voting_number || result.voting_number;
    result.resultofsurvey = result_of_survey || result.result_of_survey
    result.completed = completed??result.completed;
    }
    catch(error){

        res.status(500).json({ message:error.message});
}
};

const deleteResult = async (req,res) =>{
    try{
        const result = await Result.findById(req.params.id);
        if(!result) return res.status(404).json({ message:' The Result is not found'});
        
        await result.reove();
        res.json({ message:'result deleted'});   
    }
    catch(error){

        res.status(500).json({ message:error.message});
}
};

modeule.export = { getResults, createResult, updateResult, deleteResult};