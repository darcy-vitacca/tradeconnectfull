const { db } = require("../util/admin");
const { imageCheck } = require("../util/validators");
const { response } = require("express");

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
      return response.json({ message: "Job retrived", jobData: jobData });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};


//JOB DASHBOARD
exports.jobDashboard = (request, response) =>{
 let jobsAll = [];
  db.collection("job")
  .where("userId", "==", request.params.userid)
  .orderBy("createdAt", "desc")
  .get()
  .then((data) => {

    if (data.size > 0) {
    data.forEach((entry) =>{
      console.log(entry)
      jobsAll.push({
        jobId: entry.id,
        job: entry.data().job,
        jobSummary: entry.data().jobSummary,
        company: entry.data().company,
        location: entry.data().location,
        state: entry.data().state,
        salary: entry.data().salary,
        salaryFreq: entry.data().salaryFreq,
        aboutBusiness: entry.data().aboutBusiness,
        keywords: entry.data().keywords,
        role: entry.data().role,
        skillsExp: entry.data().skillsExp,
        additionalInfo: entry.data().additionalInfo,
        contactDetails: entry.data().contactDetails,
        tradeClassification: entry.data().tradeClassification,
        handle: entry.data().handle,
        imageUrl: entry.data().imageUrl,
        workType: entry.data().workType,
        createdAt: entry.data().createdAt,
      });
    })
      if (jobsAll === undefined || jobsAll.length === 0) {
        return response.status(404).json({ error: "No Jobs Found... Press the plus icon to post a job." });
      } else {

        return response.json(jobsAll);
      }
    }else {
      return response.status(404).json({ error: "No Jobs Found... Press the plus icon to post a job." });
    }
  
  })

    //TODO: check if there is anythign there send response no jobs found

  .catch((err) => {
    console.error(err);
    return response.status(500).json({ error: err.code });
  });
}

//SEARCH JOBS  //SEARCH JOBS //SEARCH JOBS  //SEARCH JOBS//SEARCH JOBS  //SEARCH JOBS //SEARCH JOBS  //SEARCH JOBS //SEARCH JOBS  //SEARCH JOBS
exports.searchJobs = (request, response) => {
  let jobsAll = [];
  //jobs search func
  jobSearch = (data) => {
    if (data.size > 0) {
      data.forEach((doc) => {
        jobsAll.push({
          jobId: doc.id,
          job: doc.data().job,
          jobSummary: doc.data().jobSummary,
          company: doc.data().company,
          location: doc.data().location,
          state: doc.data().state,
          salary: doc.data().salary,
          salaryFreq: doc.data().salaryFreq,
          aboutBusiness: doc.data().aboutBusiness,
          keywords: doc.data().keywords,
          role: doc.data().role,
          skillsExp: doc.data().skillsExp,
          additionalInfo: doc.data().additionalInfo,
          contactDetails: doc.data().contactDetails,
          tradeClassification: doc.data().tradeClassification,
          handle: doc.data().handle,
          imageUrl: doc.data().imageUrl,
          workType: doc.data().workType,
          createdAt: doc.data().createdAt,
          userId: doc.data().userId,
        });
      });
    }
  };
  //checks for search results
  resultsCheck = () => {
    if (jobsAll === undefined || jobsAll.length === 0) {
      return response.status(404).json({ error: "No Jobs Found" });
    } else {
      return response.json(jobsAll);
    }
  };

  //FULL SEARCH
  if (
    (request.body.trade && request.body.state && request.body.keywords) !== ""
  ) {
    const searchReq = {
      keywords: request.body.keywords,
      trade: request.body.trade,
      state: request.body.state,
    };
    console.log(searchReq);
    db.collection("job")
      .where("keywords", "array-contains-any", searchReq.keywords)
      .where("state", "==", searchReq.state)
      .where("tradeClassification", "==", searchReq.trade)
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
  //2 FIELDS SEARCHES
  //trade state
  else if (
    (request.body.trade && request.body.state) !== "" &&
    request.body.keywords === ""
  ) {
    const searchReq = {
      trade: request.body.trade,
      state: request.body.state,
    };
    console.log(searchReq);
    db.collection("job")
      .where("state", "==", searchReq.state)
      .where("tradeClassification", "==", searchReq.trade)
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
  //trade keywords
  else if (
    (request.body.trade && request.body.keywords) !== "" &&
    request.body.state === ""
  ) {
    const searchReq = {
      trade: request.body.trade,
      keywords: request.body.keywords,
    };
    console.log(searchReq);
    db.collection("job")
      .where("keywords", "array-contains-any", searchReq.keywords)
      .where("tradeClassification", "==", searchReq.trade)
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
  //keywords state
  else if (
    (request.body.keywords && request.body.state) !== "" &&
    request.body.trade === ""
  ) {
    const searchReq = {
      keywords: request.body.keywords,
      state: request.body.state,
    };
    console.log(searchReq);
    db.collection("job")
      .where("keywords", "array-contains-any", searchReq.keywords)
      .where("state", "==", searchReq.state)
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
  //keywords only
  else if (
    request.body.keywords !== "" &&
    (request.body.state && request.body.trade) === ""
  ) {
    const searchReq = {
      keywords: request.body.keywords,
    };
    console.log(searchReq);
    db.collection("job")
      .where("keywords", "array-contains-any", searchReq.keywords)
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
  //trade only
  else if (
    request.body.trade !== "" &&
    (request.body.state && request.body.keywords) === ""
  ) {
    console.log("here3");
    const searchReq = {
      trade: request.body.trade,
    };
    console.log(searchReq);
    db.collection("job")
      .where("tradeClassification", "==", searchReq.trade)
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
  else if (
    request.body.state !== "" &&
    (request.body.trade && request.body.keywords) === ""
  ) {
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
    editing: request.body.editing,
    jobId: request.body.jobId,
    job: request.body.job,
    jobSummary: request.body.jobSummary,
    company: request.body.company,
    location: request.body.location,
    state: request.body.state,
    salary: request.body.salary,
    salaryFreq: request.body.salaryFreq,
    aboutBusiness: request.body.aboutBusiness,
    keywords: request.body.keywords,
    role: request.body.role,
    skillsExp: request.body.skillsExp,
    additionalInfo: request.body.additionalInfo,
    contactDetails: request.body.contactDetails,
    tradeClassification: request.body.tradeClassification,
    imageUrl: imageUrl,
    workType: request.body.workType,
    createdAt: new Date().toISOString(),
    handle: request.user.handle,
    userId: request.user.uid,
  };
  if(newJob.editing === true){
    db.collection("job")
      .doc(newJob.jobId)
        .update(newJob)
        .then(() => {
          response.json({ message: `document ${newJob.jobId} updated succesfully` });
        })
        .catch((err) => {
          console.error(err);
          return response.status(500).json({ error: err.code });
        });
  }else{
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

  }
 
};

//DELETE JOB
exports.deleteJob = (request, response) => {
  console.log("here21")
  console.log(request.params)
  console.log(request.user)
  const document = db.doc(`/job/${request.params.jobId}`);
  document
    .get()
    .then((doc) => {
      console.log(doc)
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
