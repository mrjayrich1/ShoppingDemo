export const environment = {
  production: false,
  isJavaBackend: true,
  apiUrlJava: 'http://localhost:5229/api',
  apiUrlDotNet: 'http://localhost:5228/api',

  get apiUrl(): string {
    return this.isJavaBackend ? this.apiUrlJava : this.apiUrlDotNet;
  }
};