import React, { Component } from "react";
import { connect } from "react-redux";
import "../components/jobsearch/jobsearch.css";
import JobCard from "../components/jobsearch/searchcard-expanded-card";
import { searchJobs } from "../redux/actions/userActions";
import { jobSearch } from '../components/jobsearch/jobSearchFunc'
import { uuid } from 'uuidv4';
// to call the api constantly we list it in our package.json at the end ounder proxy
// TODO: if on this page you need to not redirect through user actions can't research need to clear state on redirect
class JobSearch extends Component {
  state = {
    errors: [],
    jobSearchInput: [
      {
        keywords:"",
        tradeClassification: "",
        state: "",
      },
    ],
    classifcations :[
      "Air Conditioning & Refrigeration",
      "Arborist",
      "Automotive Trades",
      "Bakers & Pastry Chefs",
     "Boat Builder and Repairer",
      "Bricklayer",
      "Building Trades",
      "Butchers",
      "Cook",
     "Carpentry",
      "Cabinet Making",
      "Cleaning Services",
     "Electricians",
     "Fitters, Turners & Machinists",
      "Floristry",
      "Gardening & Landscaping",
      "Glazier",
     "Hair & Beauty Services",
      "Joiner",
     "Labourers",
      "Lift Mechanic",
     "Locksmiths",
      "Maintenance /Handyperson Services",
     "Metal Fabricator",
     "Nannies & Babysitters" ,
      "Painters & Sign Writers" ,
     "Plaster",
     "Plumbers",
      "Printing & Publishing Services" ,
      "Roof Tiler",
      "Roof Plumber",
      "Screen Printer",
     "Shearer",
      "Security Services",
      "Stonemason",
      "Tailors & Dressmakers",
      "Telecommuncations",
      "Technicians",
      "Wall and Floor Tiler",
     "Welders & Boilermakers",
     "Other"]
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }


  handleChange = (e) => {
    let jobSearchInputState = [...this.state.jobSearchInput];
    jobSearchInputState[e.target.dataset.id][e.target.name] = e.target.value;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    jobSearch(this.state, this.props)
   
  };
  render() {
    let recentJobsMarkup = this.props.data.jobs ? (
      this.props.data.jobs.map((job) => <JobCard key={job.jobId} job={job} />)
    ) : (
      <p>Loading...</p>
    );
    const {
      UI: { loading, errors },
    } = this.props;
   let {classifcations} = this.state;
    return (
      
      // search bar
      <div className="jobSearchBody" key={uuid}>
        <div className="search">
          <div className="jobSearchBarSection">
            <h1 className="jobSearchHeader">Job Search</h1>
            <div className="jobSearchBar">
              <form
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                className="searchBarForm"
              >
                <div className="jobSearchInputs">

                  <div className="jobSearchTrade">
                    <label>Trade</label>
                    <input
                      type="search"
                      name="keywords"
                      data-id="0"
                      placeholder="Enter Job Keywords"
                      className="searchTradeJobs"
                    ></input>
                     </div>

                     <div className="jobSearchClassification">
                    <label>Trade Classification</label>
            <select name="tradeClassification" className="searchTradeJobs" data-id="0">
              <option value="" disabled selected hidden>
                Trade Classification
              </option>
              {classifcations.map(classifcation =>{
                return <option key={uuid()} value={classifcation}> {classifcation}</option>
              })}
            </select>
            </div>


            <div className="jobSearchLocation">
                    <label>Location</label>
                    <select
                      name="state"
                      className="searchTradeJobs"
                      data-id="0"
                    >
                      <option value="" disabled selected hidden>
                        State
                      </option>
                      <option>ACT</option>
                      <option>NSW</option>
                      <option>NT</option>
                      <option>QLD</option>
                      <option>TAS</option>
                      <option>SA</option>
                      <option>VIC</option>
                      <option>WA</option>
                    </select>
                  </div>
                  
                 

                  
                </div>
                <div className="errorCont">
                {errors !== null ? (
                <div className="errorsMessage">{errors.error}</div>
              ) : null}
                </div>
                <div className="jobSearchBarBottom">
               
                <button className="jobToggleButton">Search</button>
              
                </div>
               
              </form>
             
            </div>
          </div>
          {recentJobsMarkup}
       
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});

const mapActionsToProps = {
  searchJobs,
};

export default connect(mapStateToProps, mapActionsToProps)(JobSearch);
