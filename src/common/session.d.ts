import 'express-session';

declare module 'express-session' {
  interface SessionData {
    role: string;
    user_id: number;
    admin_id: number;
    level: number;
  }
}
