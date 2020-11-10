import React, { Fragment, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getBusinessById } from '../../_actions/BusinessActions';
import { getInvestmentList } from '../../_actions/InvestmentActions';
import Loader from '../_utils/Loader';
import InvestmentList from '../InvestmentList/InvestmentList';
import Navbar from '../Navbar/Navbar';

const BusinessItem = ({ loading, match, getBusinessById, getInvestmentList, businessData, investmentItems}) => {
  
  let filter = { businessId: match.params.businessId};
  const loadBusinessById = () => getBusinessById(filter);
  const loadInvestmentList = () => getInvestmentList({businessOwner: match.params.businessId});
  useEffect(loadBusinessById, []);
  useEffect(loadInvestmentList, []);
  if (loading) {
    return <Loader />
  }
  const { name, owner,  description, email, phone, cac_number,  address} = businessData;
  
   return ( 
    <Fragment>
      <Navbar />
      <div className="card container">
        <img src="https://picsum.photos/200" className="card-image" alt="Business Identity" />
        <h3 className="card-title">{ name && name } </h3>
        <ul className="business-info">
          <li>  CAC ID: { cac_number && cac_number } </li>
          <li> Email: { email && email } </li>
          <li> Phone: { phone && phone } </li>
          <li> Address: { address && address } </li>
        </ul>
        <h3> About { name && name} </h3>
        <article className="card-caption">
          { description && description}
        </article>
        <h3> Operator Data</h3>
        <ul>
          <li> Firstname: { owner && owner.firstname } </li>
          <li> Lastname: { owner && owner.lastname } </li>
          <li> Phone: { owner && owner.phone } </li>
          <li> Email: { owner && owner.email } </li>
        </ul>

        <div className="projects">
            <InvestmentList title="Fund Projects" investmentItems={investmentItems}/>
        </div>
      </div>
    </Fragment>
   );
}

BusinessItem.propTypes = {
   getBusinessById: PropTypes.func.isRequired,
   getInvestmentList: PropTypes.func.isRequired,
   businessData: PropTypes.array.isRequired
 }

 const mapStateToProps = state => ({
   businessData: state.business.businessData,
   investmentItems: state.investment.investmentItems,
   loading: state.auth.loading,
   currentUser: state.auth.currentUser,
 })
export default connect(mapStateToProps, { getBusinessById, getInvestmentList })(BusinessItem);
