import mongoose from 'mongoose';
import 'dotenv/config';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
mongoose.connect(process.env.URI as string).then((value) => {
  console.log(`DB connected: Version ${value.version}`);
});

export { mongoose };
