import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { App, Result } from "antd";

const useCatchError = () => {
  const { notification } = App.useApp();

  const catchError = (error?: SerializedError | FetchBaseQueryError | any, type: "result" | "notification" = "notification") => {
    let message: string = "Ops! Something didn't work";
    let description: string = "Unable to complete the operation, please try later";
    // Adjust to account for potentially nested error structure
    let actualErrorCode: number;
    let actualErrorMessage: string = "";

    if (error?.message && JSON.parse(error.message).data?.code) {
      // error from API with status 200
      actualErrorCode = JSON.parse(error.message).data.code;
      actualErrorMessage = JSON.parse(error.message).data.message;
      
      const clientErrorRegex = /^4\d{2}$/; // Regex for 4xx client errors
      if (clientErrorRegex.test(String(actualErrorCode))) {
        message = actualErrorMessage;
        description = "There was an error processing your request. Please check your input or permissions.";
      } else {
        switch (actualErrorCode) {
          // Handle other specific codes if necessary
          case 500:
            message = "Internal Server Error";
            description = "The server encountered an unexpected condition.";
            break;
          // Add more cases as needed
        }
      }
    
    } else if (error?.message) {
      // classic catch with error object
      message = actualErrorMessage; // override message only
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
