const { db } = require("../util/admin");
const { imageCheck } = require("../util/validators");

//GET A SINGLE JOB
exports.getJob = (request, response) => {
  let jobData = {};
  db.doc(`/job/${request.params.jobId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Job not found" });
      }
      jobData = doc.data();
      console.log(jobData);
      return response.json({ message: "Job retrived" , jobData : jobData});
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

//GET ALL JOBS
exports.getAllJobs = (request, response) => {
  db.collection("job")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let jobs = [];
      data.forEach((doc) => {
        jobs.push({
          jobId: doc.id,
          job: doc.data().job,
          company: doc.data().company,
          location: doc.data().location,
          salary: doc.data().salary,
          salaryFreq: doc.data().salaryFreq,
          createdAt: doc.data().createdAt,
          aboutBusiness: doc.data().aboutBusiness,
          role: doc.data().role,
          skillsExp: doc.data().skillsExp,
          applyNow: doc.data().applyNow,
          contactDetails: doc.data().contactDetails,
          handle: doc.data().handle,
          imageUrl: doc.data().imageUrl,
        });
      });
      return response.json(jobs);
    })
    .catch((err) => console.error(err));
};

exports.searchJobs = (request,response) =>{

  
}

exports.createNewJob = (request, response) => {
  //because of FBAuth we don't have to name the user handle as we have already got it from this previous function
  let imageUrl = imageCheck(request.body.imageUrl);
  const newJob = {
    job: request.body.job,
    company: request.body.company,
    location: request.body.location,
    salary: request.body.salary,
    salaryFreq: request.body.salaryFreq,
    aboutBusiness: request.body.aboutBusiness,
    role: request.body.role,
    skillsExp: request.body.skillsExp,
    applyNow: request.body.applyNow,
    contactDetails: request.body.contactDetails,
    createdAt: new Date().toISOString(),
    handle: request.user.handle,
    imageUrl: imageUrl,
  };

  db.collection("job")
    .add(newJob)
    .then((doc) => {
      db.doc(`/job/${doc.id}`)
        .update({ jobId: doc.id })
        .then(() => {
          response.json({ message: `document ${doc.id} created succesfully` });
        })
        .catch((err) => {
          console.error(err);
          return response.status(500).json({ error: err.code });
        });
    })
    .catch((err) => {
      response.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

//DELETE JOB
exports.deleteJob = (request, response) => {
  const document = db.doc(`/job/${request.params.jobId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Job not found" });
      }
      if (doc.data().handle !== request.user.handle) {
        return response.status(403).json({ error: "Unauthorized" });
      } else {
        document.delete();
        return response.json({ message: "Job deleted successfully" });
      }
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};
