// AWS Cognito Configuration
export const cognitoConfig = {
  // Regular login/signup
  clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "5u411frjvscpbcksgv4ce5kf5b",
  clientSecret: process.env.COGNITO_CLIENT_SECRET || "uqltvu1cr8sgt60pg9c8fmhaacvqmt77op46ut3em7p8igqmde",
  
  // SSO login
  ssoClientId: process.env.NEXT_PUBLIC_COGNITO_SSO_CLIENT_ID || "24vle4l58riamcdce2lh1imn35",
  ssoClientSecret: process.env.COGNITO_SSO_CLIENT_SECRET || "11jhe4jcpokjjca9mskuv79mvnpk0neo8phnq3etgpb2oc8b8hup",
  
  // Cognito URLs
  domain: "exaltride-auth.auth.ap-south-1.amazoncognito.com",
  region: "ap-south-1",
  
  // API endpoints
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://5mevyhs2u2.execute-api.ap-south-1.amazonaws.com/dev",
  
  // Redirect URLs (update these with your actual domain)
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "http://localhost:3000/auth/callback",
  logoutUri: process.env.NEXT_PUBLIC_LOGOUT_URI || "http://localhost:3000",
};

export const authEndpoints = {
  signup: `${cognitoConfig.apiBaseUrl}/auth/signup`,
  login: `${cognitoConfig.apiBaseUrl}/auth/login`,
  verifyOtp: `${cognitoConfig.apiBaseUrl}/auth/verify-otp`,
  ssoAuthorize: `https://${cognitoConfig.domain}/oauth2/authorize`,
  token: `https://${cognitoConfig.domain}/oauth2/token`,
  logout: `https://${cognitoConfig.domain}/logout`,
};
