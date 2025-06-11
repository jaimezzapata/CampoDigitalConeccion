import{config} from 'dotenv';
config();
console.log(process.env.hello)

export default {
    port : process.env.PORT || 4000
}