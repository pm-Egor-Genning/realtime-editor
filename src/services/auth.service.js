import { catchError, flatMap, tap } from 'rxjs/operators';
import BaseService from './base.service';
import { from, of } from 'rxjs';

export default class AuthService extends BaseService {
  _firebaseAuth = null;
  _userService = null;
  _randomNameService = null;
  _user = null;

  constructor (firebaseAuth, userService, randomNameService) {
    super();
    this._firebaseAuth = firebaseAuth;
    this._userService = userService;
    this._randomNameService = randomNameService;
  }

  signInAnonymously () {
    const promise = this._firebaseAuth
      .signInAnonymously();
    return this.transform(promise).pipe(
      tap((data) => {
        this._user = data.user;
      }),
      flatMap((data) => {
        if (!data.user.displayName) {
          return this._setRandomUserDisplayName();
        }
        return of(this._user);
      }),
    );
  }

  _setRandomUserDisplayName () {
    return this._randomNameService
      .getName()
      .pipe(
        catchError(() => {
          const randomId = Math.floor(Math.random() * (101 - 1)) + 1;

          return from(`randomName${randomId}`);
        }),
        flatMap((name) => {
          return this.updateUserDisplayName(name);
        }),
      );
  }

  updateUserDisplayName (name) {
    const promise = this._user.updateProfile({ displayName: name });

    return from(promise)
      .pipe(
        flatMap(() => {
          const data = { uid: this._user.uid, displayName: this._user.displayName };

          return this._userService.save(this._user.uid, data);
        }),
      );
  }

  get user () {
    return this._user;
  }

  handleUserStateChange () {
    return this._firebaseAuth
      .onAuthStateChanged((user) => {
        if (user) {
          this._user = user;
        } else {
          this.signInAnonymously().subscribe();
        }
      });
  }

  signOut () {
    const promise = this._firebaseAuth
      .signOut();

    return this.transform(promise);
  }
}
