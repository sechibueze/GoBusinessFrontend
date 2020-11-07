import React, { Fragment, useEffect, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getBusinessListByFilter, resetBusinessData } from '../../../_actions/BusinessActions';
import AuthContainer from '../AuthContainer';
import Modal from '../Modal';
import AddBusinessForm from './AddBusinessForm';
import EditBusinessForm from './EditBusinessForm';
import { UPDATE_BUSINESS } from '../../../_actions/types';
import Alert from '../../Alert/Alert';

const BusinessManager = ({loading, currentUser, getBusinessListByFilter, resetBusinessData, businessItems, newBusiness, updatedBusiness, deletedBusiness }) => {
  const [newBusinessModal, setNewBusinessModal] = useState(false);
  const [editBusinessModal, setEditBusinessModal] = useState(false);
  const [editBusinessData, setEditBusinessData] = useState({ business: ''});
  const filter = currentUser.auth.includes('admin') ? {} : { ownerId: currentUser.id };
  useEffect(() => getBusinessListByFilter(filter), [newBusiness, updatedBusiness, deletedBusiness]);
  
  const deleteBusiness = businessId => {
    if (window.confirm("I just do nothing for NOW ? " + businessId)) {
      
    }
  };

  const openEditModal = businessItem => {
    setEditBusinessModal(true);
    setEditBusinessData(prev => ({...prev, business: businessItem}));
  };
  const dismissNewBusinessModal = () => {
    setNewBusinessModal(false);
    setEditBusinessModal(false);
    // clear clobal state
    resetBusinessData()
  };

  const {business} = editBusinessData;
  return ( 
    <Fragment>
      <AuthContainer>
        {
          newBusinessModal && 
          <Modal isOpen={newBusinessModal} title="Add new Business" 
            dismiss={() => dismissNewBusinessModal()} 
            component={<AddBusinessForm dismiss={() => dismissNewBusinessModal()}/>} />
        }
        {
          editBusinessModal && 
          <Modal isOpen={editBusinessModal} title="Edit Business" 
            dismiss={() => dismissNewBusinessModal()} 
            component={<EditBusinessForm businessData={business} dismiss={() => dismissNewBusinessModal()}/>} />
        }
        {
          !loading && businessItems.length < 1 && <h1 className="section-title"> No Business yet</h1> 
        }
        <div className="context-box">
          <span onClick={() =>  setNewBusinessModal(true)} className="context-action fa fa-plus"> Add Business</span>
        </div>
         <Alert origin={UPDATE_BUSINESS} />
        {
          businessItems.length > 0 ? (
            <table className="table p-1">
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>CAC number</th>
                <th>Edit</th>
                <th>Delete</th>
                
              </tr>
              {
                businessItems.map((business, idx) => {
                  const {_id, name, cac_number, email, phone} = business;
                  return (
                    <tr>
                      <td> { ++idx } </td>
                      <td> { name && name } </td>
                      <td> { phone && phone} </td>
                      <td> { email && email } </td>
                      <td> { cac_number && cac_number } </td>
                      <td> <span onClick={() => openEditModal(business)} className="fa fa-pen" /> </td>
                      <td> <span onClick={() => deleteBusiness(_id)} className="fa fa-times" /> </td>
                    </tr>
                  )
                })
              }
            </table>
          ) : (<div className="container"> No Business yet </div>)
        }
      </AuthContainer>
    </Fragment>
  );
}
 BusinessManager.propTypes = {
   getBusinessListByFilter: PropTypes.func.isRequired,
   resetBusinessData: PropTypes.func.isRequired,
   businessItems: PropTypes.array.isRequired
 }

 const mapStateToProps = state => ({
   businessItems: state.business.businessItems,
   newBusiness: state.business.newBusiness,
   updatedBusiness: state.business.updatedBusiness,
   deletedBusiness: state.business.deletedBusiness,
   loading: state.auth.loading,
   currentUser: state.auth.currentUser,
 })
export default connect(mapStateToProps, { getBusinessListByFilter, resetBusinessData })(BusinessManager);