import React, { Fragment, useEffect, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getCurrentUserContributions } from '../../../_actions/InvestmentActions';
import AuthContainer from '../AuthContainer';

import {  GET_MY_CONTRIBUTIONS } from '../../../_actions/types';

import Alert from '../../Alert/Alert';
import Loader from '../../_utils/Loader';

const UserContributions = ({loading, currentUser, currentUserContributions, getCurrentUserContributions }) => {
  
  const filter = currentUser.auth.includes('admin') ? {} : { owner: currentUser.id };
  useEffect(() => getCurrentUserContributions(), []);
  
  if(loading) return <Loader />
  return ( 
    <Fragment>
      <AuthContainer>
        
         <Alert origin={GET_MY_CONTRIBUTIONS} />
       
        {
          currentUserContributions.length > 0 ? (
            <table className="table p-1">
              <tr>
                <th>S/N</th>
                <th>Title</th>
                <th>Description</th>
                <th>Budget</th>
                <th>Unit Cost</th>
                <th>Interest</th>
                <th>Start Date </th>
                <th>End Date </th>
                <th>Edit</th>
                <th>Delete</th>
                
              </tr>
              {
                currentUserContributions.map((contribution, idx) => {
                  const {_id, } = contribution;
                  return (
                    <tr>
                      <td> { _id } </td>
                      {/* <td> { title && title } </td>
                      <td> { description && description} </td>
                      <td> { budget && budget } </td>
                      <td> { unitCost && unitCost } </td>
                      <td> { interest && interest } </td>
                      <td> { start_date && start_date } </td>
                      <td> { end_date && end_date } </td> */}
                      
                    </tr>
                  )
                })
              }
            </table>
          ) : (<div className="container"> No contribution yet </div>)
        }
      </AuthContainer>
    </Fragment>
  );
}
 UserContributions.propTypes = {
   getCurrentUserContributions: PropTypes.func.isRequired,

   currentUserContributions: PropTypes.array.isRequired
 }

 const mapStateToProps = state => ({
   
   currentUserContributions: state.investment.currentUserContributions,
   loading: state.auth.loading,
   currentUser: state.auth.currentUser,
 })
export default connect(mapStateToProps, { getCurrentUserContributions })(UserContributions);