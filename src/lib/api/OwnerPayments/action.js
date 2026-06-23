import { serverMutation } from "../server";

export const myPropertiesPayment = async (data) => {
  const resData = await serverMutation("/api/payment", "POST", data);
  return resData;
};
