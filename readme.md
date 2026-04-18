# Project Setup
- Open the folder containing the three projects, not the workspace.

# 🚀 .NET Backend
## Running the application
- Navigate to **Run and Debug** and select "Run .Net Backend".
- Press the green **Play** button.

## Installing Dependencies
Dependencies should install automatically. However, this project requires the **[.NET 10 SDK](https://microsoft.com)**.
- Check your version: `dotnet --list-sdks`
- If you don't have version `10.x` installed, download it from the official [.NET Download Page](https://microsoft.com).

## Using Swagger
- Navigate to: `http://localhost:5228/swagger/index.html`

---

# ☕ Java Backend
## Running the application
- Navigate to **Run and Debug** and select "Run Springboot Backend".
- Press the green **Play** button.

## Installing Dependencies
Dependencies are typically managed automatically by your IDE.
- **Java Version:** This project is configured for **Java 21**. 
- **Version Mismatch:** If you need to use a different version, update line 30 of the `pom.xml` to match your local Java version.
- **System Config:** Ensure your `JAVA_HOME` environment variable is updated if you install a newer Java version.

## Using Swagger
- Navigate to: `http://localhost:5229/swagger-ui/index.html`

---

# 🅰️ frontend-angular

## Installing Dependencies
- **Node.js:** Ensure you have Node.js installed ([nodejs.org](https://nodejs.org)).
- **Navigate to the folder:**  
   `cd frontend-angular`
- **Install the packages:**  
   `npm install`

## Running the application
- Open a terminal window (`Ctrl` + `` ` ``).
- Start the development server by running:  
  `ng serve`
- Navigate to: [http://localhost:4200](http://localhost:4200) 
- *(Hint: Hold **Ctrl** and **Left Click** the link in your terminal to open it directly.)*
- To change backend services change environment variable **isJavaBackend** from true to false (or vice versa) in environment.development.ts

---

## 🏁 Service Summary
| Service | Port | Local Link |
| :--- | :--- | :--- |
| **.NET Backend** | 5228 | [Swagger UI](http://localhost:5228/swagger/index.html) |
| **Java Backend** | 5229 | [Swagger UI](http://localhost:5229/swagger-ui/index.html) |
| **Angular Frontend** | 4200 | [Localhost](http://localhost:4200) |