const survey = require('../surveyname/answer');

const getsurvey = async (req,res) =>{
    try{
        const surveys = await survey.find({userId:req.user.id});
        
        res.json(survey);
    }
    catch(error){

        res.status(500).json({ message:error.message});
    }
};

const createsurvey = async (req, res) => {
const {title, question, answer} = req.body;
try{
const survey = await survey.create({ userId: req.user.id,title, question,answer})
res.status(201).json(survey);
}
catch(error){
    res.status(500).json({ message: error.message });
}
};

const updatesurvey = async (req,res) => {
    const {title,question, answer, completed} = req.body;
    try{
    const survey = await survey.findById(req.params.id);
    if(!survey) return res.status(404).json({ message:'survey not found'});

    survey.title = title || survey.title;
    survey.question = question || survey.question;
    survey.answer = answer || survey.answer;
    survey.completed = completed ?? survey.completed;
    const updatesurvey = await survey.save();
    res.json(updatesurvey)
    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
    };

const deletesurvey = async (req, res)=>{
    try{
        const survey = await survey.findById(req.params.id);
        if(!survey) return res.status(404).json({ message:'survey not found'});
        await survey.remove();
        res.jsn({ message:'survey deleted'});
    } catch (error){
        res.status(500).json({message: error.message })

    }
    };

    modeule.export = {getsurvey,createsurvey, updatesurvey, deletesurvey}
