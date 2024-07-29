export default interface Accounts {
  id: string;
  name: string;
  plaidId: string;
  userId: string;
  description?: string;
  imageUrl?: string;
  createAt: Date;
  updateAt: Date;
}
