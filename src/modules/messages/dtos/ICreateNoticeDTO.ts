interface ICreateNoticeDTO {
  id?: string;
  user_id: string;
  name: string;
  body: string;
  timestamp: number;
  apartment: string;
  tag: string;
  sender: string;
}

export { ICreateNoticeDTO };
