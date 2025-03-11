import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestUtilsService {

  jsonToQueryStringParams(options: any) {
    const params = new URLSearchParams();
    for (const key in options) {
      if (!options[key] && options[key] != 0) continue;
      params.set(key, options[key]);
    }
    return params.toString();
  }

  queryStringToJSONObject(queryString: string) {
    if (queryString.indexOf('?') > -1)
      queryString = queryString.split('?')[1];
    const pairs = queryString.split('&');
    const result: any = {};
    pairs.forEach((pair) => {
      const splitPair = pair.split('=');
      result[splitPair[0]] = decodeURIComponent(splitPair[1] || '');
    });
    return result;
  }

}
