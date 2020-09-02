export function employeeSearch(state, props) {

  let fullNameArr;
  let searchInput = state.peopleSearchInput[0];
  //name validator
  let nameCaps = () => {
    fullNameArr = searchInput.name
      .split(" ")
      .reduce((acc, cv) => {
        return acc + " " + cv[0].toUpperCase() + cv.slice(1);
      }, "")
      .trim();
    fullNameArr = fullNameArr.split(" ");
    return fullNameArr;
  };

  //name, state, people search
  if ((searchInput.name && searchInput.tradeClassification && searchInput.state) !== "") {
    

    const searchReq = {
      fullName: nameCaps(),
      trade: searchInput.tradeClassification,
      state: searchInput.state,
    };
    console.log(searchReq);
    props.searchEmployee(searchReq, props.history);
    //trade, state, no name search
  } else if ((searchInput.tradeClassification && searchInput.state) !== "") {
    const searchReq = {
      fullName: "",
      trade: searchInput.tradeClassification,
      state: searchInput.state,
    };
    console.log(searchReq);
    props.searchEmployee(searchReq, props.history);
  }
  //name, state, no trade search
  else if ((searchInput.name && searchInput.state) !== "") {
    const searchReq = {
      fullName: nameCaps(),
      trade: "",
      state: searchInput.state,
    };
    console.log(searchReq);
    props.searchEmployee(searchReq, props.history);
  }
  //trade, name , no start search
  else if ((searchInput.tradeClassification && searchInput.name) !== "") {
    const searchReq = {
      fullName: nameCaps(),
      trade: searchInput.tradeClassification,
      state: "",
    };
    console.log(searchReq);
    props.searchEmployee(searchReq, props.history);
  }

  //name onle search
  else if (searchInput.name !== "") {
    console.log(searchInput.state);
    const searchReq = {
      fullName: nameCaps(),
      trade: "",
      state: "",
    };
    console.log(searchReq);
    props.searchEmployee(searchReq, props.history);
  }
  //trade only search
  else if (searchInput.tradeClassification !== "") {
    console.log(searchInput.tradeClassification);
    const searchReq = {
      fullName: "",
      trade: searchInput.tradeClassification,
      state: "",
    };
    console.log(searchReq);
    props.searchEmployee(searchReq, props.history);
  }

  // state only search
  else if (searchInput.state !== "") {
    const searchReq = {
      fullName: "",
      trade: "",
      state: searchInput.state,
    };
    console.log(searchReq);
    props.searchEmployee(searchReq, props.history);
    //empty search
  } else {
    const searchReq = {
      fullName: "",
      trade: "",
      state: "",
    };
    props.searchEmployee(searchReq, props.history);
  }
}
