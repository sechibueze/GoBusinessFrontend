import React, { Fragment, useEffect, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getInvestmentList, resetInvestmentData } from '../../../_actions/InvestmentActions';
import AuthContainer from '../AuthContainer';
import Modal from '../Modal';
import AddInvestmentForm from './AddInvestmentForm';
import { CREATE_INVESTMENT, UPDATE_INVESTMENT } from '../../../_actions/types';
import EditInvestmentForm from './EditInvestmentForm';
import Alert from '../../Alert/Alert';

const InvestmentManager = ({loading, currentUser, getInvestmentList, resetInvestmentData, investmentItems, newInvestment, updatedInvestment, deletedInvestment }) => {
  const [newInvestmentModal, setNewInvestmentModal] = useState(false);
  const [editInvestmentModal, setEditInvestmentModal] = useState(false);
  const [editInvestmentData, setEditInvestmentData] = useState({ investment: ''});
  const filter = currentUser.auth.includes('admin') ? {} : { owner: currentUser.id };
  useEffect(() => getInvestmentList(filter), [newInvestment, updatedInvestment, deletedInvestment]);
  
  const deleteInvestmentById = investmentId => {
    if (window.confirm("I just do nothing for NOW ? " + investmentId)) {
      
    }
  };

  const openEditModal = investmentItem => {
    setEditInvestmentModal(true);
    setEditInvestmentData(prev => ({...prev, investment: investmentItem}));
  };
  const dismissInvestmentModal = () => {
    setNewInvestmentModal(false);
    setEditInvestmentModal(false);
    // clear clobal state
    resetInvestmentData()
  };

  const {investment} = editInvestmentData;
  return ( 
    <Fragment>
      <AuthContainer>
         {
          newInvestmentModal && 
          <Modal isOpen={newInvestmentModal} title="Add new Investment" 
            dismiss={() => dismissInvestmentModal()} 
            component={<AddInvestmentForm dismiss={() => dismissInvestmentModal()}/>} />
        }
        {
          editInvestmentModal && 
          <Modal isOpen={editInvestmentModal} title="Edit Investment" 
            dismiss={() => dismissInvestmentModal()} 
            component={<EditInvestmentForm investmentData={investment} dismiss={() => dismissInvestmentModal()}/>} />
        } 
        {
          !loading && investmentItems.length < 1 && <h1 className="section-title"> No Investment yet</h1> 
        }
        <div className="context-box">
          <span onClick={() =>  setNewInvestmentModal(true)} className="context-action fa fa-plus"> Add Investment</span>
        </div>
         <Alert origin={UPDATE_INVESTMENT} />
         <Alert origin={CREATE_INVESTMENT} />
        {
          investmentItems.length > 0 ? (
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
                investmentItems.map((investment, idx) => {
                  const {_id, title, description, budget, unitCost, interest, start_date, end_date} = investment;
                  return (
                    <tr>
                      <td> { ++idx } </td>
                      <td> { title && title } </td>
                      <td> { description && description} </td>
                      <td> { budget && budget } </td>
                      <td> { unitCost && unitCost } </td>
                      <td> { interest && interest } </td>
                      <td> { start_date && start_date } </td>
                      <td> { end_date && end_date } </td>
                      <td> <span onClick={() => openEditModal(investment)} className="fa fa-pen" /> </td>
                      <td> <span onClick={() => deleteInvestmentById(_id)} className="fa fa-times" /> </td>
                    </tr>
                  )
                })
              }
            </table>
          ) : (<div className="container"> No Investment yet </div>)
        }
      </AuthContainer>
    </Fragment>
  );
}
 InvestmentManager.propTypes = {
   getInvestmentList: PropTypes.func.isRequired,
   resetInvestmentData: PropTypes.func.isRequired,
   investmentItems: PropTypes.array.isRequired
 }

 const mapStateToProps = state => ({
   investmentItems: state.investment.investmentItems,
   newInvestment: state.investment.newInvestment,
   updatedInvestment: state.investment.updatedInvestment,
   deletedInvestment: state.investment.deletedInvestment,
   loading: state.auth.loading,
   currentUser: state.auth.currentUser,
 })
export default connect(mapStateToProps, { getInvestmentList, resetInvestmentData })(InvestmentManager);