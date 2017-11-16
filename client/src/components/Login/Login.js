import React from 'react';
import "./Login.css";



const Login = props => (

    <div className="row">
        <div className="col-sm-12">
        <GoogleButton>
            </GoogleButton>
            <form className="login" action="/login" method="POST" name="validation">

                <fieldset>

                    <legend className="legend text-center">
                        <h3>Login</h3>
                    </legend>


                    <input type="text" placeholder=" Username" id="username" name="username" required autoComplete='off' />
                   
                    <input type="password" placeholder="Password" id="password" name="password" required />
                 

                    <p className="text-center" id="switchTo">Not a Member. <a href="/create">Create Account</a></p>
                  
                        <input type="submit" value="&rarr;" className="submitButton" id="submit" />

                </fieldset>

                            

            </form>
           
            
        </div>
        
    </div>

    
                );

export default Login;