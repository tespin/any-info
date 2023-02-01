// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

const handler = async (req, res) => {
  // extract input from request sent to server
  const { policy } = await req.json();

  // if nothing was pasted
  if (!policy) {
    return new Response('Input is empty', { status: 400 });
  }

  const prompt = `
  Summarize the following text, answering the following questions: What data is being collected? When is the data collected? How can I opt-out?

  Generate a JSON list object with q as the key and a as the value. q and a are strings. The value of q is the question, and a is the corresponding answer.

  The text is: ${policy}
  `
}