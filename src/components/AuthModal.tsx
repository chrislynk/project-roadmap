import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function AuthModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = mode === 'signin'
      ? await signIn(email, password)
      : await signUp(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-icon">🔐</div>
          <h2 className="modal-title">{mode === 'signin' ? 'Sign In' : 'Create Account'}</h2>
          <p className="modal-description">
            {mode === 'signin'
              ? 'Enter your email and password to continue'
              : 'Create an account to sync your progress across devices'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px', marginRight: '8px' }}>
            <label className="label label-form">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={loading}
              className="input input-large"
              style={{ border: '2px solid #E8E8F0', width: '100%' }}
              onFocus={(e) => {
                e.target.style.borderColor = '#6C63FF';
                e.target.style.boxShadow = '0 0 0 3px rgba(108, 99, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E8E8F0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label className="label label-form">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
              minLength={6}
              className="input input-large"
              style={{ border: '2px solid #E8E8F0', width: '100%' }}
              onFocus={(e) => {
                e.target.style.borderColor = '#6C63FF';
                e.target.style.boxShadow = '0 0 0 3px rgba(108, 99, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E8E8F0';
                e.target.style.boxShadow = 'none';
              }}
            />
            {mode === 'signup' && (
              <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '4px 0 0', fontFamily: "'Inter', sans-serif" }}>
                At least 6 characters
              </p>
            )}
          </div>

          {error && (
            <div className="error-box">
              <p className="error-text">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '14px 24px',
              background: loading || !email || !password ? '#D1D5DB' : '#6C63FF',
              fontSize: '15px',
              fontFamily: "'Sora', sans-serif",
              cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
            }}
            onMouseOver={(e) => {
              if (!loading && email && password) {
                e.currentTarget.style.background = '#5952E0';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(108, 99, 255, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = loading || !email || !password ? '#D1D5DB' : '#6C63FF';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {loading
              ? (mode === 'signin' ? 'Signing In...' : 'Creating Account...')
              : (mode === 'signin' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError(null);
            }}
            disabled={loading}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#6C63FF',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: "'Inter', sans-serif",
              cursor: loading ? 'not-allowed' : 'pointer',
              textDecoration: 'underline',
            }}
          >
            {mode === 'signin'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>

        <div className="modal-info-box">
          <p style={{ fontSize: '12px', color: '#6B7280', margin: 0, fontFamily: "'Inter', sans-serif", lineHeight: '1.6' }}>
            <strong style={{ color: '#374151' }}>Sync Across Devices:</strong><br />
            Sign in with the same email on multiple devices to sync your progress in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
