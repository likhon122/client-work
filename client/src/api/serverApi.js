export const backendDomain = "https://client-work-6t1v.onrender.com";
const ServerApi = {
  signUp: {
    url: `${backendDomain}/user/register`,
    method: "post",
  },
  verifyOtp: {
    url: `${backendDomain}/user/verify`,
    method: "post",
  },
  resendCode: {
    url: `${backendDomain}/user/resend-code`,
    method: "post",
  },
  forgotPassword: {
    url: `${backendDomain}/user/forgot-password`,
    method: "post",
  },
  resetPassword: {
    url: `${backendDomain}/user/reset-password`,
    method: "post",
  },
  login: {
    url: `${backendDomain}/auth/login`,
    method: "post",
  },
  verifyUser: {
    url: `${backendDomain}/auth/verify-user`,
    method: "get",
  },
  logout: {
    url: `${backendDomain}/auth/log-out`,
    method: "get",
  },
};

export default ServerApi;
