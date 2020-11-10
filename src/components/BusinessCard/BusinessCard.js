import React from 'react';
import { Link } from "react-router-dom";
const BusinessCard = ({ business}) => {
  const {_id, name, description,
    //  email, phone, address
    } = business;
  return ( 
    <div className="card">
      <img src="https://picsum.photos/200" className="card-image" alt="Business Identity" />
      <h3 className="card-title">{ name && name } </h3>
      <article className="card-caption">
        { description && description}
      </article>
      {/* <div className="">
        { email && email }
        { phone && phone }
        { address && address }
        
      </div> */}
      <div className="card-footer">
          <Link to={`/business/${ _id }`} className="btn btn-reverse"> see business </Link>
      </div>
    </div>
   );
}
 
export default BusinessCard;