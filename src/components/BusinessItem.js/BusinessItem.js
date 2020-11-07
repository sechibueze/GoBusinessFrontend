import React, { useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link, Redirect } from "react-router-dom";
import { getBusinessById } from '../../_actions/BusinessActions';
import { getInvestmentList } from '../../_actions/InvestmentActions';
import Loader from '../_utils/Loader';
import InvestmentList from '../InvestmentList/InvestmentList';

const BusinessItem = ({ loading, match, getBusinessById, getInvestmentList, businessData, investmentItems}) => {
  
  let filter = { businessId: match.params.businessId};

  useEffect(() => getBusinessById(filter), []);
  useEffect(() => getInvestmentList({businessOwner: match.params.businessId}), []);
  if (loading) {
    return <Loader />
  }
  const {_id, name, owner,  description, email, phone, cac_number,  address} = businessData;
  
   return ( 
    <div className="card container">
      <img src="https://picsum.photos/200" className="card-image" alt="Business Identity" />
      <h3 className="card-title">{ name && name } </h3>
      <ul>
        <li> CAC ID: { cac_number && cac_number } </li>
        <li> Email: { email && email } </li>
        <li> Phone: { phone && phone } </li>
        <li> Address: { address && address } </li>
      </ul>
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
      <div className="card-footer0">
          {/* <Link to={`/investments/${ _id }`} className="btn btn-reverse"> Investment Options </Link> */}

          <InvestmentList title="see investments" investmentItems={investmentItems}/>
      </div>
    </div>
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
