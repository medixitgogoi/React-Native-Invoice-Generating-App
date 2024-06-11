import { StyleSheet, Text, View } from 'react-native';

const arr =
    [
        {
            "color": "Red",
            "id": "1717652712149jzltw7h",
            "lengthAndPieces": [
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                },
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                },
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                }
            ],
            "rate": "12",
            "thickness": "0.30 mm",
            "type": "Profile Sheet",
            "unit": "mm",
            "width": "3.5 mm",
        },
        {
            "color": "Red",
            "id": "1717652712149jzltw7h",
            "lengthAndPieces": [
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                },
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                },
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                }
            ],
            "rate": "12",
            "thickness": "0.30 mm",
            "type": "Profile Sheet",
            "unit": "mm",
            "width": "3.5 mm",
        },
        {
            "color": "Red",
            "id": "1717652712149jzltw7h",
            "lengthAndPieces": [
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                },
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                },
                {
                    "id": "1717652694247mxa2ye5",
                    "length": "23",
                    "pieces": "47",
                },
                {
                    "id": "1717652698699n09qsrp",
                    "length": "13",
                    "pieces": "26"
                },
                {
                    "id": "1717652704939em80bw4",
                    "length": "25",
                    "pieces": "48"
                }
            ],
            "rate": "12",
            "thickness": "0.30 mm",
            "type": "Profile Sheet",
            "unit": "mm",
            "width": "3.5 mm",
        },
    ]

