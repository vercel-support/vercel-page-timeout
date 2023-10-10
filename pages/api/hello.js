
export default async function handler(req, res) {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  try {
    await Promise.race([
      delay(64000), // 90 seconds
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 64000)),
      // your function here, e.g. fetching some data
    ]);

    // If the function completes before the timeout, send a successful response
    res.statusCode = 200;
    res.json({ message: 'Successfully executed' });
  } catch (error) {
    // If the function doesn't complete in time, send an error response
    res.statusCode = 500;
    res.json({ message: "Couldn't execute" });
  }
}
