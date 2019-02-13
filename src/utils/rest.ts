import { IRestError } from "../components/@types";

// export function getData(url: string): Promise<string> {
export function getData(url: string): Promise<{data: any; type: string}> {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(url, options).then(handleFetchUrlResponse);
}

function handleFetchUrlResponse(response: any): Promise<{data: any, type: string}> {
// function handleFetchUrlResponse(response: any): Promise<string> {
  const contentType = response.headers.get("content-type");

  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(contentType.includes("text") ? response.text() : response.json())
      .then(data => ({data, type: contentType}));
    
    // return Promise.resolve({data, type: contentType})
    // return Promise.resolve(response.text());
  } else {
    return Promise.resolve(contentType.includes("text") ? response.text() : response.json())
      .catch(err => ({ status: response.status, message: err.message }))
      .then((restError: IRestError) => {
        throw restError;
      });
  }
}
