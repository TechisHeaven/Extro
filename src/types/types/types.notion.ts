import {
  DatabaseObjectResponse,
  PartialDatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

type EmptyObject = Record<string, never>;

type TitleDatabasePropertyConfigResponse = {
  type: "title";
  title: EmptyObject;
  id: string;
  name: string;
  description: string | null;
};

type EmailDatabasePropertyConfigResponse = {
  type: "email";
  email: EmptyObject;
  id: string;
  name: string;
  description: string | null;
};

export interface DatabaseResponseType
  extends PartialDatabaseObjectResponse,
    DatabaseObjectResponse {
  properties: {
    name: TitleDatabasePropertyConfigResponse;
    email: EmailDatabasePropertyConfigResponse;
  };
}
