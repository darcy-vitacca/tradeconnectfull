import React, { Component } from "react";
import { connect } from "react-redux";
import PeopleSearchCard from "../components/peoplesearch/people-searchcard-closed-card";
import PeopleSearchCard1 from "../components/peoplesearch/people-searchcard-closed-card1";
import { searchEmployee } from "../redux/actions/userActions";
import "../components/peoplesearch/people-search.css";
import { employeeSearch } from '../components/peoplesearch/employeeSearchFunc'
import { uuid } from 'uuidv4';

//TODO: needs to delete the search every time it makes one out of state
// import './profilecard/profile.css';
class EmployeeSearch extends Component {
  state = {
    errors: [],
    peopleSearchInput: [
      {
        name: "",
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
  componentDidMount() {}

  handleChange = (e) => {
    
    let peopleSearchInputState = [...this.state.peopleSearchInput];
    peopleSearchInputState[e.target.dataset.id][e.target.name] = e.target.value;
  };

  handleSubmit = (e) => {
    e.preventDefault();
console.log(this.state.peopleSearchInput)
    employeeSearch(this.state, this.props)
  };

  render() {
    let recentProfileMarkup = this.props.data.employees ? (
      this.props.data.employees.map((profile) => (
        <PeopleSearchCard key={profile.userId} profile={profile} />
      ))
    ) : (
      <p>Loading...</p>
    );
    const {
      UI: { loading ,errors},
    } = this.props;
    let {classifcations} = this.state;
    return (
      <div className="peopleSearchBody" key={uuid()}>
        <div className="search">
          <div className="peopleSearchBarSection">
            <h1 className="peopleSearchHeader">People Search</h1>
            <div className="peopleSearchBar">
              <form
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                className="peopleSearchBarForm"
              >
                <div className="peopleSearchTop">
                  <div className="peopleSearchTrade">
                    <label>Name</label>
                    <input
                      type="search"
                      data-id="0"
                      name="name"
                      placeholder="Name"
                      className="searchTradeJobs"
                    ></input>
                  </div>

                    <div className="peopleSearchTrade">
          <label>Trade Classification</label>
            <select name="tradeClassification" className="searchPeopleBar" data-id="0">
              <option value="" disabled selected hidden>
                Trade Classification
              </option>
              {classifcations.map(classifcation =>{
            
                return <option key={uuid()} value={classifcation}> {classifcation}</option>
              })}
            </select>
          </div>
{/* 
                  <div className="peopleSearchTrade">
                    <label>Trade</label>
                    <input
                      type="search"
                      name="tradeClassification"
                      data-id="0"
                      placeholder="Trade"
                      className="searchTradeJobs"
                    ></input>
                  </div> */}
                  <div className="peopleSearchTrade">
                    <label>Location</label>
                    <select
                      name="state"
                      data-id="0"
                      className="searchTradeJobs"
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
                {errors !== null ? <div className="errorsMessage">{errors.error}</div> : null}
                <div className="peopleSearchBottom"></div>
                <div className="applyNowBtn">
                  <button className="peopleToggleButton">Search</button>
                </div>
              </form>
            </div>
          </div>
          {recentProfileMarkup}
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
  searchEmployee,
};

export default connect(mapStateToProps, mapActionsToProps)(EmployeeSearch);
