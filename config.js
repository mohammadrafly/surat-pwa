const baseUrl = 'http://localhost:8080';
const apiUrl = '/api/V1/';
const kelahiranUrl = 'kelahiran/';

const apiEndpoints = {
  dashboard: {
    myProfile: `${baseUrl}${apiUrl}my-profile/`,
    surat: {
      kelahiran: `${baseUrl}${apiUrl}${kelahiranUrl}`,
      kelahiranUpdate: `${baseUrl}${apiUrl}${kelahiranUrl}update/`,
      kelahiranDelete: `${baseUrl}${apiUrl}${kelahiranUrl}delete/`,
      kelahiranSingle: `${baseUrl}${apiUrl}${kelahiranUrl}single/`,
    },
  },
  auth: {
    signIn: `${baseUrl}${apiUrl}sign-in`,
    signUp: `${baseUrl}${apiUrl}sign-up`,
  },
};

export default apiEndpoints;
