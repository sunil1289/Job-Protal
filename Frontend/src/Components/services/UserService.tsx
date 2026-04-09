import axiosInstance from "../../Interceptor/AxiosInterceptor";

const registerUser = async (user: any) => {
  return axiosInstance
    .post(`/users/register`, user)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const loginUser = async (login: any) => {
  return axiosInstance
    .post(`/users/login`, login)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const sendOtp = async (email: any) => {
  return axiosInstance
    .post(`/users/sendOtp/${email}`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const verfiyOtp = async (email: any, otp: any) => {
  return axiosInstance
    .get(`/users/verifyOtp/${email}/${otp}`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const changePass = async (email: any, password: any) => {
  const changePassData = { email, password };
  return axiosInstance
    .post(`/users/changePass`, changePassData)
    .then((result) => {
      console.log("result:");
      console.log(result);
      return result.data;
    })
    .catch((error) => {
      throw error;
    });
};

export { registerUser, loginUser, sendOtp, verfiyOtp, changePass };
