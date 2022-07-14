const filesModel = require('../models/files.model');

// //funcion para crear nuevo post
const createFiles = async (req, res) => {
    try {

         const file = await  filesModel.create({
              postId: req.body.postid,
              type: req.body.type,
              file: req.body.file,
         })     
            
         res.json({
               file
         });
    } catch (err) {
         res.status(500).json(err);
    }
}

 //Endpoint trae los archivos por id 
 const getFiles = async (req, res) => {
    const { category } = req.body;
    try {
        const files = await filesModel.findAll({
        //attributes:["fileId", "name", "category", "departamentId", "type", "file", "createdBy", "createdAt", "modifiedBy", "modifiedAt"],
         where: {
            category: category,
        },

        });

         res.json(
              files,
         );

    } catch (err) {
        res.status(500).json({message: 'Error en el servidor'});
    }
   
};


module.exports={
    createFiles,
    getFiles
}