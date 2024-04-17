import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { App, Result } from "antd";

const useCatchError = () => {
  const { notification } = App.useApp();
  
  const catchError = (error?: SerializedError | FetchBaseQueryError | any, type: "result" | "notification" = "notification") => {
    let message: string = "Ops! Something didn't work";
    let description: string = "Unable to complete the operation, please try later";
    let status = error.status;
console.log("ERROR", error);
    if (typeof error === "string") {
      status = error; // using error string as status code                             

    } else if (error?.message) {
      message = error.message;

    } else if (error?.status) {

      switch (status) {
        case "WRONG_USERNAME_PASSWORD":
          message = 'Wrong credentials';
          break;

        case "application_data_missing":
          message = "Unable to receive application data";
          break;

        case "FETCH_ERROR":
          message = "Unable to receive data";
          description = "The application failed to retrieve data from the server, try again later";
          break;

        case "PARSING_ERROR":
          message = "Failed parsing data";
          description = "Unexpected character sent, check the data";
          break;
      }
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
          duration: 2,
        });
    }
  }

  return { catchError }
}

export default useCatchError;