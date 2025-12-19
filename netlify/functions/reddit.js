export async function handler(event) {
  const path = event.path.replace("/.netlify/functions/reddit", "");
  const url = `https://www.reddit.com${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "netlify-proxy",
        Accept: "application/json",
      },
    });

    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
