export default interface ISession {
  id: string;
  email: string;
  isVerified: boolean;
  access_token: string;
  refresh_token: string;
}
