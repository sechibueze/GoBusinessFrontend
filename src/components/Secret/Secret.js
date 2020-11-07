import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../_actions/AlertActions';
import { toggleAdminAuth } from '../../_actions/UserActions';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Alert from '../Alert/Alert';
import { TOGGLE_ADMIN_AUTH } from '../../_actions/types';

const Secret = ({ setAlert, loading, toggleAdminAuth, secret }) => {
  
  const [data, setData] = useState({
    email: '',
  });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData(prev => ({...prev, [name]: value.trim()}))
  };
  const handleSubmit = e => {
    e.preventDefault();
    
    return toggleAdminAuth(data.email);
  };

  const {email } = data;

  return ( 
    <Fragment>
      <Navbar />

      <div className="container">
        <form className="form" onSubmit={handleSubmit} id="signup-form">
          <div className="card-wrapper">
            Toggle Admin
          </div>
          
          <Alert origin={TOGGLE_ADMIN_AUTH} />
         
          <div className="form-group">
            <label htmlFor="email"> Email<sup>*</sup></label>
            <input type="email" name="email" value={email} onChange={handleChange} id="email" className="form-control" required placeholder="Email" />
          </div>
         
         
         
          <button type="submit" className="btn btn-primary"> { loading ? "UPDATING..." : "Update"} </button>
        </form>
      </div>
      <Footer />
    </Fragment>
   );
}
 
Secret.propTypes = {
  setAlert: PropTypes.func.isRequired,
  toggleAdminAuth: PropTypes.func.isRequired,
}
const mapStatetoProps = state => ({
  secret: state.user.secret,
  loading: state.auth.loading,
})
export default connect( mapStatetoProps, { setAlert, toggleAdminAuth})(Secret);