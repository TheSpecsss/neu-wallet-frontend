import "dotenv/config";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.EXPO_PUBLIC_GRAPHQL_URL,
  documents: [
    "./api/graphql/query.ts",
    "./api/graphql/mutation.ts",
  ],
  generates: {
    "./api/graphql/codegen/": {
      preset: "client",
      presetConfig: { gqlTagName: "gql" },
    },
  },
};

export default config;
