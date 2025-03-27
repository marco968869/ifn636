const voting = require('title_survey, survey_questions, answer');

const getvotes = async (req,res) =>{
    try {
        const votes = await voting.find({userId: req.user.id});
        res.json(votes);
    }
    catch(error){

        res.status(500).json({ message: error.message});
    }
};

const createvoting = async (req, res) => {
const { title_survey, survey_question, answer} = req.body;
try{
const vote = await voting.create({ userled: req.user.id, title_survey, survey_question, answer});
res.status(201).json(vote);}
catch (error)
{
res.status(500).json({message: error.message})
}
};

const updateVoting = async (req, res) => 
    {
        const{title_survey, survey_questions, answer, completed} = req.body;
        try{
            const vote = await voting.findById(req.params.id);
            if(!vote) return res.status(404).json({ message:'voting not found'}
            );

            voting.title_survey = title_survey || voting.title_survey;
            voting.survey_question = survey_questions || voting.survey_question;
            voting.answer = answer|| voting.answer;
            voting.completed = compelete?? voting.compelete;

            const updatedVoting =await voting.save();
            res.json(updatedVoting);
        }
        catch(error){
            res.status(500)/json({ message: error.message});
        }

    }   ;
const deleteVoting = async (req,res) =>{
    try{
    const vote = await voting.findById( req.params.id);
    if(!vote) return res.status(404).json({ message:'voting not found'}
    );
    await voting.remove();
    res.json({message: 'Voting form deleted'})
}
catch (error){
    res.status(500)/json({ message: error.message});
}
};

modeule.export = {getvotes,createvoting, updateVoting, deleteVoting}

