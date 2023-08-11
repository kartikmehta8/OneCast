const axios = require('axios');

const textController = async (req, res) => {
  const { body } = req.body;

  try {
    // const response = await axios.post(
    //   'https://api.deepai.org/api/text-generator',
    //   {
    //     text: body,
    //   },
    //   {
    //     headers: {
    //       'api-key': process.env.DEEPAI_API_KEY,
    //       'content-type': 'application/x-www-form-urlencoded',
    //     },
    //   }
    // );

    // if (response.status === 200) {
    //   res.send({
    //     success: true,
    //     message: 'Text generated successfully',
    //     data: response.data,
    //   });
    // } else {
    //   res.send({
    //     success: false,
    //     message: 'Text generation failed',
    //     error: response.data,
    //   });
    // }

    res.send({
      success: true,
      message: 'Text generated successfully',
      data: {
        id: '259d43b0-c3f3-4976-b750-8ca8020dca7d',
        output:
          'JavaScript is a popular programming language that is commonly used for creating interactive web pages. It allows for the dynamic updating of HTML and CSS, making it easy to create visually appealing and responsive interfaces. JavaScript is also useful for creating browser-based games, interactive forms, and animated graphics. It can be used both on the front-end and back-end of web development, allowing for both client-side and server-side scripting. With a wide range of libraries and frameworks available, JavaScript is a versatile tool for web developers and continues to evolve with new updates and features.',
      },
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  textController,
};
