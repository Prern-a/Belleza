import React from "react";

function FindUs(){
    return(
        <>
            <div style={{display: "flex", height: "80vh" ,alignItems: "center"}}>
                <h1 style={{fontSize: "300%", marginLeft: "18%"}}>Our Locations</h1>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.9833477465!2d72.83328527597956!3d19.06446975233291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c91130392c07%3A0x3c47bf391c8de931!2sThadomal%20Shahani%20Engineering%20College!5e0!3m2!1sen!2sin!4v1720805403478!5m2!1sen!2sin" 
                    width="800" height="600" title="TSEC" 
                    style={{border: "0", marginLeft: "20%", borderRadius: "10px"}} 
                    allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>  
        </>
    )
}

export default FindUs;