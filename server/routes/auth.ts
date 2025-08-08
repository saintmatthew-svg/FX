import { RequestHandler } from "express";

export const handleGoogleAuth: RequestHandler = (req, res) => {
  
  const googleAuthUrl = `https://accounts.google.com/oauth/authorize?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID || 'your-google-client-id'}&` +
    `redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI || 'http://localhost:8080/api/auth/google/callback')}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent('openid email profile')}&` +
    `access_type=offline`;

  res.redirect(googleAuthUrl);
};

export const handleGoogleCallback: RequestHandler = async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.redirect('/login?error=oauth_failed');
    }

    console.log('Google OAuth callback received code:', code);
    
    res.redirect('/?success=google_login');
    
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect('/login?error=oauth_failed');
  }
};

export const handleFacebookAuth: RequestHandler = (req, res) => {
  
  const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
    `client_id=${process.env.FACEBOOK_CLIENT_ID || 'your-facebook-client-id'}&` +
    `redirect_uri=${encodeURIComponent(process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:8080/api/auth/facebook/callback')}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent('email public_profile')}`;

  res.redirect(facebookAuthUrl);
};

export const handleFacebookCallback: RequestHandler = async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.redirect('/login?error=oauth_failed');
    }
    console.log('Facebook OAuth callback received code:', code);
    res.redirect('/?success=facebook_login');
    
  } catch (error) {
    console.error('Facebook OAuth error:', error);
    res.redirect('/login?error=oauth_failed');
  }
};
