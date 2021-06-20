interface ICreateNoticeDTO {
  id: string;
  user_id: string;
  name: string;
  body: string;
  timestamp: string;
  apartment: string;
  tag: string;
  sender: string;
}

export { ICreateNoticeDTO };
