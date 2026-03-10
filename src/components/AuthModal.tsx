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
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '440px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            fontSize: '32px',
            marginBottom: '12px',
          }}>🔐</div>
          <h2 style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: '800',
            fontSize: '24px',
            color: '#1A1A2E',
            margin: '0 0 8px',
          }}>{mode === 'signin' ? 'Sign In' : 'Create Account'}</h2>
          <p style={{
            fontSize: '14px',
            color: '#6B7280',
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            lineHeight: '1.5',
          }}>
            {mode === 'signin'
              ? 'Enter your email and password to continue'
              : 'Create an account to sync your progress across devices'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '700',
              color: '#374151',
              marginBottom: '6px',
              fontFamily: "'DM Mono', monospace",
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                fontFamily: "'Inter', sans-serif",
                border: '2px solid #E8E8F0',
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.2s',
                background: loading ? '#F9FAFB' : '#fff',
              }}
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
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '700',
              color: '#374151',
              marginBottom: '6px',
              fontFamily: "'DM Mono', monospace",
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
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
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '15px',
                fontFamily: "'Inter', sans-serif",
                border: '2px solid #E8E8F0',
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.2s',
                background: loading ? '#F9FAFB' : '#fff',
              }}
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
              <p style={{
                fontSize: '11px',
                color: '#9CA3AF',
                margin: '4px 0 0',
                fontFamily: "'Inter', sans-serif",
              }}>
                At least 6 characters
              </p>
            )}
          </div>

          {error && (
            <div style={{
              padding: '12px 16px',
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '8px',
              marginBottom: '16px',
            }}>
              <p style={{
                fontSize: '13px',
                color: '#DC2626',
                margin: 0,
                fontFamily: "'Inter', sans-serif",
              }}>
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password}
            style={{
              width: '100%',
              padding: '14px 24px',
              background: loading || !email || !password ? '#D1D5DB' : '#6C63FF',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '700',
              fontFamily: "'Sora', sans-serif",
              cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
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

        <div style={{
          marginTop: '20px',
          textAlign: 'center',
        }}>
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

        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: '#F7F7FC',
          borderRadius: '8px',
          border: '1px solid #E8E8F0',
        }}>
          <p style={{
            fontSize: '12px',
            color: '#6B7280',
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            lineHeight: '1.6',
          }}>
            <strong style={{ color: '#374151' }}>Sync Across Devices:</strong><br />
            Sign in with the same email on multiple devices to sync your progress in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
