import { app } from './app';

const port = process.env.NODE_PORT || 4000;

// Start server
app.listen(port, () => console.log(`Server running on port ${port}!`));
