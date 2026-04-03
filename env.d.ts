declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * Pi Sandbox HTTP API base URL including stage path (e.g. `https://xxx.execute-api.ap-south-1.amazonaws.com/api`).
     * No trailing slash. Matches API Gateway invoke URL + stage (`/api`).
     */
    NEXT_PUBLIC_SANDBOX_API_URL?: string;
  }
}
