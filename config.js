/**
 * Created by hichri on 8/17/17.
 */
const env = process.env;


export default {
    port: env.PORT || 3000,
    host: env.HOST || '0.0.0.0',
    get serverURL(){
        return `http://${this.host}:${this.port}`
    }
}