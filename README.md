# Web Application Project with Scraping and Feeds

The application includes services for scraping news and managing feeds. The scraping process runs at server startup, and the data is stored in a mongo db.

## Prerequisites

- **Node.js** (v20+)
- **Docker**
- **Make** 

## Installing Dependencies

### Step 1: Clone the Repository

```bash
git clone https://github.com/simongcs/daily-trends.git
cd daily-trends
```

### Step 2: Install Dependencies

Install the project dependencies using **npm**:

```bash
npm install
```

## Using the `Makefile`

The `Makefile` provides useful commands to manage the application's lifecycle.

### Available Commands:

1. **Install Dependencies**:

   Install the dependencies using the following Makefile command:

   ```bash
   make install
   ```

2. **Run the Server in Development Mode**:

   Start the application in development mode:

   ```bash
   make dev
   ```

3. **Create the Docker Container**:

   Build the Docker image for the application:

   ```bash
   make build
   ```

4. **Run the Docker Container**:

   Start the application inside a Docker container:

   ```bash
   make run
   ```

5. **Run Tests**:

   Run the project's unit tests:

   ```bash
   make test
   ```