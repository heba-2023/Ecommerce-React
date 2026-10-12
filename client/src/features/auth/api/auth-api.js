
import api from "@/lib/axios"

export  const sendRegisterOtp = async(userData)=>{
  const response = await api.post("/auth/register/send-otp", userData);
  return response.data
}

export const verifyRegisterOtp = async(otpData)=>{
  const response = await api.post("/auth/register/verify-otp",otpData);
  return response.data
}

export const loginUser = async(credintials)=>{
  const response = await api.post("/auth/login", credintials);
  return response.data
}

export const logoutUser = async()=>{
  const response = await api.post("/auth/logout");
  return response.data
}

export const sendForgotPasswordOtp = async(data)=>{
  const response = await api.post("/auth/forgot-password/send-otp", data);
  return response.data
}

 export const verifyForgotPasswordOtp = async(data)=>{
  const response = await api.post("/auth/forgot-password/verify-otp", data);
  return response.data
 }

export const getCurrentUser = async()=>{
  const response = await api.get("/auth/me");
  return response.data
}

export const testAdminRoute = async()=>{
  const response = await api.get("/auth/admin-test");

  return response.data
}

export const changeUserRole = async(roleData)=>{
  const response = await api.patch("/auth/change-role", roleData);
  return response.data
}
