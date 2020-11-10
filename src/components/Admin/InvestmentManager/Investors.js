import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getInvestorsOfInvestment } from '../../../_actions/InvestmentActions';
const Investors = ({ investors }) => {
  return ( 
    <Fragment>
      {
        investors.length > 0 && investors.map(investor => {
          return <h5> INV </h5>
        })
      }
    </Fragment>
   );
}
 
Investors.propTypes = {
   getInvestorsOfInvestment: PropTypes.func.isRequired,
   investors: PropTypes.array.isRequired
 }

 const mapStateToProps = state => ({
   investors: state.investment.investors,
   loading: state.auth.loading,
   currentUser: state.auth.currentUser,
 })
export default connect(mapStateToProps, { getInvestorsOfInvestment })(Investors);