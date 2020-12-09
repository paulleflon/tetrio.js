/** 
 * A user's role in the game. It can be eiter:
 *  - `anon` - An anonymous player
 *  - `user` - A regular player
 *  - `bot` - A bot 
 *  - `mod` - A TETR.IO moderator
 *  - `admin` - A TETR.IO administrator  
 */
export type UserRole = 'anon' | 'user' | 'bot' | 'mod' | 'admin';