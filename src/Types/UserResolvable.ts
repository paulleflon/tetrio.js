import UserInfo from '../Interfaces/UserInfo';
import User from '../Structures/User';

/**
 * Object that can be resolved to a User. It can be either:
 *  - A MongoID
 *  - A username
 *  - A User object
 *  - A UserInfo object (must contain either the id or the username)
 */
export type UserResolvable = string | User | UserInfo;