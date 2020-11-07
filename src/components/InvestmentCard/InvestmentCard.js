import React from 'react';
import { Link } from "react-router-dom";
const InvestmentCard = ({ investment}) => {
  const {_id, title, budget, unitCost, investors, interest, end_date,  description } = investment;
  return ( 
    <div className="card">
      <img src="https://picsum.photos/200" className="card-image" alt="Business Identity" />
      <h5 className="card-title">{ title && title } </h5>
      <article className="card-caption">
        { description && description}
      </article>
      <div className="context-box" >
        <span className="tip" >{ investors && investors.length} already invested </span>
        <span className="tip">{ budget && budget} Budgeted </span>
        <span className="tip">{ unitCost && unitCost} per unit </span>
        <span className="tip">{ interest && interest}% returns </span>
      </div>

      <div className="card-footer">
          <Link to={`/investments/${ _id }`} className="btn btn-reverse"> see details </Link>
      </div>
    </div>
   );
}
 
export default InvestmentCard;