const Practice2 = () => {

    const generateTableRows = () => {
        return `
            <table style="width: 100%; border-collapse: collapse; margin-top: 2px; margin-bottom: 2px;">
                ${billDetails.map((item, itemIndex) => {
                    // Calculate totals for this item
                    const totalPieces = item.lengthAndPieces.reduce((sum, lp) => sum + lp.pieces, 0);
                    const totalQuantity = item.lengthAndPieces.reduce((sum, lp) => sum + (lp.pieces * lp.length), 0).toFixed(2);
                    // You can calculate the total amount as needed
                    const totalAmount = (totalQuantity * item.pricePerUnit).toFixed(2); // Example calculation, adjust as needed

                    return `
                ${item.lengthAndPieces.map((lp, lpIndex) => `
                    <tr key="${itemIndex}-${lpIndex}" style="height: 30px; text-align: center;">
                    ${lpIndex === 0 ? `
                        <td style="font-size: 10px; width: 23%; padding: 0; border-top: 0.5px solid black; border-right: 0.5px solid black; border-left: 0.5px solid black;">
                        <p style="margin: 0; font-weight: 500; font-size: 12px; margin-bottom: 2px;"><u>Colour: ${item.color}</u></p>
                        <u style="margin: 0; font-weight: 500; font-size: 12px;">${item.type}</u>
                        </td>
                    ` : (item.lengthAndPieces.length - 1 === lpIndex) ? `
                        <td style="font-size: 10px; width: 23%; padding: 10px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; border-left: 0.5px solid black;"></td>
                    ` : `
                        <td style="font-size: 10px; width: 23%; padding: 10px; border-right: 0.5px solid black; border-left: 0.5px solid black;"></td>
                    `}
                    <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 3px;">
                        <p style="margin: 0; font-weight: 500; font-size: 12px;">${item.thickness}</p>
                    </td>
                    <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 6px;">
                        <p style="margin: 0; font-weight: 500; font-size: 12px;">${item.width}</p>
                    </td>
                    <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 0;">
                        <p style="margin: 0; font-weight: 500; font-size: 11px;">${lp.length} ${item.unit}</p>
                    </td>
                    <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 0;">
                        <p style="margin: 0; font-weight: 500;">${lp.pieces}</p>
                    </td>
                    <td style="font-size: 10px; border: 0.5px solid black; width: 15%; padding: 0;">
                        <div style="display: flex; height: 35px;">
                        <div style="width: 65%; display: flex; align-items: center; justify-content: center; padding: 0;">
                            <p style="margin: 0; font-weight: 500;">${(lp.pieces * lp.length).toFixed(2)}</p>
                        </div>
                        <div style="width: 1px; background-color: black; height: 100%;"></div>
                        <div style="width: 35%; display: flex; align-items: center; justify-content: center; padding: 0;"></div>
                        </div>
                    </td>
                    ${lpIndex === 0 ? `
                        <td style="font-size: 10px; border-top: 0.5px solid black; border-right: 0.5px solid black; width: 17%; padding: 0;"></td>
                    ` : (item.lengthAndPieces.length - 1 === lpIndex) ? `
                        <td style="font-size: 10px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; width: 17%; padding: 0;"></td>
                    ` : `
                        <td style="font-size: 10px; border-right: 0.5px solid black; width: 17%; padding: 0;"></td>
                    `}
                    ${lpIndex === 0 ? `
                        <td style="font-size: 10.3px; border-top: 0.5px solid black; border-right: 0.5px solid black; width: 13%; padding: 10px;"></td>
                    ` : (item.lengthAndPieces.length - 1 === lpIndex) ? `
                        <td style="font-size: 10.3px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; width: 13%; padding: 10px;"></td>
                    ` : `
                        <td style="font-size: 10.3px; border-right: 0.5px solid black; width: 13%; padding: 10px;"></td>
                    `}
                    </tr>
                `).join('')}
                <tr style="height: 30px; text-align: center;">
                    <td style="font-size: 10px; width: 23%; padding: 0; border: 0.5px solid black;">Total</td>
                    <td colspan="3" style="font-size: 10px; border: 0.5px solid black;"></td>
                    <td style="font-size: 10px; border: 0.5px solid black;">${totalPieces}</td>
                    <td style="font-size: 10px; border: 0.5px solid black;">${totalQuantity}</td>
                    <td colspan="2" style="font-size: 10px; border: 0.5px solid black;">${totalAmount}</td>
                </tr>
                `;
                }).join('')}
            </table>
        `;
    };

    const generateTableRows2 = () => {
        return billDetails.map((item, index) => `
      <div key=${index} style="flexDirection: row; alignItems: center; alignSelf: center;">
        
        <div style="flexDirection: column; font-size: 6px; border: 0.5px solid black; width: 23%; alignItems: center; padding-top: 1px; padding-bottom: 1px; height: 30px; justifyContent: center; ">
          <p style="fontSize: 6px; margin: 0; fontWeight: 500;"><u>Colour: ${item.color}</u></p>
          <u style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.type}</u>
        </div>

        <div style="flexDirection: column; font-size: 6px; width: 8%; border: 0.5px solid black; alignItems: center; padding-top: 1px; padding-bottom: 1px; height: 30px; justifyContent: center; " >
          <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.thickness}</p >
        </div >

        <div style="flexDirection: column; font-size: 6px; border: 0.5px solid black; alignItems: center; width: 8%; padding-top: 1px; padding-bottom: 1px; height: 30px; justifyContent: center; " >
          <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.width}</p>
        </div>
      
        <div style="flexDirection: column; font-size: 6px; width: 8%; border: 0.5px solid black; alignItems: center; height: 30px; justifyContent: center;">
          <div style="flexDirection: column; font-size: 6px; width: 100%; borderBottom: 0.5px solid black; alignItems: center; height: 15px; justifyContent: center; ">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.length} ${item.unit}</p>
          </div>         
          <div style="width: 100%; backgroundColor: black; height: 1px;"></div>
          <div style="flexDirection: column; font-size: 6px; width: 100%; alignItems: center; height: 15px; justifyContent: center; ">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">Total</p>
          </div>         
        </div>
        
        <div style="flexDirection: column; font-size: 6px; width: 8%; border: 0.5px solid black; alignItems: center; height: 30px; justifyContent: center;">
          <div style="flexDirection: column; font-size: 6px; width: 100%; borderBottom: 0.5px solid black; alignItems: center; height: 15px; justifyContent: center; ">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.pieces}</p>
          </div>         
          <div style="width: 100%; backgroundColor: black; height: 1px;"></div>
          <div style="flexDirection: column; font-size: 6px; width: 100%; alignItems: center; height: 15px; justifyContent: center; ">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.pieces}</p>
          </div>         
        </div>
        
        <div style="flexDirection: column; font-size: 6px; width: 15%; border: 0.5px solid black; alignItems: center; padding-top: 4.9px; padding-bottom: 4.9px; height: 30px; justifyContent: center; ">
          <div style="flexDirection: column; font-size: 6px; width: 100%; borderBottom: 0.5px solid black; alignItems: center; height: 15px; justifyContent: center; ">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.pieces * item.length}.00</p>
          </div>         
          <div style="width: 100%; backgroundColor: black; height: 1px;"></div>

          <div style="flexDirection: row; alignItems: center; width: 100%">
            <div style="flexDirection: column; font-size: 6px; width: 65%; alignItems: center; height: 15px; justifyContent: center; ">
              <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.pieces * item.length}.00</p>
            </div>   
            <div style="backgroundColor: black; height: 99%; width: 1px;"></div>
            <div style="flexDirection: column; font-size: 6px; width: 35%; alignItems: center; height: 15px; justifyContent: center; ">
              <p style="fontSize: 6px; margin: 0; fontWeight: 500; fontWeight: 600;">Rft</p>
            </div>
          </div>
        
        </div>
        
        <div style="flexDirection: column; font-size: 6px; width: 17%;border: 0.5px solid black; alignItems: center;  padding-top: 1px; padding-bottom: 1px; height: 30px; justifyContent: center; ">
        
          <div style="flexDirection: column; font-size: 6px; width: 100%; borderBottom: 0.5px solid black; alignItems: center; height: 15px; justifyContent: center; ">
            <div style="flexDirection: column; font-size: 6px; alignItems: center; height: 15px; justifyContent: center; ">
              <p style="fontSize: 6px; margin: 0; fontWeight: 500; fontWeight: 600;">Per Rft</p>
            </div>
          </div>         
        
          <div style="width: 100%; backgroundColor: black; height: 1px;"></div>

          <div style="flexDirection: row; alignItems: center; width: 100%">
            <div style="flexDirection: column; font-size: 6px; width: 20%; alignItems: center; height: 15px; justifyContent: center; ">
              <p style="fontSize: 6px; margin: 0; fontWeight: 500;">₹</p>
            </div>
            <div style="backgroundColor: black; height: 99%; width: 1px;"></div>
            <div style="flexDirection: column; font-size: 6px; width: 80%; alignItems: center; height: 15px; justifyContent: center; ">
              <p style="fontSize: 6px; margin: 0; fontWeight: 600;">${item.rate}.00</p>
            </div>   
          </div>

        </div>
        
        <div style="flexDirection: column; font-size: 6px; width: 13%; border: 0.5px solid black;alignItems: center;  padding-top: 1px; padding-bottom: 1px; height: 30px; justifyContent: center; ">
          <p style="fontSize: 6.3px; margin: 0; fontWeight: 600;">₹${indianNumberFormat(item.length * item.pieces * item.rate)}.00</p>
        </div>

      </div >
  `).join('');
    };

    const htmlContent = `
  <!DOCTYPE html>
    <html>

      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, user-scalable=yes">
        <style>
          body {
            color: black;
            padding: 30px;
            background-color: white;
            font-family: Arial, sans-serif;
            font-size: 10px;
            margin: 0;
            padding-top: 40px;
          }

          h6 {
            font-size: 12px;
            margin: 0;
            font-weight: 500;
          }

          p {
            font-size: 12px;
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
            justify-content: center;
            width: 100%;
            padding: 0;
            margin: 0;
            height: 45px;
            padding-right: 50px;
          }

          .header img {
            height: 100px;
            width: 100px;
            object-fit: contain;
            margin: 0;
            margin-right: 10px;
          }

          .header div {
            text-align: center;
            margin: 0;
            padding: 0;
          }

          .address {
            text-align: center;
            margin: 0;
            font-weight: 400;
            font-size: 14px;
            margin-top: 2px;
          }

          .party-info {
            margin-top: 5px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .party-info h6 {
            font-weight: 400;
            margin-top: 1px;
            font-size: 11px;
          }

          .party-info em {
            font-style: italic;
          }

          .table {
            margin-top: 10px;
            width: 100%;
            border-collapse: collapse;
          }

          .table th,
          .table td {
            border: 0.5px solid black;
            text-align: center;
          }

          .table th {
            background-color: #7ff460;
            font-size: 12px;
          }

          .note {
            margin-top: 20px;
            width: 100%;
          }

          .note h5 {
            font-weight: 600;
            margin-bottom: 1px;
            font-size: 11px;
            margin: 0;
            margin-bottom: 8px;
          }

          .note h6 {
            font-weight: 400;
            margin-bottom: 10px;
            font-size: 10px;
          }

          .note p {
            margin: 3px;
          }

          .signature {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            width: 100%;
          }

          .ref {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-top: 20px;
          }

          .page-break {
            page-break-before: always;
          }

        </style>
      </head>

      <body>

        <div class="container">
          <div class="header">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzKTWxwQYlE-bvvFw7cb3WLvV-sx_A-XXzdK5HrixwRw&s">
            <div>
              <h6 style="font-size: 18px; padding-right: 10px;">COLOURTUFF+</h6>
              <h6 style="font-size: 14px; padding-right: 10px;">(A Product Of POOJA ROOFING CO.(MFG))</h6>
            </div>
          </div>

          <p class="address">ADDRESS:- MAYFAIR BUILDING, 1ST FLOOR, LALGANESH LOKHRA ROAD, OPP. HANUMAN MANDIR</p>
          <p class="address">DISTRICT:- KAMRUP(M),GUWAHATI, ASSAM PIN CODE:- 781034</p>
          <p class="address">E Mail: poojaroofingco.mfg@gmail.com</p>
          <p class="address">Phone No. 0361-3102688</p>

        </div>

        <div class="ref">
          <p class="address">REF.NO:- <u>PRCM/24-25/098</u></p>
          <p class="address">${new Date().toLocaleDateString()}</p>
        </div>

        <p style="font-size: 14px; margin-top: 3px;"><em>Sales Person-:</em> Anil Beniwal</p>

        <div class="party-info">
          <h5 style="font-size: 13px; margin: 0; padding-bottom: 1px; font-weight: 500;">ESTIMATE</h5>
          <p style="fontSize: 14px; fontWeight: 600;"><em>PARTY: ${name}</em></p>
          <h6>Site: ${site}</h6>
        </div>

        <div style="flex-direction: row; justify-content: space-between; align-items: center; display: flex; width: 100%; margin-top: 3px;">
          <h6>PAN: <em style="font-weight: 400;">${pan}</em></h6>
          <h6>Contact No.: <em style="font-weight: 400;">${contact}</em></h6>
          <h6>GSTIN: <em style="font-weight: 400;">${gstin}</em></h6>
        </div>
        
        <table class="table">
          <thead>
            <tr>
              <th style="width: 23%; ">Material (Hi-rib)</th>
              <th style="width: 8%; ">Thick (mm)</th>
              <th style="width: 8%; ">Width</th>
              <th style="width: 8%; ">Length</th>
              <th style="width: 8%; ">No.of Pcs</th>
              <th style="width: 14%; ">Quantity</th>
              <th style="width: 17%; ">Rate (In ₹)</th>
              <th style="width: 14%; ">Amount (In Rs.)</th>
            </tr>
          </thead>

          <tbody>
            ${generateTableRows()}
          </tbody>
        
        </table>

        <table style="width: 100%; border-collapse: collapse; margin-top: 2px;">

          <tr style="height: 62px;">
            <td style="width: 86%; border: 0.5px solid black; text-align: right; padding-top: 2px; padding-bottom: 2px; ">
              ${loadingCharge !== 0 ? `<p style="margin: 1px; font-size: 12px; padding-right: 2px; margin-bottom: ">Loading Charges</p>` : ``}
              ${bendCharge !== 0 ? `<p style="margin: 1px; font-size: 12px; padding-right: 2px; margin-bottom: ">Bend Charges</p>` : ``}
              ${transportCharge !== 0 ? `<p style="margin: 1px; font-size: 12px; padding-right: 2px; margin-bottom: ">Transport Charges</p>` : ``}
            </td>
            <td style="width: 14%; border: 0.5px solid black; text-align: center; ">
              ${loadingCharge !== 0 ? `<p style="margin: 1px; font-size: 12px; padding-right: 2px; font-weight: 600; margin-bottom: ">₹${loadingCharge}.00</p>` : ``}
              ${bendCharge !== 0 ? `<p style="margin: 1px; font-size: 12px; padding-right: 2px; font-weight: 600; margin-bottom: ">₹${bendCharge}.00</p>` : ``}
              ${transportCharge !== 0 ? `<p style="margin: 1px; font-size: 12px; padding-right: 2px; font-weight: 600; margin-bottom: ">₹${transportCharge}.00</p>` : ``}
            </td>
          </tr>
         
          <tr style="height: 30px;">
            <td style="width: 86%; border: 0.5px solid black; text-align: right; padding-top: 5px; padding-bottom: 5px; padding-right: 2px; ">
              <p style="margin: 1px; font-size: 11px;">Total amount to be paid</p>
            </td>
            <td style="width: 14%; border: 0.5px solid black; text-align: center; padding-top: 5px; padding-bottom: 5px;">
              <p style="font-size: 13px; font-weight: 600; margin: 0;">₹${indianNumberFormat(calculateTotalPrice())}.00</p>
            </td>
          </tr>
        </table>

        <div style="width: 100%;">
          <p style="font-size: 12px; font-weight: 400; margin: 2px;"><em>(Rupees ${numberToWords(calculateTotalPrice())} Only)</em></p>
        </div>

        <div class="note" id="note">
          <h6>Note:</h6>
          <h5>Terms & conditions:-</h5>
          <p><em>1. Prices are inclusive of GST</em></p>
          <p><em>2. Prices are based on ex-factory at Changsari, Assam</em></p>
          <p><em>3. Payment Terms: 100% in Advance</em></p>
          <p><em>4. Rates are subject to change without any Prior Information.</em></p>
          <div style="flex-direction: column; background-color: yellow; padding-top: 1px; padding-bottom: 1px;">
            <p>5. FOR BANK DETAILS:- Name: Pooja Roofing Co. (MFG) A/C NO: 41122724588 (STATE BANK OF INDIA,)</p>
            <p style="padding-left: 12px;">IFSC CODE: SBIN0013246 (Traders Branch Fancy Bazar)</p>
          </div>
          <p><em>6. Transportation: Client's Own Arrangement / To Pay Basis</em></p>
          <p><em>7. The above Rates are valid for 7 Days</em></p>
        </div>

        <div id="middle-section" style="flex-direction: column; margin-top: 25px; ">
          <p style="margin: 0; fontSize: 8px; fontWeight: 600; "><em>Regards</em></p>
          <p style="margin: 0; fontSize: 8px; fontWeight: 600; "><em>Pooja Roofing Co.(MFG)</em></p>
        </div>

        <div id="signature" class="signature" >
          <p style="margin: 0; fontSize: 8px; fontWeight: 500;"><em>( Prepared by )</em></p>
          <p style="margin: 0; fontSize: 8px; fontWeight: 500;"><em>( Checked by )</em></p>
          <p style="margin: 0; fontSize: 8px; fontWeight: 500;"><em>( Approved by )</em></p>
        </div>
      
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            var noteSection = document.getElementById('note');
            var middleSection = document.getElementById('middle-section');
            var signatureSection = document.getElementById('signature');

            var sections = [noteSection, middleSection, signatureSection];

            sections.forEach(function(section) {
              var sectionTopOffset = section.offsetTop;
              var sectionHeight = section.offsetHeight;
              var pageHeight = 1122; // Assuming 1122px is the height of an A4 page

              console.log("Section Top Offset: ", sectionTopOffset);
              console.log("Section Height: ", sectionHeight);
              console.log("Page Height: ", pageHeight);

              if (sectionTopOffset + sectionHeight > pageHeight) {
                section.classList.add('page-break');
              }
            });
          });
        </script>

      </body>

    </html>

    `;

    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default Practice2

const styles = StyleSheet.create({})