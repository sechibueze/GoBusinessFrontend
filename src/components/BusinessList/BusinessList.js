import React from 'react';
import BusinessCard from "../BusinessCard/BusinessCard";
const BusinessList = ({ businessList, title }) => {
  return ( 
    <section className="section">
      <span className="section-title"> { title && title } </span>
      <div className="container">
        <div className="card-wrapper">
          {
            businessList.length > 0 && businessList.map((business, idx) => <BusinessCard key={idx} business={business} />)
          }
        </div>
      </div>
    </section>
   );
}
 
export default BusinessList;