import rateLimit from "../src/config/upstash.js";

const ratelimiter = async (req, res, next) => {
  // Add this check at the beginning of the function
  // If the environment is not 'production', skip the rate limit and proceed.
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }

  try {
    // The .limit() method returns an object, so we destructure `success` from it
    const { success } = await rateLimit.limit("my-limit-key");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }

    // IMPORTANT: You must call next() here to pass the request
    // to the next middleware or route handler if the limit is not exceeded.
    next();
    
  } catch (error) {
    // This will still catch errors if they occur in production
    console.log("Rate limit error", error);
    next(); // Fail-open: allow request to proceed if rate limiter service is down
  }
};

export default ratelimiter;