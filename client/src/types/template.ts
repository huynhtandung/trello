export interface Template {
  _id: string;
  logo: string;
  image: string;
  name: string;
  author: string;
  description: string;
  boards: TemplateBoard[];
  copies: number;
  views: number
}

export interface TemplateBoard {
  name: string;
  description: string;
  style: {
    backgroundColor: string;
    color: string
  }
}

export interface TemplateParams {
  page?: number;
  limit?: number
}

export interface AddBoardStatus {
  index: number;
  name: string;
  backgroundColor?: string;
  isEdit?: boolean
}