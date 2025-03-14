# This is a comment display component

## Set up environment:

### Backend

- Navigate to backend
- create a python venv with (Python 3.12 preferred)
- Install dependencies:

```sh
    pip install -r requirements.txt
```

- create .env and add you own db information

```txt
PG_USER = "your username"
PG_PASSWORD = "your password"
PG_HOST = "were the data base were hosted" // i.e "localhost:5433"

```

### Frontend

- Navigate to frontend

- Install dependencies:

```sh
 npm install
```

## Run the code:

### Backend

- Navigate to backend
- Start the backend server:

```sh
    python app.py
```

- If you want to reset the database (drop all tables and recreate them using comment.json), run:

```sh
    python app.py --start-over
```

### frontend

- Navigate to frontend
- Start the frontend application:

```sh
    npm run dev
```

- go to the recommend localhost url (normally http://localhost:5173/)

## Notes & Future Improvements

Due to time constraints, I focused on implementing the core functionality. However, there are several areas for improvement:

### backend:

- Implement pagination, filtering, and sorting in the GET /comments API.
- Add data validation (e.g., enforcing a maximum word count for text).
- Improve error handling in API operations to ensure stability.
- ...

### frontend :

- Implement optimistic updates for a smoother user experience.
- Improve error handling for API requests.
- ...
