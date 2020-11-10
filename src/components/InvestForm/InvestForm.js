import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../_actions/AlertActions';
import { makeInvestmentContribution } from '../../_actions/InvestmentActions';

import Alert from '../Alert/Alert';
import { APP_NAME, MAKE_INVESTMENT_CONTRIBUTION, } from '../../_actions/types';

const InvestForm = ({ setAlert, investmentData, makeInvestmentContribution, }) => {
  console.log("inv data", investmentData)
  const [data, setData] = useState({
    investmentId: investmentData._id,
    units: '', 
  });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData(prev => ({...prev, [name]: value.trim()}))
  };
  const handleSubmit = e => {
    e.preventDefault();
    
    return makeInvestmentContribution(data);
  };

  const { units } = data;
  const { unitCost } = investmentData;
  return ( 
    <Fragment>
    

      <div className="container">
        <form className="form" onSubmit={handleSubmit} id="signup-form">
           <h3> Invest in { APP_NAME }  </h3>       
          <Alert origin={MAKE_INVESTMENT_CONTRIBUTION} />
          
          
          <div className="form-group">
            <label htmlFor="amount"> Amount: <sup>*</sup></label>
            <input type="" disabled min="1" name="amount" value={units * unitCost}  id="amount" className="form-control"  />
          </div>
          <div className="form-group">
            <label htmlFor="units"> Units<sup>*</sup></label>
            <input type="number" min="1" name="units" value={units} onChange={handleChange} id="units" className="form-control" required placeholder="Units" />
          </div>
        
         
          <button type="submit" className="btn btn-primary"> Place Order </button>

          
        </form>
        
      </div>

    </Fragment>
   );
}
 
InvestForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  makeInvestmentContribution: PropTypes.func.isRequired,
}
const mapStatetoProps = state => ({
  newContribution: state.investment.newContribution,
  isAuthenticated: state.auth.isAuthenticated,
})
export default connect( mapStatetoProps, { setAlert, makeInvestmentContribution})(InvestForm);