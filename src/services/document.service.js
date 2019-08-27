import BaseService from './base.service';
import 'firebase/firestore';

export default class DocumentService extends BaseService {
  baseUrl = '';
  resourceUrl = 'documents';
}
