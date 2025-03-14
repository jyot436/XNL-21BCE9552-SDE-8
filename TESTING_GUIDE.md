# 🧪 Testing Guide  

## 📌 Overview  
This guide explains the testing strategy for the project, including unit, integration, and end-to-end (E2E) testing.  

## 🛠️ Tools & Frameworks Used  
| Test Type   | Framework / Tool |
|------------|----------------|
| Unit Tests | JUnit (Java), Jest (JavaScript) |
| Integration Tests | Mockito (Java), Supertest (Node.js) |
| End-to-End Tests | Cypress, Selenium |
| Code Coverage | JaCoCo, Istanbul |
| CI/CD Testing | GitHub Actions |

---

## 1️⃣ **Unit Testing**  
### ✅ **Purpose:**  
- Tests **individual functions** in isolation.  
- Ensures that **small code units** work correctly.  

### 🔹 **Example (Java - JUnit 5)**
```java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class CalculatorTest {
    @Test
    void testAddition() {
        Calculator calc = new Calculator();
        assertEquals(10, calc.add(5, 5));
    }
}
🚀 Run Unit Tests
Java (Maven): mvn test
Node.js: npm test
2️⃣ Integration Testing
✅ Purpose:
Tests how different modules interact with each other.
Ensures database/API layers work correctly.
🔹 Example (Java - Spring Boot & Mockito)
java
Copy
Edit
@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private UserService userService;

    @Test
    public void testGetUsers() throws Exception {
        mockMvc.perform(get("/users"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(2));
    }
}
🔹 Example (Node.js - Supertest)
javascript
Copy
Edit
const request = require('supertest');
const app = require('../server');

describe('GET /users', () => {
    it('should return all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2);
    });
});
🚀 Run Integration Tests
Java (Maven): mvn verify
Node.js: npm run test:integration
3️⃣ End-to-End (E2E) Testing
✅ Purpose:
Simulates real user interactions with the application.
Ensures the entire system functions correctly.
🔹 Example (Cypress)
javascript
Copy
Edit
describe('User Login', () => {
    it('should login successfully', () => {
        cy.visit('/login');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
    });
});
🚀 Run E2E Tests
Cypress: npx cypress open
Selenium: mvn test -Dtest=E2ETests
4️⃣ Code Coverage
✅ Purpose:
Measures how much of the code is tested.
Ensures that important parts of the application are covered.
🚀 Run Coverage Reports
Java (JaCoCo): mvn clean verify
Node.js (Istanbul): npm run test:coverage
5️⃣ Automating Tests in CI/CD
Testing is automated using GitHub Actions. Below is a sample workflow:

yaml
Copy
Edit
name: Run Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install Dependencies
        run: npm install
      - name: Run Tests
        run: npm test
      - name: Run Integration Tests
        run: npm run test:integration
      - name: Run E2E Tests
        run: npx cypress run
      - name: Upload Test Coverage
        uses: codecov/codecov-action@v3
🎯 Summary
Test Type	Purpose	Command
Unit Testing	Tests individual functions	mvn test / npm test
Integration Testing	Tests module interactions	mvn verify / npm run test:integration
E2E Testing	Simulates real user interactions	npx cypress run
Code Coverage	Measures test coverage	npm run test:coverage