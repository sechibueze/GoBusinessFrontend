import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { getInvestmentList } from '../../_actions/InvestmentActions';
import Loader from '../_utils/Loader';
import InvestForm from '../InvestForm/InvestForm';
import { setAlert } from '../../_actions/AlertActions';
import { GET_INVESTMENT_ITEM } from '../../_actions/types';

const InvestmentItem = ({ loading, match, getInvestmentList, investmentData}) => {
  const [investFormState, setInvestFormState] = useState(false);
  let filter = { investmentId: match.params.investmentId}
  useEffect(() => getInvestmentList(filter), []);

  const toggleFormVisibility = () => {
    return setInvestFormState(!investFormState);
  }
  if (loading) return <Loader />

  if (!investmentData) return setAlert("No investments", GET_INVESTMENT_ITEM);

  const {_id, title,  description, } = investmentData;
  
   return ( 
    <div className="card container">
      <img src="https://picsum.photos/200" className="card-image" alt="Business Identity" />
      <h3 className="card-title">{ title && title } </h3>
      <ul>
        {/* <li> CAC ID: { cac_number && cac_number } </li>
        <li> Email: { email && email } </li>
        <li> Phone: { phone && phone } </li>
        <li> Address: { address && address } </li> */}
      </ul>
      <article className="card-caption">
        { description && description}
      </article>
      <h3> Operator Data</h3>
      <ul>
        {/* <li> Firstname: { owner && owner.firstname } </li>
        <li> Lastname: { owner && owner.lastname } </li>
        <li> Phone: { owner && owner.phone } </li>
        <li> Email: { owner && owner.email } </li> */}
      </ul>
      <div className="card-footer0">
        <span onClick={() => toggleFormVisibility()} className=""> Invest </span>
         {
           investFormState && <InvestForm investmentData={investmentData} />
         }
      </div>
    </div>
   );
}

InvestmentItem.propTypes = {
   getInvestmentList: PropTypes.func.isRequired,
   investmentData: PropTypes.array.isRequired
 }

 const mapStateToProps = state => ({
   investmentData: state.investment.investmentData,
   loading: state.auth.loading,
   currentUser: state.auth.currentUser,
 })
export default connect(mapStateToProps, { getInvestmentList })(InvestmentItem);
