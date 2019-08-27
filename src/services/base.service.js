import { from, ReplaySubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export default class BaseService {
  apiResourceProvider = null;

  constructor (apiResourceProvider) {
    this.apiResourceProvider = apiResourceProvider;
  }

  static catchError (error) {
    throw new Error(error);
  }

  transform (promise) {
    return from(promise)
      .pipe(
        catchError(error => BaseService.catchError(error)),
      );
  }

  getCompleteResourceUrl (params, id) {
    let resourceWithParams = `${this.baseUrl}${this.resourceUrl}`;

    const resourceParams = resourceWithParams.match(/[^{}]+(?=})/g);
    if (!!resourceParams && !!params) {
      resourceParams.forEach((paramKey) => {
        resourceWithParams = resourceWithParams.replace(`{${paramKey}}`, params[paramKey]);
      });
    }

    if (id) {
      resourceWithParams = `${resourceWithParams}/${id}`;
    }

    return resourceWithParams;
  }

  add (data, params) {
    const promise = this.apiResourceProvider
      .ref(this.getCompleteResourceUrl(params))
      .push(data);

    return this.transform(promise)
      .pipe(
        map(ref => ref.key),
      );
  }

  save (id, data, params) {
    if (!id) {
      throw new Error(`${this.constructor.name}: Id argument is missed for saving data`);
    }

    const promise = this.apiResourceProvider
      .ref(this.getCompleteResourceUrl(params, id))
      .set(data);

    return this.transform(promise);
  }

  getList (params) {
    const promise = this.apiResourceProvider
      .ref(this.getCompleteResourceUrl(params))
      .once('value');

    return this.transform(promise)
      .pipe(
        map(snapshots => {
          const data = [];
          snapshots.forEach((snapshot) => {
            data.push({ ...snapshot.val(), id: snapshot.key });
          });

          return data;
        }),
      );
  }

  listenList (params) {
    const list$ = new ReplaySubject(1);

    this.apiResourceProvider
      .ref(this.getCompleteResourceUrl(params))
      .on(
        'value',
        (snapshots) => {
          const data = [];
          snapshots.forEach((snapshot) => {
            data.push({ ...snapshot.val(), id: snapshot.key });
          });

          list$.next(data);
        },
        (error) => {
          BaseService.catchError(error);
        },
      );

    return list$;
  }

  getItem (id, params) {
    const promise = this.apiResourceProvider
      .ref(this.getCompleteResourceUrl(params, id))
      .once('value');

    return this.transform(promise)
      .pipe(
        map(snapshot => {
          if (!snapshot.exists()) {
            return null;
          }

          return { ...snapshot.val(), id: snapshot.key };
        }),
      );
  }

  listenItem (id, params) {
    const item$ = new ReplaySubject(1);

    this.apiResourceProvider
      .ref(this.getCompleteResourceUrl(params, id))
      .on(
        'value',
        (snapshot) => {
          const data = { ...snapshot.val(), id: snapshot.key };
          item$.next(data);
        },
        (error) => {
          BaseService.catchError(error);
        },
      );

    return item$;
  }
}
