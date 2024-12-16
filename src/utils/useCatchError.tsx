import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { App, Result } from "antd";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../features/auth/authSlice";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useCatchError = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const catchError = useCallback((error?: SerializedError | FetchBaseQueryError | any, type: "result" | "notification" = "notification") => {
    let message: string = "Ops! Something didn't work";
    let description: React.ReactNode = "Unable to complete the operation, please try later";

    if ((error?.status === 401 || error?.code === 401) /* || (user === null) */) {
      // logout
      const dispatch = useAppDispatch();
      dispatch(logout());
      navigate("/login");

    } else if (error?.status === 500 || error?.code === 500) {
      // critical error
      message = "Internal Server Error";
      description = error?.data?.message || "The server encountered an unexpected condition.";

    } else if ((/^4\d{2}$/).test(String(error?.status)) || (/^4\d{2}$/).test(String(error?.code))) {
      if (error?.data?.message) {
        // override error message
        message = "There was an error processing your request"
      }
      description =  error?.data?.message || "Please check your input or permissions.";
    }

    switch (type) {
      case "result":
        return <Result status="error" title={message} subTitle={description} />;
      break;

      case "notification":
      default:
        notification.error({
          description: description,
          message: message,
          duration: 4,
        });
    }
  }, [])

  return { catchError }
}

export default useCatchError;
