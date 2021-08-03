import { generateUUID } from '@utils'
import { model, Schema } from 'mongoose'

const TemplateSchema = new Schema({
  _id: {
    type: String,
    require: true,
    default: () => generateUUID(),
  },
  logo: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  boards: {
    type: [
      {
        _id: String,
        name: String,
        description: String,
        style: {
          backgroundColor: String,
          color: String,
        },
      },
    ],
    require: true,
  },
  copies: {
    type: Number,
    require: true,
    default: 0,
  },
  views: {
    type: Number,
    require: true,
    default: 0,
  },
})

export const Template = model<ITemplate>('templates', TemplateSchema)

export interface ITemplate {
  _id: string;
  logo: string;
  image: string;
  name: string;
  author: string;
  description: string;
  boards: ITemplateBoard[];
  copies: number;
  views: number;
}

export interface ITemplateBoard {
  _id: string;
  name: string;
  description: string;
  style: {
    backgroundColor: string;
    color: string;
  };
}

export interface ICreateTemplate {
  logo: string;
  image: string;
  name: string;
  author: string;
  description: string;
  boards: ITemplateBoard[];
}

export interface ITemplateParams {
  page?: number;
  limit?: number;
}
