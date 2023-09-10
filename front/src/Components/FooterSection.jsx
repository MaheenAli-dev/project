import React, { useEffect } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

function FooterSection() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="bg-dark py-5">
        <div className="container bg-dark text-white">
          <div className="d-flex flex-md-row flex-column">
            <div className="bg-dark p-3 w-50" data-aos="fade-left">
              <h5 className="text-light my-2">M@hi's Cart</h5>
              <p className="text-light my-2">
              <p>Lorem ipsum dolor sit amet consectetur.
              Lorem ipsum dor  amet consectetur.
              </p>
              <p>Lorem ipsum dolor sit amet consectetur.lorem5 Lorem
                ipsum dolor sit amet.</p>
             
            
               
               
              </p>
            </div>

            <div className="bg-dark flex-grow-1 w-100 p-3 mx-2" data-aos="from-right">
              <div className="row">
                <div className="col-md-6 my-2">
                  <h5 className="text-light">Products</h5>
                </div>
                <div className="col-md-6 my-2">
                  <h5 className="text-light">Social</h5>
                </div>
                
              </div>
              <div className="row" data-aos="from-bottom">
                <div className="col-md-6 text-align-center my-2">Apparel</div>
                <div className="col-md-6 my-2">
                  <FaFacebook /> Facebook
                </div>
              </div>

              <div className="row" data-aos="from-bottom">
                <div className="col-md-6 my-2">Automotive</div>
                <div className="col-md-6 my-2">
                  <FaInstagram /> Instagram
                </div>
              </div>

              <div className="row" data-aos="from-bottom">
                <div className="col-md-6 my-2">Wearing Accesories</div>
                <div className="col-md-6 my-2">
                  <FaWhatsapp /> WhatsApp
                </div>
              </div>

              <div className="row" data-aos="from-bottom">
                <div className="col-md-6 my-2">Groceries</div>
                <div className="col-md-6 my-2">
                  <FaLinkedin /> LinkedIn
                </div>
              </div>

             
            </div>

            <div className="bg-dark p-3 w-50" data-aos="fade-left">
              <h5 className="text-light my-2">Location</h5>
              <div className="map-container">
                <iframe
                  title="Google Map"
                  width="100%"
                  height="200"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3220.679646332307!2dYOUR_LONGITUDE!3dYOUR_LATITUDE!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zYOUR_LATITUDE!5e0!3m2!1sen!2sus!4vYOUR_MAP_EMBED_API_KEY"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row bg-dark">
            <div className="col-12 text-center mt-4">
              <p className="text-light">&copy; {new Date().getFullYear()} M@hi's Cart. All rights reserved.</p>
            </div>
            </div>
    </>
  );
}

export default FooterSection;


