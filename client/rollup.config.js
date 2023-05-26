import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

dotenv.config();

export default {

  
  plugins: [
    
    replace({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
    }),
  ],
};
