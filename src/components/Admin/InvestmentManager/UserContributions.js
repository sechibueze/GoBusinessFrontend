import React, { Fragment, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getCurrentUserContributions } from '../../../_actions/InvestmentActions';
import AuthContainer from '../AuthContainer';

import {  GET_MY_CONTRIBUTIONS } from '../../../_actions/types';

import Alert from '../../Alert/Alert';
import Loader from '../../_utils/Loader';

const UserContributions = ({loading, currentUser, currentUserContributions, getCurrentUserContributions }) => {
  
  const filter = currentUser.auth.includes('admin') ? {} : { owner: currentUser.id };
  const loadTheContributionsOfThisLoggedInUser = () => getCurrentUserContributions(filter);
  useEffect(loadTheContributionsOfThisLoggedInUser, []);
  
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
                <th> No. units Invested </th>
                <th> Total Value </th>
                <th> Total Returns </th>
                
                <th> Total Budget</th>
                <th>Unit Cost</th>
                <th>Interest</th>
                <th>End Date </th>
               
                
              </tr>
              {
                currentUserContributions.map((contribution, idx) => {
                  let invUnit = 0;
                  const { title, budget, unitCost, owner, interest, investors, end_date} = contribution;
                  let investData = investors.filter(inv => inv.investor._id === owner);
                
                  investData.map(d => {
                    return invUnit += d.units;
                  });
                  let totalInvestmentValue = invUnit * unitCost;
                  let expectedPaybackValue = totalInvestmentValue * (1 + interest / 100)
                  return (
                    <tr>
                      <td> { ++idx  } </td>
                      <td> { title && title } </td>
                      <td> { invUnit && invUnit} </td>
                      <td> { totalInvestmentValue && totalInvestmentValue } </td>
                      <td> { expectedPaybackValue && expectedPaybackValue.toFixed(2) } </td>
                      <td> { budget && budget } </td>
                      <td> { unitCost && unitCost } </td>
                      <td> { interest && interest } </td>
                      {/* <td> { start_date && start_date } </td> */}
                      <td> { end_date && end_date } </td>
                      
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