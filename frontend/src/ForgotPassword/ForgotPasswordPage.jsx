import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { validateEmail } from '../_helpers/utils';
import { authenticationService } from '@/_services';
import { ForgotPasswordInfoScreen } from '@/SuccessInfoScreen';
import OnboardingNavbar from '@/_components/OnboardingNavbar';
import { ButtonSolid } from '@/_components/AppButton';
import { withTranslation } from 'react-i18next';
import EnterIcon from '../../assets/images/onboardingassets/Icons/Enter';
import Spinner from '@/_ui/Spinner';
class ForgotPasswordComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      responseShow: false,
      emailError: '',
    };
  }
  darkMode = localStorage.getItem('darkMode') === 'true';

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, emailError: '' });
  };

  handleClick = (event) => {
    event.preventDefault();

    if (!validateEmail(this.state.email)) {
      this.setState({ emailError: 'Invalid Email' });
      return;
    }

    this.setState({ isLoading: true });

    authenticationService
      .forgotPassword(this.state.email)
      .then(() => {
        toast.success('请检查您的邮件获取密码重置链接', {
          id: 'toast-forgot-password-confirmation-code',
        });
        this.setState({ responseShow: true, isLoading: false });
      })
      .catch((res) => {
        toast.error(res.error || '出现问题，请重试', {
          id: 'toast-forgot-password-email-error',
        });
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { isLoading } = this.state;

    return (
      <div className="common-auth-section-whole-wrapper page">
        <div className="common-auth-section-left-wrapper">
          <OnboardingNavbar darkMode={this.darkMode} />
          <div className="common-auth-section-left-wrapper-grid">
            <form>
              <div className="common-auth-container-wrapper forgot-password-auth-wrapper">
                {!this.state.responseShow ? (
                  <>
                    <h2 className="common-auth-section-header" data-cy="forgot-password-page-header">
                    忘记密码
                    </h2>
                    <p className="common-auth-sub-header" data-cy="forgot-password-sub-header">
                    新用户? &nbsp;
                      <Link
                        to={'/signup'}
                        tabIndex="-1"
                        style={{ color: this.darkMode && '#3E63DD' }}
                        data-cy="create-an-account-link"
                      >
                        创建帐户
                      </Link>
                    </p>
                    <div className="forgot-input-wrap">
                      <p className="tj-text-input-label" data-cy="email-input-label">
                        电子邮箱地址
                      </p>
                      <input
                        onChange={this.handleChange}
                        name="email"
                        type="email"
                        placeholder="请输入您的邮箱"
                        className="tj-text-input"
                        style={{ marginBottom: '0px' }}
                        autoFocus
                        autoComplete="off"
                        data-cy="email-input-field"
                      />
                      {this.state.emailError && (
                        <span className="tj-text-input-error-state">{this.state.emailError}</span>
                      )}
                    </div>
                    <div>
                      <ButtonSolid
                        onClick={(e) => this.handleClick(e)}
                        disabled={isLoading || !this.state.email}
                        className="forget-password-btn"
                        data-cy="reset-password-link"
                      >
                        {isLoading ? (
                          <div className="spinner-center">
                            <Spinner />
                          </div>
                        ) : (
                          <>
                            <span> 发送重置链接</span>
                            <EnterIcon
                              className="enter-icon-onboard"
                              fill={isLoading || !this.state.email ? (this.darkMode ? '#656565' : ' #D1D5DB') : '#fff'}
                            />
                          </>
                        )}
                      </ButtonSolid>
                    </div>
                  </>
                ) : (
                  <ForgotPasswordInfoScreen props={this.props} email={this.state.email} darkMode={this.darkMode} />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export const ForgotPassword = withTranslation()(ForgotPasswordComponent);
