import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { editBusiness } from '../../../_actions/BusinessActions';
import Alert from '../../Alert/Alert';
import { UPDATE_BUSINESS } from '../../../_actions/types';

const EditBusinessForm = ({businessData, editBusiness, dismiss, updatedBusiness}) => {

  const [data, setData] = useState({
    _id: businessData._id,
    name: businessData.name ? businessData.name : "",
    description: businessData.description ? businessData.description : "",
    address: businessData.address ? businessData.address : "",
    email: businessData.email ? businessData.email : "",
    phone: businessData.phone ? businessData.phone : "",
    cac_number: businessData.cac_number ? businessData.cac_number : ""
  });
  const handleChange =({  target }) => {
    const {name, value} = target;
    return setData(prev => ({...prev, [name]: value.trim()}))
  }
  const handleSubmit =(e) => {
    e.preventDefault();
    return editBusiness(data);
  }
  useEffect(() => {if (updatedBusiness !== null) dismiss()}, [updatedBusiness])

  const { name, description, email, address, phone, cac_number} = data;
  return ( 
    <form className="form" onSubmit={handleSubmit}>
      <Alert origin={UPDATE_BUSINESS} />
      <div className="form-group">
        <label htmlFor="name"> Name </label>
        <input name="name" value={name} onChange={handleChange} type="text" className="form-control"   placeholder="Name" id="name" />
      </div>
      <div className="form-group">
        <label htmlFor="phone"> Phone </label>
        <input name="phone" value={phone} onChange={handleChange}  type="text" className="form-control"   placeholder="Phone" id="phone" />
      </div>
      <div className="form-group">
        <label htmlFor="email"> Email </label>
        <input name="email" value={email} onChange={handleChange} type="email" className="form-control"   placeholder="Email" id="email" />
      </div>
      <div className="form-group">
        <label htmlFor="address"> Address </label>
        <input name="address" value={address} onChange={handleChange} type="text" className="form-control"   placeholder="Address" id="address" />
      </div>
      <div className="form-group">
        <label htmlFor="cac_number"> CAC number </label>
        <input name="cac_number" value={cac_number}  onChange={handleChange}  type="text" className="form-control"   placeholder="CAC number" id="cac_number" />
      </div>
      
      <div className="form-group">
        <label htmlFor="description"> Description </label>
        <textarea cols="10" rows="6" name="description" value={description}  onChange={handleChange}  className="form-control" placeholder="Description" id="description" />
      </div>
      <button className="btn btn-primary fa fa-save" type="submit">Update Business</button>
    </form>
   );
}

EditBusinessForm.propTypes = {
  createBusiness: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  updatedBusiness: state.business.updatedBusiness
})
export default connect(mapStateToProps, { editBusiness })(EditBusinessForm);