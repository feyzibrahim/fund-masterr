import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
	baseURL: "http://localhost:4000/api", // Replace with your base URL
	timeout: 5000, // Set a timeout limit
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

axiosInstance.interceptors.request.use(async (config) => {
	// const accessToken = await getAccessToken();
	// if (accessToken) {
	// 	config.headers.Authorization = `Bearer ${accessToken}`;
	// }
	return config;
});

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: AxiosError) => {
		if (error.response && error.response.data) {
			return Promise.reject(error.response.data);
		}
		return Promise.reject(error.message);
	}
);

class AxiosRequestClass {
	get = async <RESPONSE>(url: string, params?: any): Promise<RESPONSE> => {
		const { data } = await axiosInstance.get(url, params);
		return data;
	};

	patch = async <BODY, RESPONSE>(url: string, body: BODY): Promise<RESPONSE> => {
		const { data } = await axiosInstance.patch(url, body);
		return data;
	};

	post = async <BODY, RESPONSE>(url: string, body: BODY): Promise<RESPONSE> => {
		try {
			const response = await axiosInstance.post(url, body);
			return response.data;
		} catch (error: any) {
			if (error) {
				throw new Error(error.response?.data || error?.message);
			} else {
				throw new Error("An unexpected error occurred");
			}
		}
	};

	delete = async <RESPONSE>(url: string): Promise<RESPONSE> => {
		const { data } = await axiosInstance.delete(url);

		return data;
	};
}
const AxiosRequest = new AxiosRequestClass();

export { AxiosRequest };
