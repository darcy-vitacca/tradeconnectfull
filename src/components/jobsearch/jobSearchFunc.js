export function jobSearch(state, props) {
  console.log(state.jobSearchInput[0]);
  console.log("working");
  let searchInput = state.jobSearchInput[0];
  let keywordArr;
  let keywordValidator = () => {
    keywordArr = searchInput.keywords
      .split(" ")
      .reduce((acc, cv) => {
        return acc + " " + cv[0].toUpperCase() + cv.slice(1);
      }, "")
      .trim();
    keywordArr = keywordArr.split(" ");
    return keywordArr;
  };
  // //FULL SEARCH/////////////
  // //trade, state
  if (
    (searchInput.tradeClassification &&
      searchInput.state &&
      searchInput.keywords) !== ""
  ) {
    console.log("here1");
    const searchReq = {
      keywords: keywordValidator(),
      trade: searchInput.tradeClassification,
      state: searchInput.state,
    };
    console.log(searchReq);
    props.searchJobs(searchReq, props.history);
  }

  //TWO FIELDS SEARCHES/////////
  //keyword, state
  else if ((searchInput.keywords && searchInput.state) !== "") {
    console.log("here1");
    const searchReq = {
      keywords: keywordValidator(),
      trade: "",
      state: searchInput.state,
    };
    console.log(searchReq);
    props.searchJobs(searchReq, props.history);
  }
  //keyword trade classificaiton
  else if ((searchInput.keywords && searchInput.tradeClassification) !== "") {
    console.log("here1");
    const searchReq = {
      keywords: keywordValidator(),
      trade: searchInput.tradeClassification,
      state: "",
    };
    console.log(searchReq);
    props.searchJobs(searchReq, props.history);
  }
  //state trade classificaiton
  else if ((searchInput.state && searchInput.tradeClassification) !== "") {
    console.log("here1");
    const searchReq = {
      keywords: "",
      trade: searchInput.tradeClassification,
      state: searchInput.state,
    };
    console.log(searchReq);
    props.searchJobs(searchReq, props.history);
  }

  //SINGLE SEARCHES//////////////
  //keywords only search
  else if (searchInput.keywords !== "") {
    console.log("here2");
    console.log(searchInput.keywords);
    const searchReq = {
      keywords: keywordValidator(),
      trade: "",
      state: "",
    };
    console.log(searchReq);
    props.searchJobs(searchReq, props.history);
  }

  // state only search
  else if (searchInput.state !== "") {
    console.log("here3");
    console.log(searchInput.state);
    const searchReq = {
      keywords: "",
      trade: "",
      state: searchInput.state,
    };
    console.log(searchReq);
    props.searchJobs(searchReq, props.history);

    //trade only search
  } else if (searchInput.tradeClassification !== "") {
    console.log("here2");
    console.log(searchInput.tradeClassification);
    const searchReq = {
      keywords: "",
      trade: searchInput.tradeClassification,
      state: "",
    };
    console.log(searchReq);
    props.searchJobs(searchReq, props.history);

    //full empty search
  } else {
    console.log("here4");
    const searchReq = {
      keywords: "",
      trade: "",
      state: "",
    };
    console.log(searchReq);
    props.searchJobs(searchReq, props.history);
  }
}
