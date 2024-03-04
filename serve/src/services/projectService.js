const queries = require('../queries');
//const firebase = require('../bd');

const getAllProjects = async ()=>{
    console.log('projects v1 ');
    const allProjects = await queries.getAllProjects();
    //const allProjects = await firebase.getAllProjects();
    return allProjects;
}

const getProjectById = async (id)=>{
    const project = await queries.getProjectById(id);
    return project;
}

const createProject = async (name, body)=>{

    const project =await await queries.createProject(name, body);
    return project;
}

const updateProject = async (name, body, id)=>{

    const project =await await queries.updateProject(name, body, id);
    return project;
}

const deleteProject = async (id)=>{

    const project =await await queries.deleteProject(id);
    return project;
}
module.exports = {
    getAllProjects,
    getProjectById,
    createProject, 
    updateProject,
    deleteProject
};