import { getData } from "./rest";
import * as sw2dts from "sw2dts";
import { toast } from "react-toastify";
// import CodeMirror from 'CodeMirror'

export async function swaggerJsonToTypescript(data: JSON): Promise<string> {
  try {
    let option = {
      namespace: "...",

      // includes GET query parameters.
      withQuery: true
    };

    const dts = await sw2dts.convert(data, option);
    return dts;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function getJsonDataFromUrl(
  url: string,
  redo: boolean = false
): Promise<JSON | null> {
  try {
    const { data, type } = await getData(url);
    if(type.includes('text')) {
      if(redo) {
        urlNotFound()
        return null
      } else {
        const foundUrlInHtml = findSwaggerUrlInHtml(data)
        if(foundUrlInHtml) {
          return await getJsonDataFromUrl(url, true)
        } else {
          urlNotFound()
        }
      }
    } else {
      return data
    }

    return null
  } catch (err) {
    throw err;
  }
}

export function urlNotFound() {
  toast.error(
    "Cannot find the JSON url on this page. Please provide the JSON url from Swagger.",
    { toastId: 'cannotFind'}
  );
}

function findSwaggerUrlInHtml(htmlText: string) {
  const stringSwaggerJson = htmlText.search("/swagger.json");
  const stringApiDocs = htmlText.search("/api-docs");
  const charAtFound = stringSwaggerJson || stringApiDocs;

  let startCharAt = 0;
  let endCharAt = 0;
  if (charAtFound) {

    for (let i = charAtFound; i > 0; i--) {
      if (htmlText.charAt(i) === '"') {
        startCharAt = i;
        break;
      }
    }

    for (let j = charAtFound; j < htmlText.length; j++) {
      if (htmlText.charAt(j) === '"') {
        endCharAt = j;
        break;
      }
    }
  }

  return htmlText.substr((startCharAt + 1), (endCharAt-startCharAt -1))
}
