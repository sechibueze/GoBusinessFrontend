import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { editInvestment } from '../../../_actions/InvestmentActions';
import Alert from '../../Alert/Alert';
import { UPDATE_INVESTMENT } from '../../../_actions/types';

const EditInvestmentform = ({investmentData, editInvestment, dismiss, updatedInvestment}) => {

  const [data, setData] = useState({
    _id: investmentData._id,
    title: investmentData.title ? investmentData.title : "",
    description: investmentData.description ? investmentData.description : "",
    budget: investmentData.budget ? investmentData.budget : "",
    unitCost: investmentData.unitCost ? investmentData.unitCost : "",
    interest: investmentData.interest ? investmentData.interest : "",
    start_date: investmentData.start_date ? investmentData.start_date : "",
    end_date: investmentData.end_date ? investmentData.end_date : ""
  });
  const handleChange =({  target }) => {
    const {name, value} = target;
    return setData(prev => ({...prev, [name]: value}))
  }
  const handleSubmit =(e) => {
    e.preventDefault();
    return editInvestment(data);
  }
  useEffect(() => {if (updatedInvestment !== null) dismiss()}, [updatedInvestment])

  const { title, description, budget, unitCost, interest, start_date, end_date } = data;
  return ( 
     <form className="form" onSubmit={handleSubmit}>
      <Alert origin={UPDATE_INVESTMENT} />
      <div className="form-group">
        <label htmlFor="title"> Title </label>
        <input name="title" value={title} onChange={handleChange} type="text" className="form-control"   placeholder="Title" id="title" />
      </div>
      <div className="form-group">
        <label htmlFor="budget"> Budget </label>
        <input name="budget" value={budget} onChange={handleChange} type="text" className="form-control"   placeholder="Budget" id="budget" />
      </div>
      <div className="form-group">
        <label htmlFor="start_date"> Start Date </label>
        <input name="start_date" value={start_date} onChange={handleChange}  type="date" className="form-control"   placeholder="Start Date" id="start_date" />
      </div>
      <div className="form-group">
        <label htmlFor="end_date"> End Date </label>
        <input name="end_date" value={end_date} onChange={handleChange}  type="date" className="form-control"   placeholder="Start Date" id="end_date" />
      </div>
      
      <div className="form-group">
        <label htmlFor="interest"> Interest </label>
        <input name="interest" value={interest} onChange={handleChange} type="number" className="form-control"   placeholder="Interest" id="interest" />
      </div>
      <div className="form-group">
        <label htmlFor="unitCost"> Unit Cost </label>
        <input name="unitCost" value={unitCost}  onChange={handleChange}  type="number" className="form-control"   placeholder="Unit Cost" id="unitCost" />
      </div>
      
      <div className="form-group">
        <label htmlFor="description"> Description </label>
        <textarea cols="10" rows="6" name="description" value={description}  onChange={handleChange}  className="form-control" placeholder="Description" id="description" />
      </div>
      <button className="btn btn-primary fa fa-save" type="submit">Update Investment</button>
    </form>
   );
}

EditInvestmentform.propTypes = {
  editInvestment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  updatedInvestment: state.investment.updatedInvestment
})
export default connect(mapStateToProps, { editInvestment })(EditInvestmentform);