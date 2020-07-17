const {admin } = require('./admin')
const {db} = require('../util/admin');
//To authenticate middleware we need to add authorization and chain it before any request. Express allows us to add another argumment to a route by accepthing another argument 
//firebase auth next is used to proceed to the next handler in the route and you can nchain as many parts as you need


module.exports = (request, response, next) => {
  // This checks header for a bearer token in authorization
  let idToken;
  // console.log(request.headers.Authorization)
  if(request.headers.authorization && request.headers.authorization.startsWith('Bearer ')){
    //Gets the bearer back and splits the string to get the token we then need to verify if we have an id token
    idToken = request.headers.authorization.split('Bearer ')[1];
  }else{
    console.error("No token found")
    return response.status(403).json({ error : "Unauthorized"});
  }
  //we  need to verify this token is verified by our application using this auth which returns a promise with a decoded idToken which holds the user data within the token. We need to add this so when we move to the next part of the route. We need to get the handle of the user or person who is posting the job 
  admin.auth().verifyIdToken(idToken)
  .then(decodedToken =>{
    request.user = decodedToken
    console.log(decodedToken)
    //auth doesn't return a handle becuase it's stored in users so we need to check the users for a id which is stored in the token and the users section it uses the decoded token to match the db uid
    return db.collection('users')
    //returns one result where userId from the token is equal to db userId and get return a promise of this data to get the handle it will retrun a docs array which will need to be accessed using data.docs[0].data() to get the first item from the docs
    .where('userId', '==', request.user.uid)
    .limit(1)
    .get();
  })
  .then( data =>{
    request.user.handle = data.docs[0].data().handle;
    //which allows the next request to proceed with the stored data 
    return next();
  })
  // this is if the token has failed it is blacklisted or is from somewhere else 
  .catch(err =>{
    console.error('Error while verifying token', err);
    return response.status(403).json(err);
  })
}
