import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractDocument } from "./abstract.schema";
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    
    protected readonly logger: Logger;

    constructor(protected readonly model: Model<TDocument>){}

    async create(document: Omit<TDocument, '_id'>) : Promise<TDocument>{
        const newDocument = new this.model({
            ...document,
            _id: new Types.ObjectId()
        });
        return (await newDocument.save()).toJSON() as unknown as TDocument;
    }

    async findOne(filterQuery: FilterQuery<TDocument>) : Promise<TDocument>{
        const document = await this.model.findOne(filterQuery, {}, {lean: true}); // {} means no projection. 
        /****
         * In Mongoose, "projection" refers to the process of specifying or limiting the fields that should be returned in the result of a query. When you perform a query using Mongoose, you can use the select method to define which fields you want to include or exclude in the query result.
         * If you see the term "no projection" in the context of Mongoose, it likely means that you are retrieving all fields in the query result without specifying 
         */
        if(!document){
            this.logger.warn('Document not found', filterQuery);
            throw new NotFoundException('Document not found');
        }

        return document as TDocument;
    }

    async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, updatedDocument: UpdateQuery<TDocument>) : Promise<TDocument> {
        const document = await this.model.findOneAndUpdate(filterQuery, updatedDocument, {
            lean: true,
            new: true // returns newly updated document.
        }) as unknown as TDocument;

        if(!document){
            this.logger.warn('Document Not found', filterQuery);
            throw new NotFoundException('Document Not found');
        }

        return document;
    }

    async find(filterQuery: FilterQuery<TDocument>){
        return this.model.find(filterQuery, {}, {lean: true});    
    }

    async findOneDelete(filterQuery: FilterQuery<TDocument>) {
        return this.model.findOneAndDelete(filterQuery, {lean: true});
    }

}