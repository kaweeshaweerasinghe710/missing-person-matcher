import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

function Auth() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated, user, logout } = useAuth();

  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'CITIZEN',
    badgeNumber: '',
  });

  const redirectPath = location.state?.from || '/';

  const handleLoginChange = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginForm.email.trim() || !loginForm.password) {
      setError(t('fillAllFields'));
      return;
    }

    setLoading(true);
    setError('');
    try {
      await login(loginForm.email, loginForm.password);
      navigate(redirectPath);
    } catch (err) {
      setError(err.message || t('loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!registerForm.name.trim() || !registerForm.email.trim() || !registerForm.password) {
      setError(t('fillAllFields'));
      return;
    }

    if (registerForm.password.length < 6) {
      setError(t('passwordMinLength'));
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError(t('passwordsDoNotMatch'));
      return;
    }

    setLoading(true);
    setError('');
    try {
      await register({
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        role: registerForm.role,
        badgeNumber: registerForm.badgeNumber,
      });
      setSuccess(t('registrationSuccess'));
      setTimeout(() => {
        navigate(redirectPath);
      }, 1000);
    } catch (err) {
      setError(err.message || t('registrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (role) => {
    if (role === 'OFFICER') {
      setLoginForm({
        email: 'officer@police.gov.lk',
        password: 'password123',
      });
    } else {
      setLoginForm({
        email: 'citizen@example.com',
        password: 'password123',
      });
    }
  };

  if (isAuthenticated && user) {
    return (
      <div className="auth-page-container">
        <div className="auth-card">
          <div className="auth-card-header">
            <span style={{ fontSize: '42px' }}>👤</span>
            <h2>{t('alreadyLoggedIn')}</h2>
            <p className="auth-card-subtitle">{user.name} ({user.email})</p>
            <div className="auth-role-pill">
              {user.role === 'OFFICER' ? '👮 ' + t('roleOfficer') : user.role === 'VOLUNTEER' ? '🤝 ' + t('roleVolunteer') : '👤 ' + t('roleCitizen')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              type="button"
              className="btn-auth-submit"
              onClick={() => navigate('/')}
            >
              {t('backToCases')}
            </button>
            <button
              type="button"
              className="btn-auth-secondary"
              onClick={logout}
            >
              {t('logout')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <Link to="/" className="auth-back-link">
          ← {t('backToCases')}
        </Link>

        <div className="auth-card-header">
          <span style={{ fontSize: '36px' }}>🛡️</span>
          <h2>{t('appTitle')}</h2>
          <p className="auth-card-subtitle">
            {mode === 'login' ? t('loginSubtitle') : t('registerSubtitle')}
          </p>
        </div>

        <div className="auth-tab-group">
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => {
              setMode('login');
              setError('');
              setSuccess('');
            }}
          >
            {t('signInTab')}
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
            onClick={() => {
              setMode('register');
              setError('');
              setSuccess('');
            }}
          >
            {t('signUpTab')}
          </button>
        </div>

        {error && <div className="auth-alert auth-alert-error">{error}</div>}
        {success && <div className="auth-alert auth-alert-success">{success}</div>}

        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <div className="auth-field-group">
              <label>{t('emailAddress')}</label>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="auth-field-group">
              <label>{t('password')}</label>
              <div className="auth-password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="auth-password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="auth-demo-helper">
              <span className="auth-demo-label">{t('quickFillDemo')}:</span>
              <button
                type="button"
                className="auth-demo-tag"
                onClick={() => handleFillDemo('OFFICER')}
              >
                👮 {t('roleOfficer')}
              </button>
              <button
                type="button"
                className="auth-demo-tag"
                onClick={() => handleFillDemo('CITIZEN')}
              >
                 {t('roleCitizen')}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-auth-submit"
            >
              {loading ? t('signingIn') : t('signInBtn')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="auth-form">
            <div className="auth-field-group">
              <label>{t('fullName')}</label>
              <input
                type="text"
                name="name"
                value={registerForm.name}
                onChange={handleRegisterChange}
                placeholder="Kamal Perera"
                required
              />
            </div>

            <div className="auth-field-group">
              <label>{t('emailAddress')}</label>
              <input
                type="email"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                placeholder="kamal@example.com"
                required
              />
            </div>

            <div className="auth-field-group">
              <label>{t('accountRole')}</label>
              <div className="auth-role-select-grid">
                <button
                  type="button"
                  className={`auth-role-card ${registerForm.role === 'CITIZEN' ? 'active' : ''}`}
                  onClick={() => setRegisterForm((p) => ({ ...p, role: 'CITIZEN' }))}
                >
                  <span className="role-icon">👤</span>
                  <div className="role-title">{t('roleCitizen')}</div>
                  <div className="role-desc">{t('roleCitizenDesc')}</div>
                </button>
                <button
                  type="button"
                  className={`auth-role-card ${registerForm.role === 'OFFICER' ? 'active' : ''}`}
                  onClick={() => setRegisterForm((p) => ({ ...p, role: 'OFFICER' }))}
                >
                  <span className="role-icon">👮</span>
                  <div className="role-title">{t('roleOfficer')}</div>
                  <div className="role-desc">{t('roleOfficerDesc')}</div>
                </button>
                <button
                  type="button"
                  className={`auth-role-card ${registerForm.role === 'VOLUNTEER' ? 'active' : ''}`}
                  onClick={() => setRegisterForm((p) => ({ ...p, role: 'VOLUNTEER' }))}
                >
                  <div className="role-title">{t('roleVolunteer')}</div>
                  <div className="role-desc">{t('roleVolunteerDesc')}</div>
                </button>
              </div>
            </div>

            {registerForm.role === 'OFFICER' && (
              <div className="auth-field-group">
                <label>{t('officerBadgeNumber')}</label>
                <input
                  type="text"
                  name="badgeNumber"
                  value={registerForm.badgeNumber}
                  onChange={handleRegisterChange}
                  placeholder="SLP-4928"
                  required
                />
              </div>
            )}

            {registerForm.role === 'VOLUNTEER' && (
              <div className="auth-field-group">
                <label>{t('volunteerOrgId')}</label>
                <input
                  type="text"
                  name="badgeNumber"
                  value={registerForm.badgeNumber}
                  onChange={handleRegisterChange}
                  placeholder="RedCross-881"
                />
              </div>
            )}

            <div className="auth-field-group">
              <label>{t('password')}</label>
              <div className="auth-password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="auth-password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="auth-field-group">
              <label>{t('confirmPassword')}</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-auth-submit"
            >
              {loading ? t('creatingAccount') : t('createAccountBtn')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Auth;
