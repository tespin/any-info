// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: req.body.policy })
// }

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const policy = req.body.policy;

    const q1 = 'What data is being collected?';
    const q2 = 'When is the data collected?';
    const q3 = 'How can I opt-out?';
    // const prompt = `Generate an array of 3 Javascript objects without the newline character. The first object should have a key that equals ${q1}, the second equals ${q2}, and the third equals ${q3}. Summarize the following context using the keys to generate the corresponding values. This is the context: ${policy}`;
    
    // const prompt = `
    //   Summarize the following text, answering the following questions: What data is being collected? When is the data collected? How can I opt-out?

    //   Generate a JSON list object with q as the key and a as the value. q and a are strings. The value of q is the question, and a is the corresponding answer.

    //   The text is: ${policy}
    // `;

    // const prompt = `Generate an array of 3 Javascript string objects. The first object should have a key that equals What data is being collected?, the second key equals When is the data collected?, and the third key equals How can I opt-out?. Use the keys on the following context to generate the values for each key in summarized form. This is the context: 

    const prompt = `Summarize the following context answering the following questions: What data is being collected? When is the data collected? How can I opt-out? Generate an array of Javascript objects using each question and answer as a key-value pair.

    This is the context: ${policy}`

    const payload = {
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 200,
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

    const apiData = await apiRes.json();

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
