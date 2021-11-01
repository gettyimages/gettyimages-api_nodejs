declare module 'gettyimages-api' {
  export interface GettyCustomRequest {
    execute(): Promise<any>
    withRoute(route: string): this
    withMethod(method: string): this
    withQueryParameters(params: { [key: string]: string }): this
  }
  class Getty {
    constructor(props: {
      apiKey?: string
      apiSecret?: string
      username?: string
      password?: string
    })
    customrequest(): GettyCustomRequest
    getAccessToken(): Promise<{ access_token: string }>
  }
  export default Getty
}
