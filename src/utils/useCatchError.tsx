import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { App, Result } from "antd";

const useCatchError = () => {
  const { notification } = App.useApp();

  const catchError = (error?: SerializedError | FetchBaseQueryError | any, type: "result" | "notification" = "notification") => {
    let message: string = "Ops! Something didn't work";
    let description: string = "Unable to complete the operation, please try later";

    console.log("ERROR", error);

    // Adjust to account for potentially nested error structure
    const actualError = error?.data || error;

    console.log("actualERROR", actualError);

    if (typeof actualError === "string") {
      message = actualError;
    } else if (actualError?.message) {
      message = actualError.message;
    }

    if (actualError?.code) {
      const clientErrorRegex = /^4\d{2}$/; // Regex for 4xx client errors
      if (clientErrorRegex.test(String(actualError.code))) {
        message = "Client Error";
        description = actualError.message || "There was an error processing your request. Please check your input or permissions.";
      } else {
        switch (actualError.code) {
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
