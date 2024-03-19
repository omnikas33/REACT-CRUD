import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import ExcelJS from 'exceljs';
import fs from 'fs';
import PDFDocument from 'pdfkit';
const app = express();


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'Xaybzc@5533',
    database: 'contacts'
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        process.exit(1); // Exit the process if unable to connect to database
    }
    console.log('Connected to MySQL database');
});

// Function to fetch all contacts
app.get('/', (req, res) => {
    const sql = "SELECT * FROM Ccontacts"; // Correct table name
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching contacts from database:', err);
            return res.status(500).json({ error: "An error occurred while fetching contacts." });
        }
        return res.json(result);
    });
});

// Function to insert a new contact
app.post('/contacts', (req, res) => {
    const { firstname, lastname, email } = req.body;
    const sql = "INSERT INTO Ccontacts (firstname, lastname, email) VALUES (?, ?, ?)";
    const values = [firstname, lastname, email];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting contact into database:", err);
            return res.status(500).json({ error: "An error occurred while inserting contact." });
        }
        console.log("Contact inserted successfully:", result);
        return res.status(200).json({ success: "Contact inserted successfully." });
    });
});

// Function to fetch a contact by firstname
app.get('/read/:firstname', (req, res) => {
    const firstname = req.params.firstname;
    const sql = "SELECT * FROM Ccontacts WHERE firstname = ?";
    db.query(sql, [firstname], (err, result) => {
        if (err) {
            console.error('Error fetching contact from database:', err);
            return res.status(500).json({ error: "An error occurred while fetching contact." });
        }
        return res.json(result);
    });
});

// Function to update a contact by firstname
app.put('/update/:firstname', (req, res) => {
    const firstname = req.params.firstname;
    const { lastname, email } = req.body;
    const sql = 'UPDATE Ccontacts SET lastname = ?, email = ? WHERE firstname = ?';
    const values = [lastname, email, firstname];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating contact in database:', err);
            return res.status(500).json({ error: "An error occurred while updating contact." });
        }
        return res.json(result);
    });
});

// Function to delete a contact by firstname
app.delete('/delete/:firstname', (req, res) => {
    const firstname = req.params.firstname;
    const sql = "DELETE FROM Ccontacts WHERE firstname = ?";
    db.query(sql, [firstname], (err, result) => {
        if (err) {
            console.error('Error deleting contact from database:', err);
            return res.status(500).json({ error: "An error occurred while deleting contact." });
        }
        return res.json(result);
    });
});

// Endpoint to export data to Excel
app.get('/export-to-excel', (req, res) => {
    const sql = "SELECT * FROM Ccontacts";
    db.query(sql, (err, rows) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            return res.status(500).json({ error: "An error occurred while fetching data." });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Ccontacts');

        const headerRow = ["ID", "First Name", "Last Name", "Email"];
        worksheet.addRow(headerRow);

        rows.forEach(row => {
            worksheet.addRow([row.ID, row.firstname, row.lastname, row.email]);
        });

        const filePath = 'contacts.xlsx';
        workbook.xlsx.writeFile(filePath)
            .then(() => {
                res.download(filePath, 'contacts.xlsx', err => {
                    if (err) {
                        console.error('Error downloading Excel file:', err);
                        res.status(500).json({ error: "An error occurred while downloading Excel file." });
                    }
                    fs.unlinkSync(filePath); // Delete the temporary file after download
                });
            })
            .catch(error => {
                console.error('Error generating Excel file:', error);
                res.status(500).json({ error: "An error occurred while generating Excel file." });
            });
    });
});

// Endpoint to export data to PDF
app.get('/export-to-pdf', (req, res) => {
    const sql = "SELECT * FROM Ccontacts";
    db.query(sql, (err, rows) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            return res.status(500).json({ error: "An error occurred while fetching data." });
        }

        const doc = new PDFDocument();

        doc.pipe(res); // Send PDF content directly to response

        doc.fontSize(12).text('Contacts:', { align: 'center' }).moveDown(0.5);
        rows.forEach(row => {
            doc.text(`${row.ID}, ${row.firstname}, ${row.lastname}, ${row.email}`);
        });
        doc.end();
    });
});

// Start the server
const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});


