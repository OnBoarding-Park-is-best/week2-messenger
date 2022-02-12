export interface UserType {
  userId: string;
  userName: string;
  profileImage: string;
}

export interface MessageType extends UserType {
  messageId: string;
  content: string;
  date: Date;
}
