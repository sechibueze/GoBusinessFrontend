import React, { useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import InvestmentCard from '../InvestmentCard/InvestmentCard';

const InvestmentList = ({ title,  investmentItems}) => {
  
   return ( 
    <section className="section">
      <span className="section-title"> { title && title } </span>
      <div className="container">
        <div className="card-wrapper">
          {
            investmentItems.length > 0 && investmentItems.map((investment, idx) => <InvestmentCard key={idx} investment={investment} />)
          }
        </div>
      </div>
    </section>
   );
}

InvestmentList.propTypes = {
   getInvestmentList: PropTypes.func.isRequired,
   investmentItems: PropTypes.array.isRequired
 }

 const mapStateToProps = state => ({
   investmentItems: state.investment.investmentItems,
   loading: state.auth.loading,
   currentUser: state.auth.currentUser,
 })
export default connect(mapStateToProps)(InvestmentList);
