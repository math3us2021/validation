// import mongoose from "mongoose";
// import { Schema, model, connect } from 'mongoose';
import { Document, Schema, model } from 'mongoose';

export interface Valid extends Document {
    title: string;
    author: string;
    body: string;
    date: Date;
}

const teste = new Schema <Valid>({
    title: String,
    author: String,
    body: String,
    date: { type: Date, default: Date.now }
});


export const Teste = model<Valid>('teste', teste);