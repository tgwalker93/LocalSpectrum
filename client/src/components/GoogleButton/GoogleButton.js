import React from 'react';
import { GoogleLogin } from 'react-google-login-component';

class GoogleButton extends React.Component{

  constructor (props, context) {
    super(props, context);
  }

  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log({accessToken: id_token});
    //anything else you want to do(save to localStorage)...
    // request.execute(function(resp) {
    //   console.log('ID: ' + resp.id);
    //   console.log('Display Name: ' + resp.displayName);
    //   console.log('Image URL: ' + resp.image.url);
    //   console.log('Profile URL: ' + resp.url);
    // });
  }

  render () {
    return (
      <div>
        <GoogleLogin socialId="713748908445-6gipmifvmjol8nvtso6ua2a7ovhub5fk.apps.googleusercontent.com"
                     className="google-login"
                     scope="profile"
                     fetchBasicProfile={false}
                     responseHandler={this.responseGoogle}
                     buttonText="Login With Google"/>
      </div>
    );
  }

}

export default GoogleButton;