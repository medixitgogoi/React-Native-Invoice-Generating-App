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
      </head>
      <body style="color: black; padding: 20px; backgroundColor: white;">

        <div>

          <div style="flexDirection: row;">
            <img style="height: 25px; width: 70px; object-fit: contain;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzKTWxwQYlE-bvvFw7cb3WLvV-sx_A-XXzdK5HrixwRw&s">
            <div style="marginLeft: 17px">
              <h6 style="text-align: center; margin: 0; font-size: 12px; padding: 0;">COLOURTUFF+</h6>
              <h6 style="text-align: center; margin: 0; font-size: 8px; padding: 0;">(A Product Of POOJA ROOFING CO.(MFG))</h6>
            </div>
          </div>
              
          <p style="textAlign: center; margin: 0; fontSize: 7px; margin-top: 0.5px; font-weight: 400; padding: 0;">ADDRESS:- MAYFAIR BUILDING, 1ST FLOOR, LALGANESH LOKHRA ROAD, OPP. HANUMAN MANDIR</p>
          <p style="textAlign: center; margin: 0; fontSize: 7px; margin-top: 0.5px; font-weight: 400; padding: 0;">DISTRICT:- KAMRUP(M),GUWAHATI , ASSAM PIN CODE:- 781034</p>
          <p style="textAlign: center; margin: 0; fontSize: 7px; margin-top: 0.5px; font-weight: 300; padding: 0;">E Mail: poojaroofingco.mfg@gmail.com</p>
          <p style="textAlign: center; margin: 0; fontSize: 7px; margin-top: 0.5px; font-weight: 300; padding: 0;">Phone No.  0361-3102688</p>
          
        </div>

        <div style="margin-top: 2px">

          <div style="flexDirection: row; alignItems: center; gap: 5px; justifyContent: space-between">
            <div style="flexDirection: row; alignItems: center">
              <p style="margin: 0; fontSize: 7px; margin-top: 0.5px; font-weight: 400;">REF.NO:-</p>
              <em style="margin: 0; fontSize: 7px; margin-top: 0.5px; font-weight: 400;marginLeft: 0.5px; text-decoration: underline;">PRCM/24-25/098</em>
            </div>
            <p style="margin: 0; fontSize: 7px; margin-top: 0.5px; font-weight: 400;">${currentDate.toLocaleDateString()}</p>
          </div>
          
          <div style="flexDirection: row; alignItems: center; ">
            <p style="margin: 0; font-size: 7px; padding: 0; fontWeight: 500">Sales Person-:</p>
            <em style="margin: 0; font-size: 7px; padding: 0; margin-left: 2px">Anil Beniwal</em>
          </div>

          <div style="flexDirection: column; alignItems: center">
            <h6 style="margin: 0; font-size: 6px; font-weight: 400;">ESTIMATE</h6>
            <em style="font-size: 7px; margin: 0; font-weight: 500; margin-top: 0.5px;">PARTY: ${name}</em>
            <h6 style="margin: 0; font-size: 6px; padding: 0; fontWeight: 400; margin-top: 0.5px;">Site: <em></em>${site}</h6>
          </div>

          <div style="flexDirection: row; alignItems: center; justifyContent: space-between; margin-top: 0.5px;">
            <h6 style="margin: 0; font-size: 6px; padding: 0; fontWeight: 500">PAN:<em> ${pan}</em></h6>
            <h6 style="margin: 0; font-size: 6px; padding: 0; fontWeight: 500">Contact No.:<em> ${contact}</em></h6>
            <h6 style="margin: 0; font-size: 6px; padding: 0; fontWeight: 500">GSTIN:<em> ${gstin}</em></h6>
          </div>
        
        </div>

        <div style="flexDirection: row; alignItems: center; margin-top: 2px; alignSelf: center;">
          
          <div style="flexDirection: column; font-size: 6px; border: 0.5px solid black; width: 23%; alignItems: center; padding-top: 1px; padding-bottom: 1px; backgroundColor: #5bda49"; >
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">Material</p>
            <u style="fontSize: 6px; margin: 0; fontWeight: 500;">(Hi-rib)</u>
          </div>

          <div style="flexDirection: column; font-size: 6px; width: 8%; border: 0.5px solid black; alignItems: center; padding-top: 1px; padding-bottom: 1px; backgroundColor: #5bda49"; " >
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">Thick</p>
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">(mm)</p>
          </div>

          <div style="flexDirection: column; font-size: 6px; border: 0.5px solid black; alignItems: center; width: 8%; backgroundColor: #5bda49"; " >
            <p style = "fontSize: 6px; margin: 0; fontWeight: 500; padding-top: 4.9px; padding-bottom: 4.9px;">Width</p >
          </div>

          <div style="flexDirection: column; font-size: 6px; width: 8%; border: 0.5px solid black; alignItems: center; padding-top: 4.9px; padding-bottom: 4.9px; backgroundColor: #5bda49";">
            <p style = "fontSize: 6px; margin: 0; fontWeight: 500;" >Length</p>
          </div>

          <div style="flexDirection: column; font-size: 6px; width: 8%; border: 0.5px solid black; alignItems: center ; padding-top: 1px; padding-bottom: 1px; backgroundColor: #5bda49";">
            <p style = "fontSize: 6px; margin: 0; fontWeight: 500;" >No.of </p>
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">Pcs</p>
          </div>

          <div style="flexDirection: column; font-size: 6px; width: 15%; border: 0.5px solid black; alignItems: center; padding-top: 4.9px; padding-bottom: 4.9px; backgroundColor: #5bda49";">
            <p style = "fontSize: 6px; margin: 0; fontWeight: 500;">Quantity</p>
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;"></p>
          </div>

          <div style="flexDirection: column; font-size: 6px; width: 17%;border: 0.5px solid black; alignItems: center;  padding-top: 1px; padding-bottom: 1px; backgroundColor: #5bda49";">
            <p style = "fontSize: 6px; margin: 0; fontWeight: 500;">Rate</p>
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">(In Rs.)</p>
          </div>

          <div style="flexDirection: column; font-size: 6px; width: 13%; border: 0.5px solid black;alignItems: center;  padding-top: 1px; padding-bottom: 1px; backgroundColor: #5bda49";">
            <p style = "fontSize: 6px; margin: 0; fontWeight: 500;">Amount</p>
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">(In Rs.)</p>
          </div>

        </div>

        ${generateTableRows()}

        <div style="height: 60px; width: 100%; border: 0.5px solid black; flexDirection: row; alignItems: center;">

          <div style="width: 86.9%; flexDirection: column; alignItems: flex-end; padding-right: 2px; ">
            <p style="margin: 1px; fontSize: 6px; "><em>Loading Charges</em></p>
            <p style="margin: 1px; fontSize: 6px; "><em>Bend Charges</em></p>
            <p style="margin: 1px; fontSize: 6px; "><em>Transport Charges</em></p>
          </div>

          <div style="height: 100%; backgroundColor: black; width: 1.2px"></div>

          <div style="width: 13%; flexDirection: column; alignItems: center; padding-right: 2px;">
            <p style="margin: 1px; fontSize: 6px; "><em>₹${loadingCharge}.00</em></p>
            <p style="margin: 1px; fontSize: 6px; "><em>₹${bendCharge}.00</em></p>
            <p style="margin: 1px; fontSize: 6px; "><em>₹${transportCharge}.00</em></p>
          </div>

        </div>
          
        <div style="width: 100%; border: 0.5px solid black; width: 100%; flexDirection: row; alignItems: center; ">

          <div style="width: 86.9%; padding-top: 5px; padding-bottom: 5px; flexDirection: row; justifyContent: flex-end; padding-right: 2px;">
            <p style="margin: 1px; fontSize: 6px; "><em>Total amount to be paid</em></p>
          </div>
          
          <div style="height: 100%; backgroundColor: black; width: 1.2px"></div>

          <div style="width: 13%; padding-top: 5px; padding-bottom: 5px; flexDirection: row; justifyContent: center; ">
            <p style="fontSize: 7px; fontWeight: 500; margin: 0; ">₹${indianNumberFormat(calculateTotalPrice())}</p>
          </div>

        </div>

        <div style="width: 100%;">
          <p style="fontSize: 6px; fontWeight: 400; margin: 0;"><em>(Rupees ${numberToWords(calculateTotalPrice())} Only)</em></p>
        </div>

        <div style="margin-top: 4px;">
          <h6 style="fontSize: 6px; margin: 0; fontWeight: 400;"><em>Note:</em></h6>
          <h5 style="fontSize: 6px; fontWeight: 500; margin-top: 2px; margin-bottom: 1px;">Terms & conditions:-</h5>
          <h6 style="fontSize: 6px; fontWeight: 400; margin: 0; padding-left: 1px"><em>1. Prices are inclusive of GST</em></h6>
          <h6 style="fontSize: 6px; fontWeight: 400; margin: 0; padding-left: 1px"><em>2. Prices are based on ex-factory at Changsari, Assam</em></h6>
          <h6 style="fontSize: 6px; fontWeight: 400; margin: 0; padding-left: 1px"><em>3. Payment Terms : 100% in Advance</em></h6>
          <h6 style="fontSize: 6px; fontWeight: 400; margin: 0; padding-left: 1px"><em>4. Rates are subject to change without any Prior Information.</em></h6>
          <div style="flexDirection: column; backgroundColor: yellow; padding-top: 1px; padding-bottom: 1px; padding-left: 1px">
            <h6 style="fontSize: 6px; fontWeight: 500; margin: 0"><em>5. FOR BANK DETAILS:- Name: Pooja Roofing Co. (MFG) A/C NO: 41122724588 (STATE BANK OF INDIA,)</em></h6>
            <h6 style="fontSize: 6px; fontWeight: 500; margin: 0"><em>IFSC CODE: SBIN0013246 (Traders Branch Fancy Bazar)</em></h6>
          </div>
          <h6 style="fontSize: 6px; fontWeight: 400; margin: 0; padding-left: 1px"><em>6. Transportation: Client's Own Arrangement / To Pay Basis</em></h6>
          <h6 style="fontSize: 6px; fontWeight: 400; margin: 0; padding-left: 1px"><em>7. The above Rates are valid for 3 days from the date of Proforma invoice</em></h6>
        </div>

        <div style="flexDirection: column; margin-top: 10px; ">
          <p style="margin: 0; fontSize: 6px; fontWeight: 600; "><em>Regards</em></p>
          <p style="margin: 0; fontSize: 6px; fontWeight: 600; "><em>Pooja Roofing Co.(MFG)</em></p>
        </div>

        <div style="flexDirection: row; justifyContent: space-between; alignItems: center; margin-top: 20px; width: 100%;">
          <p style="margin: 0; fontSize: 6px; fontWeight: 500;"><em>( Prepared by )</em></p>
          <p style="margin: 0; fontSize: 6px; fontWeight: 500;"><em>( Checked by )</em></p>
          <p style="margin: 0; fontSize: 6px; fontWeight: 500;"><em>( Approved by )</em></p>
        </div>

      </body >
    </html >
    `;

    const generateTableRows = () => {
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

    return (
        <View>
            <Text>Practice</Text>
        </View>
    )
}

export default Practice

const styles = StyleSheet.create({})