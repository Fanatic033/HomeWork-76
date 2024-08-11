export interface IMessage {
  id: string;
  message: string;
  author: string;
  datetime: string;
}

export interface messageMutation {
  message: string;
  author: string;
}