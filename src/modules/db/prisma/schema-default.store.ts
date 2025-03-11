import * as dotenv from 'dotenv';
dotenv.config();

export class SchemaDefaultStore {
  private static _schema: string = process.env.DEFAULT_SCHEMA as string;
  private static _validSchemaPattern = /^[a-zA-Z][a-zA-Z0-9_]*$/;

  private constructor() {}

  public static getSchema(): string {
    return this._schema;
  }

  public static setSchema(schema: string) {
    if (!this._validSchemaPattern.test(schema)) {
      throw new Error('invalid name schema');
    }
    this._schema = schema;
  }

  public static isValidSchema(schema: string): boolean {
    return this._validSchemaPattern.test(schema);
  }
}
