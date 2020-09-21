const {db} = require('../util/admin');

exports.getProfile = (request, response) =>{
    let profileData = {}
    console.log('Here')
    db.doc(`/profiles/${request.params.userId}`).get()
    .then(doc =>{
        //checks if the doucment has been made in the database or not
        if(!doc.exists){
            return response.status(404).json({error : 'Profile not found'})
        }
        profileData = doc.data();
        // console.log(profileData)
        return response.json({ message: "Profile retrived" ,profile: profileData});
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
    
}

//TODO:
//to get filtered profiles rewatch video 10 or all profiles that meet a certain param
//for complex queries you need to make indexes in firebase so for all your searches it will need  certain index
