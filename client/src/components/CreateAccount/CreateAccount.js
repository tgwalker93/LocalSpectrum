import React from 'react';
import "./CreateAccount.css";



const CreateAccount = props => (

    <div className="row">
        <div className="col-sm-12">
        <form className="regis" action="/register" method='post' name="validation">
        <fieldset>
          <legend class="legend text-center">
            <h3>REGISTER</h3>
          </legend>

          <input type="text" placeholder="Username" name="username" id="username" required autoComplete='off' />

          <input type="password" placeholder=" Password" name="password" id="password" required />

          <input type="password" placeholder="Confirm Password" id="confirmPassword" name="confirmPassword" required />

          <p className="text-center" id="switchTo">Already a Member. <a href="/login">Log In</a></p>
            <input type="submit" id="register" value="&rarr;" class="submitButton" />
        </fieldset>
      </form>
           
            
        </div>
        
    </div>

    
                );

export default CreateAccount;