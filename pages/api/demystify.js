// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: req.body.policy })
// }

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const content = req.body.content;

    const prompt = `Privacy policies are documents that explain how a company handles user data and what a user's rights are in regards to their data. You will be analyzing privacy policies and explaining what data is being collected, how the data is being used, and what options are available for users who want to opt-out of the collection or monetization of their data. There will be two parts to this request. There will be two parts to this request. First, please determine if the following context is a privacy policy:

    The context:
    
    ${content}

    Second, if the above context is a privacy policy, answer with the array below. Your answer will be a Javascript array of objects, where the value of each key "a" will be the explanation that corresponds to the question in key "q". You have 45 words to use for each explanation. If an explanation exceeds 45 words, you will rewrite it to be under 45 words. 

    The array to use:
    
    [{ "q": "What data is being collected?", "a": ""}, {"q": "How is the data being used?", "a": ""}, {"q": "What are my options for opting-out?", "a": ""}]
    
    Otherwise, if you do not have enough information to answer a question, or you do not think that the provided context is a privacy policy, you will respond with the following:
    
    [{ "q": "What data is being collected?", "a": "More information needed. Please retry with different content or use a different policy."}, {"q": "How is the data being used?", "a": "More information needed. Please retry with different content or use a different policy."}, {"q": "What are my options for opting-out?", "a": "More information needed. Please retry with different content or use a different policy."}]`;
    
    const payload = {
      model: "text-davinci-003",
      prompt,
      temperature: 0.2,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 512,
      stream: false,
      n: 1
    };

    const apiRes = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`
      },
      body: JSON.stringify(payload)
    });

    const { choices } = await apiRes.json();
    const { text } = choices[0];
    const apiData = text.replace(/^[^\[]*/, ""); /* completion comes with extra text and newlines so we clean it up here */
    // console.log(apiData);
    res.status(200).json({ data: JSON.stringify(apiData)});
  } else {
    res.status(200).json({ message: 'No data' });
  }
}

export default handler;
