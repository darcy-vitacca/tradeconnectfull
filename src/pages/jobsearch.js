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
                <div className="jobSearchBarBottom">
                <button className="jobToggleButton">Search</button>
                </div>
               
              </form>
              {errors !== null ? (
                <div className="errorsMessage">{errors.error}</div>
              ) : null}
            </div>
          </div>
          {recentJobsMarkup}
          {/* body */}
          {/* <div className="jobSearchCard">
            <div className="jobSearchExpandBar">
              <p>&#43;</p>
            </div>

            <div className="jobSearchHead">
              <div className="jobSearchHeadLeft">
                <img
                  src={require("../images/download.jpg")}
                  className="jobIcon"
                  alt="job icon"
                ></img>
                <div className="jobSearchHeadLeftMiddle"></div>
              </div>

              <div className="jobSearchHeadRight">
                <h2>A Grade Electrician</h2>
                <h4 class="jobSearchHeadLeftJob">Prodata Electrical</h4>
                <h4 class="jobSearchHeadLeftLocation">Melbourne,Victoria</h4>
                <h4>$79,000</h4>
                <h4 className="jobSearchWage">Per year</h4>
                <h4 className="jobSearchListed">3d ago</h4>
              </div>
            </div>

            <div className="jobSearchExpandedBody">
              <ul className="jobSearchExpandedKeyPoints">
                <li>Close Team</li>
                <li>Room to grow</li>
                <li>Leaders in the industry</li>
                <li>Flexible working hours</li>
              </ul>
              <p>
                Learnt from blah blah over the time I did these jobs worked with
                this person and was a high achiever in tafe. The major jobs we
                did were and it was mainly filled between with x and y. Learnt
                from blah blah over the time. Learnt from blah blah over the
                time.
              </p>
              <div className="applyNowBtn">
                <button id="applyJobButton">Apply</button>
              </div>
            </div>
          </div> */}
       
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
