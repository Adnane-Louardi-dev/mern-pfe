import React from 'react'
import'../Styles/Footer.css'
const Footer = () => {
  return (
    <div>
       <div className='Footer'>
            <div className='headers' style={{display:"flex",justifyContent:"space-between"}}>
                  <div className='onsa'> <img src={require('../imgs/logo_onssa.jpg')} width="100px"/></div>
                  <div id='headV'>Médicaments et intrants <br /> vétérinaires</div>
                  <div className='ministre'>  <img src={require('../imgs/minister.png')}width="100px" /> </div>
            </div>
            <div className='lists'>
                  <div className='list'>
                        <p className='title'>Product</p>
                        <p className='item'>Features</p>
                        <p className='item'>Pricing</p>
                        <p className='item'>Case studies</p>
                        <p className='item'>Reviews</p>
                        <p className='item'>Updates</p>
                  </div>
                  <div className='list'>
                        <p className='title'>Company</p>
                        <p className='item'>About</p>
                        <p className='item'>Careers</p>
                        <p className='item'>blog </p>
                        
                  </div>
                  <div className='list'>
                        <p className='title'>Support</p>
                        <p className='item'>Getting started</p>
                        <p className='item'>help center</p>
                        <p className='item'> Server status</p>
                        <p className='item'>Report a bug</p>
                        <p className='item'>chat support</p>
                  </div>
                  <div className='list'>
                        <p className='title'> <i className="fas fa-phone"></i>  Contact us</p>
                        <p className='item'> <i className="far fa-envelope"></i>  contact @company.com</p>
                        <p className='item'><i className="fas fa-mobile-alt"></i>  +212 6*******</p>
                        <p className='item' ><i className="fas fa-map-marker-alt"></i>   position</p>
                       
                  </div>

            </div>
       </div>
   
        
    </div>
  )
}

export default Footer


