const {  ObjectId } = require("mongodb");
const connection = require('./connection');
const mongodb = require('./connection/mongodb');

const getAll = async ()=> {

    const video = mongodb.collection('video');

    const data = await video.find({}).toArray();

    data.forEach((d)=>{
        d.id = d._id
    });

    return data; 
};

const getById = async (id)=> {

    const video = mongodb.collection('video');

    let data = null;

    var o_id = new ObjectId(id);

    //await video.findOne( { "_id": id } );

    data = await video.find({_id: new ObjectId(id)}).toArray();

    return data;
};

const create = async (url)=> {

    const video = mongodb.collection('video');

    await video.insertOne({ url:url });

};


const update = async (url, id)=> {

    const video = mongodb.collection('video');

    await video.updateOne(
        {_id: new ObjectId(id)},
        { $set: { 'url': url} }
      );

    return getProjectById(id) 
};

const del = async (id)=> {
    
    const video = mongodb.collection('video');

    try {
        await video.deleteOne({_id: new ObjectId(id)});
    } catch (error) {
        return false;
    }

    return true;
};


module.exports = { 
    getAll, 
    getById,
    create,
    update,
    del,
};