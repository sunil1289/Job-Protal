
import axiosInstance from "../Interceptor/AxiosInterceptor";

const base_url = "http://localhost:8080/profiles/";

const getProfile = async (id: any) => {
  return axiosInstance
    .get(`${base_url}get/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const updateProfile = async (profile: any) => {
  return axiosInstance
    .put(`${base_url}update`, profile)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const getAllProfiles = async () => {
  return axiosInstance
    .get(`${base_url}getall`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export { getProfile, updateProfile, getAllProfiles };
