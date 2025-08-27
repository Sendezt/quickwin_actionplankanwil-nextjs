// test-connection.js
const mysql = require("mysql2/promise");

async function testConnection() {
  try {
    console.log("🔌 Testing connection to Hostinger MySQL...");

    const connection = await mysql.createConnection({
      host: "srv1866.hstgr.io", // atau '153.92.15.63'
      user: "u479819574_Databasetest1",
      password: "Databasetest1",
      database: "u479819574_Databasetest1",
      port: 3306,
      connectTimeout: 60000,
      acquireTimeout: 60000,
      timeout: 60000,
    });

    console.log("✅ Connected successfully!");

    // Test query
    const [rows] = await connection.execute("SELECT 1 as test");
    console.log("📊 Test query result:", rows);

    await connection.end();
    console.log("🔐 Connection closed");
  } catch (error) {
    console.error("❌ Connection failed:");
    console.error("Code:", error.code);
    console.error("Message:", error.message);

    if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.log("💡 Check username/password");
    }
    if (error.code === "ER_HOST_NOT_PRIVILEGED") {
      console.log("💡 Add your IP to Remote Database access list in cPanel");
    }
    if (error.code === "ECONNREFUSED") {
      console.log("💡 Check hostname and port");
    }
  }
}

testConnection();
