import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthContainer from '../AuthContainer';
import BusinessList from '../../BusinessList/BusinessList';

import { getBusinessListByFilter } from '../../../_actions/BusinessActions';


const Dashboard = ({loading, businessItems, getBusinessListByFilter }) => {
  useEffect(() => {
    getBusinessListByFilter();
  }, []);
  return ( 
    <AuthContainer>
      {
        loading && <h2> Loading ...</h2>
      }
      <BusinessList title="Browse Businesses" businessList={businessItems} />
    </AuthContainer>
   );
}
Dashboard.propTypes = {
  getBusinessListByFilter: PropTypes.func.isRequired,
  businessItems: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  businessItems: state.business.businessItems,
  loading: state.auth.loading
});
export default connect(mapStateToProps, { getBusinessListByFilter  })(Dashboard);