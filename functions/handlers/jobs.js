const {db} = require('../util/admin');

// this uses express to route things through post or get automatcally
exports.getAllJobs = (request, response) => {
    db.collection("job")
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        let jobs = [];
        data.forEach((doc) => {
          jobs.push({
            jobId: doc.id,
            job: request.body.job,
            company: doc.data().company,
            location: doc.data().location,
            salary: doc.data().salary,
            salaryFreq: doc.data().salaryFreq,
            createdAt: doc.data().listed,
            aboutBusiness: doc.data().aboutBusiness,
            role: doc.data().role,
            skillsExp: doc.data().skillsExp,
            applyNow: doc.data().applyNow,
            contactDetails: doc.data().contactDetails,
            handle : doc.data().handle
          });
        });
        return response.json(jobs);
      })
      .catch((err) => console.error(err));
  }

  exports.createNewJob = (request, response) => {

    //because of FBAuth we don't have to name the user handle as we have already got it from this previous function
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
      handle: request.user.handle
      
    };
  
    db.collection("job")
      .add(newJob)
      .then((doc) => {
        response.json({ message: `document ${doc.id} created succesfully` });
      })
      .catch((err) => {
        response.status(500).json({ error: "something went wrong" });
        console.error(err);
      });
  }