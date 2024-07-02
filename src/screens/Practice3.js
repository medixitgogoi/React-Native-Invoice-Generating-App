const generateTableRows = () => {
    return `
    <table style="width: 100%; border-collapse: collapse; margin-top: 2px; margin-bottom: 2px;">
      ${details.orderDetails.map((item, itemIndex) => {

        const totalPieces = item.orderData.reduce((sum, lp) => sum + (parseInt(lp.quantity) * 1), 0);
        const totalQuantity = item.orderData.reduce((sum, lp) => sum + (parseInt(lp.quantity) * parseInt(lp.length)), 0);
        const totalAmount = indianNumberFormat(totalQuantity * item.rate);

        return `
          ${item.orderData.map((lp, lpIndex) => `
            <tr key="${itemIndex}-${lpIndex}" style="text-align: center;">
              ${lpIndex === 0 ? `
                <td style="font-size: 10px; width: 23%; padding: 3px; border-top: 0.5px solid black; border-right: 0.5px solid black; border-left: 0.5px solid black;">
                  <p style="margin: 0; font-weight: 500; font-size: 12px;"><u>Colour: ${item.color}</u></p>
                  ${item.orderData.length === 1 ? `<u style="margin: 0; font-weight: 500; font-size: 12px; ">${item.product_type}</u>` : ``}
                </td>
              ` : (item.orderData.length - 1 === lpIndex && item.orderData.length > 2) ? `
                <td style="font-size: 10px; width: 23%; padding: 3px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; border-left: 0.5px solid black;">
                
                </td>
              ` : (lpIndex === 1) ? `
                <td style="font-size: 10px; width: 23%; padding: 3px; border-right: 0.5px solid black; border-left: 0.5px solid black;">
                  <u style="margin: 0; font-weight: 500; font-size: 12px;">${item.product_type}</u>
                </td>
              `: `
                <td style="font-size: 10px; width: 23%; padding: 3px; border-right: 0.5px solid black; border-left: 0.5px solid black;">

                </td>
              `}

              <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 3px;">
                <p style="margin: 0; font-weight: 500; font-size: 12px;">${item.thickness}</p>
              </td>

              <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 3px;">
                <p style="margin: 0; font-weight: 500; font-size: 12px;">${item.product_type === 'Ridges' ? `${item.ridge_width} inch` : '3.5 mm'}</p>
              </td>

              <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 3px;">
                <p style="margin: 0; font-weight: 500; font-size: 11px;">${lp.length} ${item.unit}</p>
              </td>

              <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 3px; ">
                <p style="margin: 0; font-weight: 500;">${lp.quantity}</p>
              </td>

              <td style="font-size: 10px; border: 0.5px solid black; width: 14%; padding: 0; ">
                <div style="display: flex; height: 20px;">
                  <div style="width: 65%; display: flex; align-items: center; justify-content: center; padding: 0;">
                    <p style="margin: 0; font-weight: 500; font-size: 12px;">${lp.quantity * lp.length}.00</p>
                  </div>
                  <div style="width: 1px; background-color: black; height: 100%;"></div>
                  <div style="width: 35%; display: flex; align-items: center; justify-content: center; padding: 0;">
                    <p style="margin: 0; font-weight: 600; font-size: 12px;"></p>
                  </div>
                </div>
              </td>

              ${lpIndex === 0 ? `
                <td style="font-size: 10px; border-top: 0.5px solid black; border-right: 0.5px solid black; width: 17%; padding: 3px;">
                
                </td>
                ` : (item.orderData.length - 1 === lpIndex) ? `
                <td style="font-size: 10px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; width: 17%; padding: 3px;">
                
                </td>
                ` : `
                <td style="font-size: 10px; border-right: 0.5px solid black; width: 17%; padding: 3px;">
                
                </td>
              `}
              
              ${lpIndex === 0 ? `
                <td style="font-size: 10.3px; border-top: 0.5px solid black; border-right: 0.5px solid black; width: 14%; padding: 3px;">

                </td>
              ` : (item.orderData.length - 1 === lpIndex) ? `
                <td style="font-size: 10.3px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; width: 13%; padding: 3px;">

                </td>
              ` : `
                <td style="font-size: 10.3px; border-right: 0.5px solid black; width: 13%; padding: 3px;">

                </td>
              `}

            </tr>
          `).join('')}

          <tr style="height: 20px; text-align: center; background-color: #a2eaf3; ">
            <td style="width: 23%; padding: 0; border: 0.5px solid black; "></td>
            
            <td colspan="3" style="font-size: 13px; border: 0.5px solid black; text-align: right; padding-right: 13px; font-weight: 500; ">Total</td>
            
            <td style="font-size: 13px; border: 0.5px solid black; font-weight: 500; ">${totalPieces}</td>
            
            <td style="font-size: 10px; border: 0.5px solid black; width: 14%; padding: 0; ">
              <div style="display: flex; height: 20px;">
                <div style="width: 65%; display: flex; align-items: center; justify-content: center; padding: 0;">
                  <p style="margin: 0; font-weight: 500; font-size: 12px;">${totalQuantity}.00</p>
                </div>
                <div style="width: 1px; background-color: black; height: 100%;"></div>
                <div style="width: 35%; display: flex; align-items: center; justify-content: center; padding: 0;">
                  <p style="margin: 0; font-weight: 600; font-size: 12px;">Rft</p>
                </div>
              </div>
            </td>

            <td style="font-size: 10px; border: 0.5px solid black; width: 17%; padding: 0; vertical-align: top;">
              <div style="display: flex; height: 20px; ">
                <div style="width: 15%; display: flex; align-items: center; justify-content: center; padding: 0;">
                  <p style="margin: 0; font-weight: 500;">₹</p>
                </div>
                <div style="width: 1px; background-color: black;"></div>
                <div style="width: 43%; display: flex; align-items: center; justify-content: center; padding: 0;">
                  <p style="margin: 0; font-weight: 600;">${item.rate}.00</p>
                </div>
                <div style="width: 1px; background-color: black;"></div>
                <div style="width: 42%; display: flex; align-items: center; justify-content: center; padding: 0;">
                  <p style="margin: 0; font-weight: 600;">Per Rft</p>
                </div>
              </div>
            </td>

            <td colspan="2" style="font-size: 13px; border: 0.5px solid black; font-weight: 600; ">₹${totalAmount}.00</td>

          </tr>
      `;
    }).join('')}
    </table>
  `;
};

