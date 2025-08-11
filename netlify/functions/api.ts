import serverless from "serverless-http";

import { createServer } from "../../api";

export const handler = serverless(createServer());
