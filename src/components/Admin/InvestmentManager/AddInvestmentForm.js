import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { createInvestment } from '../../../_actions/InvestmentActions';
import Alert from '../../Alert/Alert';
import { CREATE_INVESTMENT } from '../../../_actions/types';

const AddInvestmentForm = ({ createInvestment, dismiss, newInvestment}) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    budget: "",
    start_date: "",
    end_date: "",
    unitCost: "",
    interest: ""
  });
  const handleChange =({  target }) => {
    const {name, value} = target;
    return setData(prev => ({...prev, [name]: value}))
  }
  const handleSubmit =(e) => {
    e.preventDefault();
    return createInvestment(data);
  }
  useEffect(() => {if (newInvestment !== null) dismiss()}, [newInvestment])

  const { title, description, budget, start_date, end_date, unitCost, interest} = data;
  return ( 
    <form className="form" onSubmit={handleSubmit}>
      <Alert origin={CREATE_INVESTMENT} />
      <div className="form-group">
        <label htmlFor="title"> Title </label>
        <input name="title" value={title} onChange={handleChange} type="text" className="form-control" required  placeholder="Title" id="title" />
      </div>
      <div className="form-group">
        <label htmlFor="budget"> Budget </label>
        <input name="budget" value={budget} onChange={handleChange} type="text" className="form-control" required  placeholder="Budget" id="budget" />
      </div>
      <div className="form-group">
        <label htmlFor="start_date"> Start Date </label>
        <input name="start_date" value={start_date} onChange={handleChange}  type="date" className="form-control" required  placeholder="Start Date" id="start_date" />
      </div>
      <div className="form-group">
        <label htmlFor="end_date"> End Date </label>
        <input name="end_date" value={end_date} onChange={handleChange}  type="date" className="form-control" required  placeholder="Start Date" id="end_date" />
      </div>
      
      <div className="form-group">
        <label htmlFor="interest"> Interest </label>
        <input name="interest" value={interest} onChange={handleChange} type="number" className="form-control"  required placeholder="Interest" id="interest" />
      </div>
      <div className="form-group">
        <label htmlFor="unitCost"> Unit Cost </label>
        <input name="unitCost" value={unitCost}  onChange={handleChange}  type="number" className="form-control"  required placeholder="Unit Cost" id="unitCost" />
      </div>
      
      <div className="form-group">
        <label htmlFor="description"> Description </label>
        <textarea cols="10" rows="6" name="description" value={description}  onChange={handleChange} required className="form-control" placeholder="Description" id="description" />
      </div>
      <button className="btn btn-primary fa fa-plus" type="submit">Add Investment</button>
    </form>
   );
}

AddInvestmentForm.propTypes = {
  createInvestment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  newInvestment: state.investment.newInvestment
})
export default connect(mapStateToProps, { createInvestment })(AddInvestmentForm);