interface IResponse {
    message: string
    statusCode?: number
    reasonStatusCode?: string
    metadata: any
}

export default IResponse
