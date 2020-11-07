import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { createBusiness } from '../../../_actions/BusinessActions';
import Alert from '../../Alert/Alert';
import { CREATE_BUSINESS } from '../../../_actions/types';

const AddBusinessForm = ({ createBusiness, dismiss, newBusiness}) => {
  const [data, setData] = useState({
    name: "",
    description: "",
    address: "",
    email: "",
    phone: "",
    cac_number: ""
  });
  const handleChange =({  target }) => {
    const {name, value} = target;
    return setData(prev => ({...prev, [name]: value.trim()}))
  }
  const handleSubmit =(e) => {
    e.preventDefault();
     console.log('new Busiense', data);
    return createBusiness(data);
  }
  useEffect(() => {if (newBusiness !== null) dismiss()}, [newBusiness])

  const { name, description, email, address, phone, cac_number} = data;
  return ( 
    <form className="form" onSubmit={handleSubmit}>
      <Alert origin={CREATE_BUSINESS} />
      <div className="form-group">
        <label htmlFor="name"> Name </label>
        <input name="name" value={name} onChange={handleChange} type="text" className="form-control" required  placeholder="Name" id="name" />
      </div>
      <div className="form-group">
        <label htmlFor="phone"> Phone </label>
        <input name="phone" value={phone} onChange={handleChange}  type="text" className="form-control" required  placeholder="Phone" id="phone" />
      </div>
      <div className="form-group">
        <label htmlFor="email"> Email </label>
        <input name="email" value={email} onChange={handleChange} type="email" className="form-control" required  placeholder="Email" id="email" />
      </div>
      <div className="form-group">
        <label htmlFor="address"> Address </label>
        <input name="address" value={address} onChange={handleChange} type="text" className="form-control"  required placeholder="Address" id="address" />
      </div>
      <div className="form-group">
        <label htmlFor="cac_number"> CAC number </label>
        <input name="cac_number" value={cac_number}  onChange={handleChange}  type="text" className="form-control"  required placeholder="CAC number" id="cac_number" />
      </div>
      
      <div className="form-group">
        <label htmlFor="description"> Description </label>
        <textarea cols="10" rows="6" name="description" value={description}  onChange={handleChange} required className="form-control" placeholder="Description" id="description" />
      </div>
      <button className="btn btn-primary fa fa-plus" type="submit">Add Business</button>
    </form>
   );
}

AddBusinessForm.propTypes = {
  createBusiness: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  newBusiness: state.business.newBusiness
})
export default connect(mapStateToProps, { createBusiness })(AddBusinessForm);