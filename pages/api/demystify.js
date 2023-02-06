// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: req.body.policy })
// }

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const policy = req.body.policy;
    // const prompt = `Generate an array of 3 Javascript objects without the newline character. The first object should have a key that equals ${q1}, the second equals ${q2}, and the third equals ${q3}. Summarize the following context using the keys to generate the corresponding values. This is the context: ${policy}`;
    
    // const prompt = `
    //   Summarize the following text, answering the following questions: What data is being collected? When is the data collected? How can I opt-out?

    //   Generate a JSON list object with q as the key and a as the value. q and a are strings. The value of q is the question, and a is the corresponding answer.

    //   The text is: ${policy}
    // `;

    // const prompt = `Generate an array of 3 Javascript string objects. The first object should have a key that equals What data is being collected?, the second key equals When is the data collected?, and the third key equals How can I opt-out?. Use the keys on the following context to generate the values for each key in summarized form. This is the context: 

    // const prompt = `Summarize the following context answering the following questions: What data is being collected? When is the data collected? How can I opt-out? Generate an array of Javascript objects using each question and answer as a key-value pair.

    // This is the context: ${policy}`;

    // const prompt = `Use the following context to answer these questions: What data is being collected? When is the data collected? How can I opt-out? Use those answers to generate an array containing Javascript objects, assigning each question to the key q and each answer to the key a. 
    
    // This is the context: ${policy}`;

    // const prompt = `Generate an array of Javascript objects where each object has the keys q and a. Add quotes to every key. Assign the following questions to each key, then use them to summarize the provided context. Keep the value a under 60 words.

    // These are the questions to use as keys for each object: What data is being collected? How is my being data used? What are my options for opting-out?
    
    // This is the context: 
    
    // ${policy}`;

    // const prompt = `Javascript. Generate an array of objects like below:

    // [{ "q": "What data is being collected?", "a": ""}, {"q": "How is the data being used?", "a": ""}, {"q": "What are my options for opting-out?", "a": ""}]
    
    // There is also a context:

    // ${policy}
    
    // For each object, generate concise (30 words or less) answers for the key a by using the question in key q on the provided the context. Show the completed array.`;

    const prompt = `Privacy policies are documents that explain how a company handles user data and what a user's rights are in regards to their data. You will be analyzing privacy policies and explaining what data is being collected, how the data is being used, and what the options are available for users who want to opt-out of the collection or monetization of their data. You have 65 words to use for each explanation. If an explanation exceeds 65 words, you will rewrite it to be under 65 words. Your answer will be formatted as a Javascript array of objects, where the value of each key "a" will be the summary that corresponds to the question in key "q". If you have enough information to answer each question, and if you are sure the provided context is a privacy policy, then use the following array and return the completed one as the answer:

    [{ "q": "What data is being collected?", "a": ""}, {"q": "How is the data being used?", "a": ""}, {"q": "What are my options for opting-out?", "a": ""}]
    
    Otherwise, if you do not have enough information to answer a question, or you do not think that the provided context is a privacy policy, you will respond with the following:
    
    [{ "q": "Incomplete Data", "a": "More information needed. Please add more or retry with a different policy."}] 
    
    Please analyze the following policy:
    
    ${policy}`;

    const payload = {
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 256,
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

    /* completion comes with extra text and newlines so we clean it up here */
    const { choices } = await apiRes.json();
    // console.log(choices);
    // const { apiData } = await apiRes.json();
    const { text } = choices[0];
    // console.log(text);
    // const data = await apiRes.json();
    // console.log(data);
    // const apiData = text.trim().replace(/Array of Javascript Objects: /, "");
    // const apiData = text.trim().replace(/^[^\[]*/, "");
    const apiData = text.replace(/^[^\[]*/, "");
    console.log(apiData);
    // console.log(`from server: ${apiData}`);

    // res.status(200).json({ data: apiData});
    res.status(200).json({ data: JSON.stringify(apiData)});
  } else {
    res.status(200).json({ message: 'No data' });
  }
  // extract input from request sent to server
  // const { policy } = await req.json();
  // const policy = req.body.policy;
  // res.status(200).json({ data: policy });

  // const prompt = `
  // Summarize the following text, answering the following questions: What data is being collected? When is the data collected? How can I opt-out?

  // Generate a JSON list object with q as the key and a as the value. q and a are strings. The value of q is the question, and a is the corresponding answer.

  // The text is: ${policy}
  // `;

  // const payload = {
  //   model: "text-davinci-003",
  //   prompt,
  //   temperature: 0.7,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  //   max_tokens: 200,
  //   stream: false,
  //   n: 1
  // };

  // const apiRes = await fetch('https://api.openai.com/v1/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`
  //   },
  //   body: JSON.stringify(payload)
  // });

  // const apiData = await apiRes.json();
  // const results = JSON.parse(apiData);
  // console.log(`results from api: ${apiData}`)

  // return new Response(JSON.stringify({ data: results }))
}

export default handler;
