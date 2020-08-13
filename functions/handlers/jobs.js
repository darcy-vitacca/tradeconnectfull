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
      return response.json({ message: "Job retrived", jobData: jobData });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

//SEARCH JOBS  //SEARCH JOBS //SEARCH JOBS  //SEARCH JOBS
exports.searchJobs = (request, response) => {
  console.log("here");
  console.log(request.body);
  let jobsAll = [];
  //jobs search func
  jobSearch = (data) => {
    if (data.size > 0) {
      data.forEach((doc) => {
        jobsAll.push({
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
    }
  };

  //checks for search results
  resultsCheck = () => {
    if (jobsAll === undefined || jobsAll.length == 0) {
      return response.status(404).json({ error: "No Employees Found" });
    } else {
      return response.json(jobsAll);
    }
  };

  //full Search
  if ((request.body.trade && request.body.state) != "") {
    console.log("here2");
    const searchReq = {
      trade: request.body.trade,
      state: request.body.state,
    };
    console.log(searchReq);
    db.collection("job")
      .where("state", "==", searchReq.state)
      .where("job", "==", searchReq.trade)
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        jobSearch(data);
        resultsCheck();
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  }
  //SINGLE SEARCHES
  //trade only
  else if (request.body.trade != "" && request.body.state === "") {
    console.log("here3");
    const searchReq = {
      trade: request.body.trade,
    };
    console.log(searchReq);
    db.collection("job")
      .where("job", "==", searchReq.trade)
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        jobSearch(data);
        resultsCheck();
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  }

  // state  only
  else if (request.body.state != "") {
    console.log("here4");
    const searchReq = {
      state: request.body.state,
    };
    console.log(searchReq);
    db.collection("job")
      .where("state", "==", searchReq.state)
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        console.log(data);
        jobSearch(data);
        resultsCheck();
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });

    //full empty search
  } else {
    console.log("else");
    db.collection("job")
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        jobSearch(data);
        resultsCheck();
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
      });
  }
};

exports.createNewJob = (request, response) => {
  //because of FBAuth we don't have to name the user handle as we have already got it from this previous function
  let imageUrl = imageCheck(request.body.imageUrl);
  const newJob = {
    job: request.body.job,
    company: request.body.company,
    location: request.body.location,
    salary: request.body.salary,
    salaryFreq: request.body.salaryFreq,
    state: request.body.state,
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

//TODO://
//GET ALL JOBS
// exports.getAllJobs = (request, response) => {
//   db.collection("job")
//     .orderBy("createdAt", "desc")
//     .get()
//     .then((data) => {
//       let jobs = [];
//       data.forEach((doc) => {
//         jobs.push({
//           jobId: doc.id,
//           job: doc.data().job,
//           company: doc.data().company,
//           location: doc.data().location,
//           salary: doc.data().salary,
//           salaryFreq: doc.data().salaryFreq,
//           createdAt: doc.data().createdAt,
//           aboutBusiness: doc.data().aboutBusiness,
//           role: doc.data().role,
//           skillsExp: doc.data().skillsExp,
//           applyNow: doc.data().applyNow,
//           contactDetails: doc.data().contactDetails,
//           handle: doc.data().handle,
//           imageUrl: doc.data().imageUrl,
//         });
//       });
//       return response.json(jobs);
//     })
//     .catch((err) => console.error(err));
// };
