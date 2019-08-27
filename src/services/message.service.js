import BaseService from './base.service';
import 'firebase/firestore';

export default class MessageService extends BaseService {
  baseUrl = '';
  resourceUrl = 'chats/{documentId}/messages';
}
