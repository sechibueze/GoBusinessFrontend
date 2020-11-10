import React, { Fragment, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getInvestmentList } from '../../_actions/InvestmentActions';
import InvestmentCard from '../InvestmentCard/InvestmentCard';
import Navbar from '../Navbar/Navbar';
const Showcase = ({ title,  investmentItems, getInvestmentList}) => {
  const loadInvestments = () => getInvestmentList();
  useEffect(loadInvestments, []);
   return ( 
    <Fragment>
      <Navbar />
      <section className="section">
        <span className="section-title"> Leading Investments </span>
        <div className="container">
          <div className="card-wrapper">
            {
              investmentItems.length > 0 && investmentItems.map((investment, idx) => <InvestmentCard key={idx} investment={investment} />)
            }
          </div>
        </div>
      </section>
    </Fragment>
   );
}

Showcase.propTypes = {
   getInvestmentList: PropTypes.func.isRequired,
   investmentItems: PropTypes.array.isRequired
 }

 const mapStateToProps = state => ({
   investmentItems: state.investment.investmentItems,
   loading: state.auth.loading,
   currentUser: state.auth.currentUser,
 })
export default connect(mapStateToProps, { getInvestmentList })(Showcase);
