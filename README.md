
# **Geospatial Query System**

This project implements a geospatial query system using **NestJS** and **MongoDB**. It allows you to manage city boundaries and documents with geospatial data. The application demonstrates how to use MongoDB's geospatial features for CRUD operations and querying.

---

## **Features**

- Manage city boundaries stored as GeoJSON polygons.
- Perform CRUD operations on documents with geospatial data (GeoJSON points).
- Query documents within specified city boundaries using `$geoWithin`.
- API documentation with **Swagger**.
- Unit and End-to-End (E2E) tests.
- MongoDB integration for production and in-memory database for testing.

---

## **Project Structure**

```plaintext
geospatial-query-system/
├── src/
│   ├── city/
│   │   ├── dtos/
│   │   │   ├── create-city.dto.ts
│   │   │   └── update-city.dto.ts
│   │   ├── schemas/
│   │   │   └── city.schema.ts
│   │   ├── city.controller.ts
│   │   ├── city.service.ts
│   │   └── city.module.ts
│   ├── document/
│   │   ├── dtos/
│   │   │   ├── create-document.dto.ts
│   │   │   └── update-document.dto.ts
│   │   ├── schemas/
│   │   │   └── document.schema.ts
│   │   ├── document.controller.ts
│   │   ├── document.service.ts
│   │   └── document.module.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
│   └── app.e2e-spec.ts
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

---

## **Tech Stack**

- **Backend**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **API Documentation**: Swagger (accessible at `/api/docs`)
- **Testing**: Jest, Supertest, and mongodb-memory-server

---

## **Getting Started**

### **1. Prerequisites**

Ensure you have the following installed:
- Node.js (v16+)
- MongoDB Atlas (or local MongoDB instance)
- Yarn (optional but recommended)

---

### **2. Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/geospatial-query-system.git
   cd geospatial-query-system
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the project root:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   PORT=3000
   ```

---

### **3. Running the Application**

1. Start the development server:
   ```bash
   npm run start:dev
   ```

2. Access the Swagger API documentation:
   - URL: `http://localhost:3000/api/docs`

---

### **4. Running Tests**

1. Run unit tests:
   ```bash
   npm run test
   ```

2. Run E2E tests:
   ```bash
   npm run test:e2e
   ```

---

## **API Endpoints**

### **City Endpoints**
- **POST /cities**: Create a new city with boundary data.
- **GET /cities**: Fetch all cities.
- **GET /cities/:id**: Fetch a city by ID.
- **PATCH /cities/:id**: Update a city's boundary or name.
- **DELETE /cities/:id**: Delete a city.

### **Document Endpoints**
- **POST /documents**: Create a new document.
- **GET /documents**: Fetch all documents.
- **GET /documents/:id**: Fetch a document by ID.
- **PATCH /documents/:id**: Update a document.
- **DELETE /documents/:id**: Delete a document.
- **POST /documents/within-city**: Fetch documents within a specified city boundary.

---

## **Sample Data**

### City Data
```json
{
  "name": "New York City",
  "boundary": {
    "type": "Polygon",
    "coordinates": [
      [
        [-74.25909, 40.477399],
        [-73.700272, 40.916178],
        [-73.935242, 40.73061],
        [-74.25909, 40.477399]
      ]
    ]
  }
}
```

### Document Data
```json
{
  "name": "Central Park",
  "type": "landmark",
  "location": {
    "type": "Point",
    "coordinates": [-73.965355, 40.782865]
  }
}
```

---

## **Testing Strategy**

1. **Unit Tests**:
   - Tests for `CityService` and `DocumentService` business logic.
   - Mocked MongoDB models using `jest`.

2. **E2E Tests**:
   - Tests for API endpoints using `supertest`.
   - In-memory MongoDB with `mongodb-memory-server`.

---

## **Deployment**

### **1. Hosting Platforms**
- **Heroku**
- **AWS**
- **Vercel**

### **2. Deployment Steps**
1. Push the repository to GitHub.
2. Link the repository to the hosting platform.
3. Add the required environment variables (e.g., `MONGO_URI`, `PORT`).
4. Deploy the application.

---

## **Future Enhancements**

1. **Pagination and Sorting**:
   - Add pagination for fetching large datasets.
   - Allow sorting by `name` or `type`.

2. **Filters**:
   - Query documents by `type` (e.g., `landmark`, `museum`).

3. **Authentication**:
   - Add user authentication for secured endpoints.

---

## **Contributing**

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your fork and submit a pull request.

---

## **License**
This project is licensed under the MIT License.
