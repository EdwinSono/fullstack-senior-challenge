import serverless from "serverless-http";
import { api } from "./interfaces/api";

export const handler = serverless(api);
