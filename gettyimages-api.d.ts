declare module 'gettyimages-api' {
  export interface GettyApiRequest {
    hostName: string
  }

  export interface CustomRequest extends GettyApiRequest {
    execute(): Promise<any>
    withRoute(route: string): this
    withMethod(method: string): this
    withBody(body: any): this
    withQueryParameters(params: { [key: string]: string }): this
  }
  
  class GettyImagesApi {
    constructor(props: {
      apiKey: string
      apiSecret: string
      username?: string
      password?: string
    }, hostName?: string)
    customrequest(): CustomRequest
    getAccessToken(): Promise<{ access_token: string }>
  }

  export default GettyImagesApi
}
