import React from 'react';
import "./Footer.css";


const Footer = props => (
    
    <footer className="myfooter">
        
                <div className="container">
                    {/* <div className="row">
                        <div className="col-sm-12 text-center">
                            <a className="up-arrow" href="#home" data-toggle="tooltip" title="TO TOP">
                                <span className="glyphicon glyphicon-chevron-up"></span>
                            </a><br/><br/>
                        </div>
                    </div> */}
                    <div className="row socialbox">
                        <div className="col-xs-6 col-sm-2">
                            <h4>Tyler Walker</h4>
                            <p><i className="fa fa-linkedin-square" aria-hidden="true"></i><a className="social" href="https://www.linkedin.com/in/tyler-walker-52aa6471/">LinkedIn</a></p>
                            <p><i className="fa fa-github-square" aria-hidden="true"></i><a className="social" href="https://github.com/tgwalker93">Github</a></p>
                        </div>
        
                        <div className="col-xs-6 col-sm-2">
                            <h4>Tammy Le</h4>
                            <p><i className="fa fa-linkedin-square" aria-hidden="true"></i><a className="social" href="https://www.linkedin.com/in/tammyle245/">LinkedIn</a></p>
                            <p><i className="fa fa-github-square" aria-hidden="true"></i><a className="social" href="https://github.com/letam245">Github</a></p>
                        </div>
        
                        <div className="col-xs-6 col-sm-2">
                            <h4>Omar Solis</h4>
                            <p><i className="fa fa-linkedin-square" aria-hidden="true"></i><a className="social" href="www.linkedin.com/in/omarsolisoc">LinkedIn</a></p>
                            <p><i className="fa fa-github-square" aria-hidden="true"></i><a className="social" href="https://github.com/Yakoloi">Github</a></p>
                        </div>

                        <div className="col-xs-6 col-sm-2">
                            <h4>Matthew Belanic</h4>
                            <p><i className="fa fa-linkedin-square" aria-hidden="true"></i><a className="social" href="https://www.linkedin.com/in/mjbelanic/">LinkedIn</a></p>
                            <p><i className="fa fa-github-square" aria-hidden="true"></i><a className="social" href="https://github.com/mjbelanic/">Github</a></p>
                        </div>

                        <div className="col-xs-6 col-sm-2">
                            <h4>Prathibha Chunchu</h4>
                            <p><i className="fa fa-linkedin-square" aria-hidden="true"></i><a className="social" href="https://www.linkedin.com/in/prathibha-panga-224b1a16/">LinkedIn</a></p>
                            <p><i className="fa fa-github-square" aria-hidden="true"></i><a className="social" href="https://github.com/chunchuprati">Github</a></p>
                        </div>
                    </div> 
                </div>
        
                <div className="">
                    <p className="text-center copyRight">© Amazon Team. All rights reservered.</p>
                </div>
            </footer>
    
);

export default Footer;