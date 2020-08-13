export function  jobSearch(state, props){
    // console.log("working")
 
    let searchInput = state.jobSearchInput[0];
    //trade, state search
    if ((searchInput.trade && searchInput.state) !== "") {
      console.log("here1");
      const searchReq = {
        trade: searchInput.trade,
        state: searchInput.state,
      };
      console.log(searchReq);
      props.searchJobs(searchReq, props.history);
    }
    //trade only search
    else if (searchInput.trade !== "") {
      console.log("here2");
      console.log(searchInput.trade);
      const searchReq = {
        trade: searchInput.trade,
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
        trade: "",
        state: searchInput.state,
      };
      console.log(searchReq);
      props.searchJobs(searchReq, props.history);
    //full search
    } else {
      console.log("here4");
      const searchReq = {
        trade: "",
        state: "",
      };
      console.log(searchReq);
      props.searchJobs(searchReq, props.history);
    }
}
