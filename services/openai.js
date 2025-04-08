import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// OpenAI 客户端配置
const openai = new OpenAI({
  baseURL: process.env.OPENAI_BASE_URL ,
  apiKey: process.env.OPENAI_API_KEY ,
});

// 系统提示信息
const SYSTEM_PROMPT = `ONLY USE HTML, CSS AND JAVASCRIPT. If you want to use ICON make sure to import the library first. Try to create the best UI possible by using only HTML, CSS and JAVASCRIPT. Use as much as you can TailwindCSS for the CSS, if you can't do something with TailwindCSS, then use custom CSS (make sure to import <script src="https://cdn.tailwindcss.com"></script> in the head). Also, try to ellaborate as much as you can, to create something unique. ALWAYS GIVE THE RESPONSE INTO A SINGLE HTML FILE`;

/**
 * 创建聊天消息数组
 * @param {string} prompt - 用户提示
 * @param {string} previousPrompt - 之前的提示（可选）
 * @param {string} html - 当前的 HTML 代码（可选）
 * @returns {Array} 消息数组
 */
const createChatMessages = (prompt, previousPrompt, html) => {
  const messages = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    }
  ];

  if (previousPrompt) {
    messages.push({
      role: "user",
      content: previousPrompt,
    });
  }

  if (html) {
    messages.push({
      role: "assistant",
      content: `The current code is: ${html}.`,
    });
  }

  messages.push({
    role: "user",
    content: prompt,
  });

  return messages;
};

/**
 * 处理流式响应
 * @param {Response} res - Express 响应对象
 * @param {AsyncGenerator} stream - OpenAI 流式响应
 * @returns {Promise<void>}
 */
const handleStream = async (res, stream) => {
  let completeResponse = "";

  try {
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(content);
        completeResponse += content;

        if (completeResponse.includes("</html>")) {
          break;
        }
      }
    }
    res.end();
  } catch (error) {
    console.error('Stream handling error:', error);
    if (!res.headersSent) {
      // 尝试获取更详细的错误信息
      const errorMessage = error instanceof Error ? error.message : "Error processing stream response";
      const errorDetails = process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined;
      
      res.status(500).send({
        ok: false,
        message: errorMessage,
        details: errorDetails
      });
    } else {
      res.end();
    }
  }
};

/**
 * 创建流式聊天完成
 * @param {Object} params - 参数对象
 * @param {string} params.prompt - 用户提示
 * @param {string} params.previousPrompt - 之前的提示（可选）
 * @param {string} params.html - 当前的 HTML 代码（可选）
 * @param {Response} params.res - Express 响应对象
 */
export const createChatCompletion = async ({ prompt, previousPrompt, html, res }) => {
  try {

    const messages = createChatMessages(prompt, previousPrompt, html);
    const stream = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'deepseek-r1', // 使用 .env 中的模型
      messages: messages,
      stream: true,
    });

    await handleStream(res, stream);
  } catch (error) {
    console.error('OpenAI API Call Error:', error); // 打印完整的错误对象

    if (!res.headersSent) {
      // 尝试从 OpenAI SDK 的错误对象中提取更多信息
      let statusCode = 500;
      let message = "Error connecting to OpenAI API";
      let details = {};

      if (error instanceof OpenAI.APIError) {
        statusCode = error.status || 500;
        message = error.message || `API Error ${statusCode}`;
        details = {
          type: error.type,
          code: error.code,
          param: error.param,
          headers: error.headers,
          apiResponse: error.error // API 返回的具体错误信息
        };
      } else if (error instanceof Error) {
        message = error.message;
        details = { stack: error.stack };
      }
      
      res.status(statusCode).send({
        ok: false,
        message: message,
        details: process.env.NODE_ENV === 'development' ? details : undefined
      });
    } else {
      res.end();
    }
  }
};

export default {
  createChatCompletion,
}; 