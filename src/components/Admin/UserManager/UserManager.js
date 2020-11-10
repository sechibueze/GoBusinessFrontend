import React, { Fragment, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getAllusers, deleteUserById, toggleAdminAuth } from '../../../_actions/UserActions';
import AuthContainer from '../AuthContainer';

import { DELETE_USER, TOGGLE_ADMIN_AUTH } from '../../../_actions/types';
import Alert from '../../Alert/Alert';

const UserManager = ({loading, currentUser, getAllusers, toggleAdminAuth ,deleteUserById, secret, users, deletedUser }) => {
 
  const filter = currentUser.auth.includes('admin') ? {} : { ownerId: currentUser.id };
  const getAllusersWithFilter = () => getAllusers(filter);
  useEffect(getAllusersWithFilter, [deletedUser, secret]);
  
  const onDeleteUser = id => {
    if (window.confirm("Are you sure ? ")) {
      return deleteUserById(id);
    }
  }
  return ( 
    <Fragment>
      <AuthContainer>
        
        
         <Alert origin={DELETE_USER} />
         <Alert origin={TOGGLE_ADMIN_AUTH} />
        {
          users.length > 0 ? (
            <table className="table p-1">
              <tr>
                <th>S/N</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Phone</th>
                <th> Auth </th>
                <th>Delete</th>
                
              </tr>
              {
                users.map((user, idx) => {
                  const {_id, firstname, lastname, email, phone} = user;
                  return (
                    <tr>
                      <td> { ++idx } </td>
                      <td> { firstname && firstname } </td>
                      <td> { lastname && lastname } </td>
                      <td> { email && email } </td>
                      <td> { phone && phone} </td>
                      <td> <span onClick={() => toggleAdminAuth(email)} className="fa fa-key" /> </td>
                      <td> <span onClick={() => onDeleteUser(_id)} className="fa fa-times" /> </td>
                    </tr>
                  )
                })
              }
            </table>
          ) : (<div className="container"> No User yet </div>)
        }
      </AuthContainer>
    </Fragment>
  );
}
 UserManager.propTypes = {
   getAllusers: PropTypes.func.isRequired,
   toggleAdminAuth: PropTypes.func.isRequired,
   deleteUserById: PropTypes.func.isRequired,
   users: PropTypes.array.isRequired,
   deletedUser: PropTypes.array.isRequired,
 }

 const mapStateToProps = state => ({
   
   users: state.user.users,
   deletedUser: state.user.deletedUser,
   secret: state.user.secret,
   loading: state.auth.loading,
   currentUser: state.auth.currentUser,
 })
export default connect(mapStateToProps, { getAllusers, toggleAdminAuth, deleteUserById})(UserManager);