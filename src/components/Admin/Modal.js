import React from 'react';
import { APP_NAME } from '../../_actions/types';

const Modal = ({
  dismiss,
  component,
  isOpen,
  title
}) => {
  return (
    <div className={`modal ${isOpen? 'show' : ''}`}>
        <div className="modal-container">
          <span className="modal-close fa fa-times" onClick={() => dismiss()}></span>
          <div className="modal-header">
            <h1> { title ? title : APP_NAME} </h1>
          </div>
          <div className="modal-body">
           
            { component }
           
          </div>
          
        </div>
      </div>
  );
}
 
export default Modal;