import BaseService from './base.service';
import { from } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

export default class RandomNameService extends BaseService {
  baseUrl = 'https://randomuser.me/';
  resourceUrl = 'api/';

  getName () {
    const promise = fetch(this.getCompleteResourceUrl(), {
      mode: 'cors',
      method: 'GET',
    });

    return this.transform(promise)
      .pipe(
        flatMap(response => from(response.json())),
        map(response => {
          const fullNameObj = response.results[0].name;
          return `${fullNameObj.first} ${fullNameObj.last}`;
        }),
      );
  }
}