const htmlContent = `
        <!DOCTYPE html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, user-scalable=yes">
                <style>

                @page {
                    margin-top: 15px;
                    margin-bottom: 10px;
                }
                
                body {
                    color: black;
                    padding: 30px;
                    background-color: white;
                    font-family: Arial, sans-serif;
                    font-size: 10px;
                    margin: 0;
                    padding-top: 20px;
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
                    margin-top: 50px;
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
                <p class="address">${formattedDate}</p>
                </div>

                <p style="font-size: 14px; margin-top: 3px;">Sales Person-: Anil Beniwal</p>

                <div class="party-info">
                <h5 style="font-size: 13px; margin: 0; padding-bottom: 1px; font-weight: 500;">ESTIMATE</h5>
                <p style="font-size: 12px; fontWeight: 600;"> <strong>PARTY:</strong> ${details.client_name}</p>
                <h6><strong style="font-size: 12px;">Site:</strong> Ganeshguri</h6>
                </div>

                <div style="flex-direction: row; justify-content: space-between; align-items: center; display: flex; width: 100%; margin-top: 3px;">
                <h6 style="font-weight: 400; "><strong>PAN:</strong> 111111111</h6>
                <h6 style="font-weight: 400; "><strong>Contact No.:</strong> 333333333</h6>
                <h6 style="font-weight: 400; "><strong>GSTIN:</strong> 33333333333</h6>
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

                <table style="width: 100%; border-collapse: collapse; margin-top: 2px; ${NoOfItems() > 24 ? `page-break-before: always;` : ``}; ">

                <tr style="height: 62px;">
                    <td style="width: 86%; border: 0.5px solid black; text-align: right; padding-top: 2px; padding-bottom: 2px; ">
                    ${loadingCharge !== 0 ? `<p style="margin: 1px; font-size: 12px; padding-right: 6px; margin-bottom: ">Loading Charges</p>` : ``}
                    ${bendCharge !== 0 ? `<p style="margin: 1px; font-size: 12px; padding-right: 6px; margin-bottom: ">Bend Charges</p>` : ``}
                    ${transportCharge !== 0 ? `<p style="margin: 1px; font-size: 12px; padding-right: 6px; margin-bottom: ">Transport Charges</p>` : ``}
                    </td>
                    <td style="width: 14%; border: 0.5px solid black; text-align: center; ">
                    ${loadingCharge !== 0 ? `<p style="margin: 1px; font-size: 12px; font-weight: 600; margin-bottom: ">₹${indianNumberFormat(loadingCharge)}.00</p>` : ``}
                    ${bendCharge !== 0 ? `<p style="margin: 1px; font-size: 12px; font-weight: 600; margin-bottom: ">₹${indianNumberFormat(bendCharge)}.00</p>` : ``}
                    ${transportCharge !== 0 ? `<p style="margin: 1px; font-size: 12px; font-weight: 600; margin-bottom: ">₹${indianNumberFormat(transportCharge)}.00</p>` : ``}
                    </td>
                </tr>
                
                <tr style="height: 30px;">
                    <td style="width: 86%; border: 0.5px solid black; text-align: right; padding-top: 5px; padding-bottom: 5px; padding-right: 6px; ">
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

                <div style="${NoOfItems() > 15 && NoOfItems() < 24 ? `page-break-before: always;` : ``};">
                <div class="note">
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
                </div>

                <div style="flex-direction: column; margin-top: 25px; ">
                <p style="margin: 0; fontSize: 8px; fontWeight: 600; "><em>Regards</em></p>
                <p style="margin: 0; fontSize: 8px; fontWeight: 600; "><em>Pooja Roofing Co.(MFG)</em></p>
                </div>

                <div class="signature" >
                <p style="margin: 0; fontSize: 8px; fontWeight: 500;"><em>( Prepared by )</em></p>
                <p style="margin: 0; fontSize: 8px; fontWeight: 500;"><em>( Checked by )</em></p>
                <p style="margin: 0; fontSize: 8px; fontWeight: 500;"><em>( Approved by )</em></p>
                </div>

            </body>

        </html>

    `;