import React, { Component } from "react";
import SearchBar from "../components/jobsearch/searchbar-search-card";
import SearchCardMin from "../components/jobsearch/searchcard-closed-card";
import "../components/jobsearch/jobsearch.css";
import axios from "axios";
import JobCard from '../components/jobsearch/searchcard-expanded-card'



// to call the api constantly we list it in our package.json at the end ounder proxy 
class JobSearch extends Component {
  state = {
    jobs : null
  };
  componentDidMount(){
    axios.get('/getjobs')
    .then(res =>{
      // console.log(res.data)
      this.setState({
        jobs: res.data
      })
      console.log(this.state.jobs)
    })
    .catch(err => console.log(err)); 
  };
  render(){
    let recentJobsMarkup = this.state.jobs ? (
      this.state.jobs.map((job) => <JobCard key={job.jobId} job={job}/>)
      ) : <p>Loading...</p>
      return (
        <div className="jobSearchBody">
          <div className="search">
            
            <SearchBar />
            {recentJobsMarkup}
           
           
          </div>
        </div>
      );
  }
}

export default JobSearch;


{/* <SearchCardMin />
<SearchCardMin />
<SearchCardMin /> */}