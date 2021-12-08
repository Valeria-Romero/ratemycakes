const { BakerModel } = require('../models/ApiModel');
const {CakeModel} = require('../models/CakeModel');

const CakeController = {

    allCakes: function(req, response){
        CakeModel
        .getAllCakes()
        .then( data => {
            let task = data.map(tasks => {
                console.log( tasks );
                return {
                    _id: tasks._id,
                    firstname: tasks.firstname,
                    lastname : tasks.lastname,
                    image : tasks.image,
                    created_at : tasks.created_at,
                    id2: tasks.baker_id
                }
            })
        console.log( task );
        response.status( 200 ).json( {message: "Success!", task: task} );
        })
        .catch( err => {
            console.log( "Something went wrong!" );
            console.log( err );
            response.json( err );
        })
    },

    addRate : function(request, response){
        let id = request.body.id;
        let rating = request.body.rating;
        let comment = request.body.comment;
        let created_at = new Date();

        ratedCake = {
            rating,
            comment,
            created_at
        }
        console.log("Rate Id: ", id);
        console.log("Rate: ", ratedCake);
        CakeModel
        .addRate(ratedCake)
        .then( data => {
            console.log("Add Rate: ", data);
            newCakeRate = {
                rating: data
            }
            BakerModel
            .updateCake(id, data)
            .then( data2 => {
                response.status(200).json(data2);
            })
        })
        
    },

    findById : function ( request, response ) {
        let id2 = request.params.id2;
        console.log("HERE", id2);

        CakeModel
            .getTaskById(id2)
            .then( titles => {
                let cake = titles
                console.log("HERE", cake);
                response.status( 200 ).json( {message: "Success!", cake : cake} );
            })
    },

    update : function(request, response) {
        let title = request.params.title;
        console.log("Success L1 :", title);

        CakeModel
            .getTaskByName(title)
            .then(result => {
                if( result === null ){
                    console.log( "Something went wrong!" );
                    response.json({message: "Error!", error: err});
                }
                else {
                    let task = result;
                    console.log("HERE", task);
                    response.status( 200 ).json( {message: "Success!", cake : cake} );
                    if(task.title === request.body.title){
                        response.json({message: "Error!"});
                    }
                    if(request.body.title){
                        task.title = request.body.title;
                    }
                    if(request.body.description){
                        task.description = request.body.description;
                    }
                    if(request.params.completed){
                        task.completed = request.body.completed;
                    }
                    task.save(function(err){
                        if(err){
                            console.log("AHHHHHHHHHHHHHH EROR 1");
                            response.json({message: "Error!", error: err});
                        }
                        else{
                            console.log("AHHHHHHHHHHHHHH EROR 2");
                            console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW ", task);
                            response.status(200).json({message: "Success!", task: task})
                        }
                    })
                }
            })
            
    }
    
}

module.exports = {CakeController};

