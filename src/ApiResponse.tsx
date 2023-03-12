export default interface IApiResponse {
  status: string,
  module?: string,
  data: Record<string, unknown> | string[]
}