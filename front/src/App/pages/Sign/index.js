import React, { PureComponent } from 'react'
import axios from 'axios'
import logo from 'src/assets/logos/logo.png'
import { GoogleLogin } from 'react-google-login'
import classnames from 'classnames/bind'
import css from './index.scss'

const cx = classnames.bind(css)
const moduleName = 'SignUp'

class SignUp extends PureComponent {

  responseGoogle = response => {
    console.log(response)
    const { tokenId, accessToken, profileObj: { name, email } } = response
    //post 요청 보내기
    debugger
  }

  render() {
    return (
      <div className={cx(`${moduleName}`)}>
        <div className={cx(`${moduleName}_wrapper`)}>
          <div className={cx(`${moduleName}_wrapper_logo`)}>
            <img src={logo} alt={logo} />
          </div>
          <div className={cx(`${moduleName}_wrapper_content`)}>
            <div className={cx(`${moduleName}_wrapper_content_top`)}>
              Starting Semibasement
            </div>
            <div className={cx(`${moduleName}_wrapper_content_body`)}>
              복잡한 절차 없이 구글 계정으로간편하게 <br /> 세미베이스먼트를
              만나보세요!
            </div>
            <div className={cx(`${moduleName}_wrapper_content_bottom`)}>
              <span
                className={cx(`${moduleName}_wrapper_content_bottom_icon`)}
              />
              <div className={cx(`${moduleName}_wrapper_content_bottom_title`)}>
                Continue With Google
              </div>
            </div>
            <GoogleLogin
              clientId={process.env.SEBA_GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp
