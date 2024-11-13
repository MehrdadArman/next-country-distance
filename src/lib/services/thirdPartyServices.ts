
import axiosApiInstance from './axiosInterceptor';
import * as urls from "@/constant/urlConfig";


export const getCurrentPosition = async () => {
  return await axiosApiInstance.get(urls.getCurrentPositionUrl);
}
