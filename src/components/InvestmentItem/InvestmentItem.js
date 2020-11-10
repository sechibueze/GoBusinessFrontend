import React, { Fragment, useEffect, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getInvestmentList, getInvestorsOfInvestment } from '../../_actions/InvestmentActions';
import Loader from '../_utils/Loader';
import InvestForm from '../InvestForm/InvestForm';
import { setAlert } from '../../_actions/AlertActions';
import { GET_INVESTMENT_ITEM } from '../../_actions/types';
import Investors from '../Admin/InvestmentManager/Investors';
import Navbar from '../Navbar/Navbar';

const InvestmentItem = ({ loading, match, getInvestmentList, getInvestorsOfInvestment, investors, investmentData}) => {
  const [investFormState, setInvestFormState] = useState(false);
  let filter = { investmentId: match.params.investmentId}
  const loadInvestmentList = () => getInvestmentList(filter);
  const loadInvestorsOfInvestment = () => getInvestorsOfInvestment(filter.investmentId)
  useEffect(loadInvestmentList, []);
  useEffect(loadInvestorsOfInvestment, []);

  const toggleFormVisibility = () => {
    return setInvestFormState(!investFormState);
  }
  if (loading) return <Loader />

  if (!investmentData) return setAlert("No investments", GET_INVESTMENT_ITEM);

  const { title,  description, } = investmentData;
  
   return ( 
    <Fragment>
      <Navbar />
      <div className="card container">
        <img src="https://picsum.photos/200" className="card-image" alt="Business Identity" />
        <h3 className="card-title">{ title && title } </h3>
        
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
          <span onClick={() => toggleFormVisibility()} className="btn btn-reverse"> Invest </span>
          {
            investFormState && <InvestForm investmentData={investmentData} />
          }
        </div>
        <div className="card-footer0">
          {investors.length > 0 && <span className=""> Investors {investors.length } </span> }
          {
            investors.length > 0 && <Investors investors={ investors } />
          }
        </div>
      </div>
    </Fragment>
   );
}

InvestmentItem.propTypes = {
   getInvestmentList: PropTypes.func.isRequired,
   getInvestorsOfInvestment: PropTypes.func.isRequired,
   investmentData: PropTypes.array.isRequired
 }

 const mapStateToProps = state => ({
   investmentData: state.investment.investmentData,
   investors: state.investment.investors,
   loading: state.auth.loading,
   currentUser: state.auth.currentUser,
 })
export default connect(mapStateToProps, { getInvestmentList, getInvestorsOfInvestment })(InvestmentItem);
