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

//SEARCH JOBS  //SEARCH JOBS //SEARCH JOBS  //SEARCH JOBS//SEARCH JOBS  //SEARCH JOBS //SEARCH JOBS  //SEARCH JOBS //SEARCH JOBS  //SEARCH JOBS
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

  //FULL SEARCH
  if (
    (request.body.trade && request.body.state && request.body.keywords) !== ""
  ) {
    console.log("here2");
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
    console.log("here2");
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
    console.log("here2");
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
    console.log("here2");
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
    console.log("here3");
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
