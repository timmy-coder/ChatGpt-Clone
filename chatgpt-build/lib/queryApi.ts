import openai from "./chatgpt";
import {OpenAI} from "openai";

const query = async (prompt: string, chatId: string, model: string) => {
    // const params: OpenAI.Chat.CompletionCreateParams = {
    //     model,
    //     messages: [{content: prompt, role: 'user'}],
    //     temperature: 0.9,
    //     top_p: 1,
    //     max_tokens: 1000,
    //     frequency_penalty: 0,
    //     presence_penalty: 0,
    //   };
      // const res: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params).then (res => res.choices[0])?.catch(err => `Chatgpt is unable to log data: ${err.message}`)
    const res = await openai.chat.completions.create({
        model,
        messages: [{content: prompt, role: 'user'}],
        temperature: 0.9,
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0,
}).then (res => res.choices[0])?.catch(err => `Chatgpt is unable to log data: ${err.message}`)

return res
}
export default query