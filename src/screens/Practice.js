import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Practice = () => {

    const generateInvoice = async () => {

        try {
            // Generate PDF
            const pdfOptions = {
                html: htmlContent,
                fileName: 'colortuff_invoice',
                directory: 'Documents',
            };

            const pdf = await RNHTMLtoPDF.convert(pdfOptions);
            const pdfPath = pdf.filePath;

            console.log(pdfPath);

            // Share the PDF
            const shareOptions = {
                title: 'Share Invoice',
                url: `file://${pdfPath}`,
                type: 'application/pdf',
                saveToFiles: true,
            };

            await Share.open(shareOptions);
        } catch (error) {
            console.error(error);
        }
    };

    const htmlContent = `
<!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, user-scalable=yes">
  <style>
    body {
      color: black;
      padding: 20px;
      background-color: white;
      font-family: Arial, sans-serif;
      font-size: 8px;
    }

    h6 {
      font-size: 8px;
      margin: 0;
      font-weight: 500;
    }

    p {
      font-size: 8px;
      margin: 0;
    }

    em {
      font-style: italic;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 10px;
    }

    .header img {
      height: 25px;
      width: 70px;
      object-fit: contain;
      margin-right: 10px;
    }

    .header h6 {
      text-align: center;
      margin: 0;
    }

    .address {
      text-align: center;
      margin: 0;
      font-weight: 400;
      font-size: 7px;
      margin-top: 0.5px;
    }

    .party-info {
      margin-top: 10px;
    }

    .party-info h6 {
      font-weight: 400;
      margin-top: 2px;
    }

    .table {
      margin-top: 10px;
      width: 100%;
      border-collapse: collapse;
    }

    .table th, .table td {
      border: 0.5px solid black;
      padding: 5px;
      text-align: center;
    }

    .table th {
      background-color: #5bda49;
    }

    .note {
      margin-top: 10px;
    }

    .note h5 {
      font-weight: 500;
      margin-bottom: 1px;
    }

    .signature {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>

<body>

  <div class="container">
    <div class="header">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzKTWxwQYlE-bvvFw7cb3WLvV-sx_A-XXzdK5HrixwRw&s">
      <div>
        <h6>COLOURTUFF+</h6>
        <h6>(A Product Of POOJA ROOFING CO.(MFG))</h6>
      </div>
    </div>
      
    <p class="address">ADDRESS:- MAYFAIR BUILDING, 1ST FLOOR, LALGANESH LOKHRA ROAD, OPP. HANUMAN MANDIR</p>
    <p class="address">DISTRICT:- KAMRUP(M),GUWAHATI , ASSAM PIN CODE:- 781034</p>
    <p class="address">E Mail: poojaroofingco.mfg@gmail.com</p>
    <p class="address">Phone No.  0361-3102688</p>
  </div>

  <div class="container">
    <div class="header">
      <div>
        <h6>REF.NO:-</h6>
        <em>PRCM/24-25/098</em>
      </div>
      <p>${currentDate.toLocaleDateString()}</p>
    </div>
    
    <div>
      <p><em>Sales Person-:</em> Anil Beniwal</p>
    </div>

    <div class="party-info">
      <h6>ESTIMATE</h6>
      <em>PARTY: ${name}</em>
      <h6>Site: ${site}</h6>
    </div>

    <div class="party-info">
      <h6>PAN: <em>${pan}</em></h6>
      <h6>Contact No.: <em>${contact}</em></h6>
      <h6>GSTIN: <em>${gstin}</em></h6>
    </div>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th>Material (Hi-rib)</th>
        <th>Thick (mm)</th>
        <th>Width</th>
        <th>Length</th>
        <th>No.of Pcs</th>
        <th>Quantity</th>
        <th>Rate (In Rs.)</th>
        <th>Amount (In Rs.)</th>
      </tr>
    </thead>
    <tbody>
      ${generateTableRows()}
    </tbody>
  </table>

  <div class="container">
    <div class="header">
      <div>
        <h6>Loading Charges</h6>
        <p><em>₹${loadingCharge}.00</em></p>
      </div>
      <div>
        <h6>Bend Charges</h6>
        <p><em>₹${bendCharge}.00</em></p>
      </div>
      <div>
        <h6>Transport Charges</h6>
        <p><em>₹${transportCharge}.00</em></p>
      </div>
    </div>
  </div>
      
  <div class="container">
    <div class="header">
      <h6>Total amount to be paid</h6>
      <p><em>₹${indianNumberFormat(calculateTotalPrice())}</em></p>
    </div>
    <p>(Rupees ${numberToWords(calculateTotalPrice())} Only)</p>
  </div>

  <div class="note">
    <h5>Note:</h5>
    <h5>Terms & conditions:-</h5>
    <p>1. Prices are inclusive of GST</p>
    <p>2. Prices are based on ex-factory at Changsari, Assam</p>
    <p>3. Payment Terms: 100% in Advance</p>
    <p>4. Rates are subject to change without any Prior Information.</p>
    <div>
      <p>5. FOR BANK DETAILS:- Name: Pooja Roofing Co. (MFG) A/C NO: 41122724588 (STATE BANK OF INDIA,)</p>
      <p>IFSC CODE: SBIN0013246 (Traders Branch Fancy Bazar)</p>
    </div>
    <p>6. Transportation: Client's Own Arrangement / To Pay Basis</p>
    <p>7. The above Rates are valid for 7 Days</p>
  </div>

  <div class="signature">
    <div>
      <h6>For Pooja Roofing Co. (MFG)</h6>
      <p>Authorized Signatory</p>
    </div>
    <div>
      <h6>For ${name}</h6>
      <p>Authorized Signatory</p>
    </div>
  </div>

</body>

</html>
    `;
    
    return (
        <View>
            <Text>Practice</Text>
        </View>
    )
}

export default Practice

const styles = StyleSheet.create({})