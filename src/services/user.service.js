import BaseService from './base.service';
import 'firebase/firestore';

export default class UserService extends BaseService {
  baseUrl = '';
  resourceUrl = 'users';
}
