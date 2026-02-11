import OpenAI from 'openai'
import { GROQ_KEY } from './constant'
//initialising the open Ai
const client = new OpenAI({
  apiKey:GROQ_KEY,
  dangerouslyAllowBrowser: true,
  baseURL: 'https://api.groq.com/openai/v1',
})
export default client
