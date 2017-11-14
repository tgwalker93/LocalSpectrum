import React from 'react';
import "./CreateAccount.css";

// componentDidMount: function() {
//     var embedCode = "<script>$(".email-signup").hide();
//     $("#signup-box-link").click(function(){
//       $(".email-login").fadeOut(100);
//       $(".email-signup").delay(100).fadeIn(100);
//       $("#login-box-link").removeClass("active");
//       $("#signup-box-link").addClass("active");
//     });
//     $("#login-box-link").click(function(){
//       $(".email-login").delay(100).fadeIn(100);;
//       $(".email-signup").fadeOut(100);
//       $("#login-box-link").addClass("active");
//       $("#signup-box-link").removeClass("active");
//     });</script>";
//     $('.className').append(embedCode);
// }


const CreateAccount = props => (

    <div className="row">
        <div className="col-sm-12">

            <div className="login-box">
                <div className="lb-header">
                    <a href="#" className="active" id="login-box-link">Login</a>
                    <a href="#" id="signup-box-link">Sign Up</a>
                </div>
                <div className="social-login">
                    <a href="#">
                        <i className="fa fa-facebook fa-md"></i>
                        Login in with facebook
                    </a>
                    <a href="#">
                        <i className="fa fa-google-plus fa-md"></i>
                        Log in with Google
    </a>
                </div>
                <form className="email-login">
                    <div className="u-form-group">
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="u-form-group">
                        <input type="password" placeholder="Password" />
                    </div>
                    <div className="u-form-group">
                        <button>Log in</button>
                    </div>
                    <div className="u-form-group">
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>
                </form>
                <form className="email-signup">
                    <div className="u-form-group">
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="u-form-group">
                        <input type="password" placeholder="Password" />
                    </div>
                    <div className="u-form-group">
                        <input type="password" placeholder="Confirm Password" />
                    </div>
                    <div className="u-form-group">
                        <button>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
        
    </div>

    
);

export default CreateAccount;