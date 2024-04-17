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
      message = error;
    } else if (error?.message) {
      message = error.message;
    }

    if (error?.code) {
      const clientErrorRegex = /^4\d{2}$/; // Regex for 4xx client errors
      if (clientErrorRegex.test(String(error.code))) {
        message = "Client Error";
        description = error.message || "There was an error processing your request. Please check your input or permissions.";
      } else {
        switch (error.code) {
          // Handle other specific codes if necessary
          case 500:
            message = "Internal Server Error";
            description = "The server encountered an unexpected condition.";
            break;
          // Add more cases as needed
        }
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
