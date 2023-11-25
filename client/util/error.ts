import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    handleAxiosError(error);
  } else if (error instanceof Error) {
    handleClientError(error);
  } else {
    console.error('Unhandled error:', error);
    toast.error('An unexpected error occurred.');
  }
};

const handleAxiosError = (error: AxiosError) => {
  const { response, request } = error;

  if (response) {
    handleResponseError(response);
  } else if (request) {
    handleRequestError(request);
  } else {
    console.error('Unhandled AxiosError:', error);
    toast.error('An unexpected Axios error occurred.');
  }
};

const handleResponseError = (response: any) => {
  const { status, data } = response;

  switch (status) {
    case 400: 
      toast.error(data.message)
    case 401:
      // TODO: Handle unauthorized access (e.g., user not logged in, expired or invalid token)
      toast.error(data.message)
      break;
    case 404:
      toast.error(data.message)
      break;
    case 409:
      toast.error(data.message)
      break;
    case 500:
      toast.error(data.message)
      break;
    default:
      console.error('Unhandled response error:', response);
      toast.error('An unexpected error occurred.');
  }
};

const handleRequestError = (error: any) => {
  // TODO: Create API endpoint to check whether user is logged or not
    console.error('Request error:', error);
    toast.error('Something went wrong.');
};

const handleClientError = (error: Error) => {
  toast.error(error.message);
};