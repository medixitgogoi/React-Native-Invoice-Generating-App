import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HTML from 'react-native-render-html';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import PinchZoomView from 'react-native-pinch-zoom-view';

const BillView = ({ route }) => {

  const navigation = useNavigation();

  const bendCharge = route.params.bend;
  const loadingCharge = route.params.loading;
  const transportCharge = route.params.transport;

  const [currentDate, setCurrentDate] = useState(new Date());

  const [name, setName] = useState('');
  const [site, setSite] = useState('');
  const [pan, setPan] = useState('');
  const [contact, setContact] = useState('');
  const [gstin, setGstin] = useState('');

  const userDetails = useSelector(state => state.user);
  const billDetails = useSelector(state => state.bill);

  const calculateTotalPrice = () => {
    let amount = 0;

    billDetails.map(item => {
      let quantity = 0;

      item.lengthAndPieces.map(item => {
        quantity += item.length * item.pieces;
      })

      amount += quantity * item.rate;

    })

    amount += parseInt(bendCharge) + parseInt(loadingCharge) + parseInt(transportCharge);

    return amount;
  };

  useEffect(() => {
    userDetails.map(user => {
      setName(user.name)
      setSite(user.site)
      setPan(user.pan)
      setContact(user.contact)
      setGstin(user.gstin)
    })
  }, [])

  function indianNumberFormat(number) {
    // Split the number into an array of digits.
    const digits = number.toString().split('');

    // Reverse the array of digits.
    digits.reverse();

    // Add a comma after every three digits, starting from the right.
    for (let i = 3; i < digits.length; i += 3) {
      digits.splice(i, 0, ',');
    }

    // Join the array of digits back into a string.
    const formattedNumber = digits.join('');

    // Reverse the formatted number back to its original order.
    return formattedNumber.split('').reverse().join('');
  };

  function numberToWords(num) {
    if (num === 0) return 'Zero';

    const belowTwenty = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const thousands = ['', 'Thousand', 'Lakh', 'Crore'];

    function numberToWordsBelowThousand(num) {
      if (num < 20) return belowTwenty[num];
      if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + belowTwenty[num % 10] : '');
      return belowTwenty[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + numberToWordsBelowThousand(num % 100) : '');
    }

    let word = '';
    let index = 0;

    while (num > 0) {
      let part = num % 1000;

      if (index === 1) part = num % 100;

      if (part > 0) {
        let partInWords = numberToWordsBelowThousand(part);
        if (index > 0) {
          word = partInWords + ' ' + thousands[index] + ' ' + word;
        } else {
          word = partInWords;
        }
      }

      num = Math.floor(num / (index === 1 ? 100 : 1000));
      index++;
    }

    return word.trim();
  };

  const generateTableRows = () => {
    return `
    <table style="width: 100%; border-collapse: collapse; margin-top: 2px; margin-bottom: 2px;">
      ${billDetails.map((item, itemIndex) => {

      const totalPieces = item.lengthAndPieces.reduce((sum, lp) => sum + (lp.pieces * 1), 0);
      const totalQuantity = item.lengthAndPieces.reduce((sum, lp) => sum + (lp.pieces * lp.length), 0);
      const totalAmount = indianNumberFormat(totalQuantity * item.rate);

      return `
          ${item.lengthAndPieces.map((lp, lpIndex) => `
             <tr key="${itemIndex}-${lpIndex}" style="height: 30px; text-align: center; ">
              
              ${lpIndex === 0 ? `
                <td style="font-size: 10px; width: 23%; padding: 0; border-top: 0.5px solid black; border-right: 0.5px solid black; border-left: 0.5px solid black;">
                  <p style="margin: 0; font-weight: 500; font-size: 12px; margin-bottom: 2px;"><u>Colour: ${item.color}</u></p>
                  <u style="margin: 0; font-weight: 500; font-size: 12px;">${item.type}</u>
                </td>
              ` : (item.lengthAndPieces.length - 1 === lpIndex) ? `
                <td style="font-size: 10px; width: 23%; padding: 10px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; border-left: 0.5px solid black;">
                
                </td>
              ` : `
                <td style="font-size: 10px; width: 23%; padding: 10px; border-right: 0.5px solid black; border-left: 0.5px solid black;">

                </td>
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

              <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 0; ">
                <p style="margin: 0; font-weight: 500;">${lp.pieces}</p>
              </td>

              <td style="font-size: 10px; border: 0.5px solid black; width: 15%; padding: 0; ">
                <div style="display: flex; height: 35px;">
                  <div style="width: 65%; display: flex; align-items: center; justify-content: center; padding: 0;">
                    <p style="margin: 0; font-weight: 500;">${lp.pieces * lp.length}.00</p>
                  </div>
                  <div style="width: 1px; background-color: black; height: 100%;"></div>
                  <div style="width: 35%; display: flex; align-items: center; justify-content: center; padding: 0;">
                    <p style="margin: 0; font-weight: 600;"></p>
                  </div>
                </div>
              </td>

              ${lpIndex === 0 ? `
                <td style="font-size: 10px; border-top: 0.5px solid black; border-right: 0.5px solid black; width: 17%; padding: 0;">
                
                </td>
                ` : (item.lengthAndPieces.length - 1 === lpIndex) ? `
                <td style="font-size: 10px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; width: 17%; padding: 0;">
                
                </td>
                ` : `
                <td style="font-size: 10px; border-right: 0.5px solid black; width: 17%; padding: 0;">
                
                </td>
              `}
              
              ${lpIndex === 0 ? `
                <td style="font-size: 10.3px; border-top: 0.5px solid black; border-right: 0.5px solid black; width: 13%; padding: 10px;">

                </td>
              ` : (item.lengthAndPieces.length - 1 === lpIndex) ? `
                <td style="font-size: 10.3px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; width: 13%; padding: 10px;">

                </td>
              ` : `
                <td style="font-size: 10.3px; border-right: 0.5px solid black; width: 13%; padding: 10px;">

                </td>
              `}
            </tr>
          `).join('')}

          <tr style="height: 30px; text-align: center;">
            <td style="width: 23%; padding: 0; border: 0.5px solid black; "></td>
            <td colspan="3" style="font-size: 13px; border: 0.5px solid black; text-align: right; padding-right: 13px; font-weight: 500; ">Total</td>
            <td style="font-size: 13px; border: 0.5px solid black; font-weight: 500; ">${totalPieces}</td>
            <td style="font-size: 10px; border: 0.5px solid black; width: 15%; padding: 0; ">
              <div style="display: flex; height: 35px;">
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
              <div style="display: flex; height: 35px; ">
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

            <td colspan="2" style="font-size: 13px; border: 0.5px solid black; font-weight: 600; ">₹${totalAmount}</td>

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
      backgroundColor: green;
    }

    .table th {
      background-color: #5bda49;
      font-size: 12px;
    }

    .note {
      margin-top: 10px;
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
    <h5 style="font-size: 13px; margin: 0; padding-bottom: 1px; font-weight: 500;"><em>ESTIMATE</em></h5>
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
        <th style="width: 15%; ">Quantity</th>
        <th style="width: 17%; ">Rate (In ₹)</th>
        <th style="width: 13%; ">Amount (In Rs.)</th>
      </tr>
    </thead>

    <tbody>
      ${generateTableRows()}
    </tbody>
  
  </table>

  <table style="width: 100%; border-collapse: collapse; margin-top: 2px;">
    <tr style="height: 60px;">
        <td style="width: 87%; border: 0.5px solid black; text-align: right; ">
          <p style="margin: 1px; font-size: 12px; padding-right: 2px; margin-bottom: "><em>Loading Charges</em></p>
          <p style="margin: 1px; font-size: 12px; padding-right: 2px; margin-bottom: "><em>Bend Charges</em></p>
          <p style="margin: 1px; font-size: 12px; padding-right: 2px; margin-bottom: "><em>Transport Charges</em></p>
        </td>
        <td style="width: 13%; border: 0.5px solid black; text-align: center; ">
          <p style="margin: 1px; font-size: 12px; padding-right: 2px; font-weight: 600; margin-bottom: "><em>₹${loadingCharge}.00</em></p>
          <p style="margin: 1px; font-size: 12px; padding-right: 2px; font-weight: 600; margin-bottom: "><em>₹${bendCharge}.00</em></p>
          <p style="margin: 1px; font-size: 12px; padding-right: 2px; font-weight: 600; margin-bottom: "><em>₹${transportCharge}.00</em></p>
        </td>
    </tr>
    <tr style="height: 30px;">
        <td style="width: 87%; border: 0.5px solid black; text-align: right; padding-top: 5px; padding-bottom: 5px; padding-right: 2px; ">
          <p style="margin: 1px; font-size: 11px;"><em>Total amount to be paid</em></p>
        </td>
        <td style="width: 13%; border: 0.5px solid black; text-align: center; padding-top: 5px; padding-bottom: 5px;">
          <p style="font-size: 13px; font-weight: 600; margin: 0;">₹${indianNumberFormat(calculateTotalPrice())}</p>
        </td>
    </tr>
  </table>

  <div style="width: 100%;">
    <p style="font-size: 12px; font-weight: 400; margin: 2px;"><em>(Rupees ${numberToWords(calculateTotalPrice())} Only)</em></p>
  </div>

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

  <div style="flexDirection: column; margin-top: 25px; ">
    <p style="margin: 0; fontSize: 8px; fontWeight: 600; "><em>Regards</em></p>
    <p style="margin: 0; fontSize: 8px; fontWeight: 600; "><em>Pooja Roofing Co.(MFG)</em></p>
  </div>

  <div class="signature">
    <p style="margin: 0; fontSize: 8px; fontWeight: 500;"><em>( Prepared by )</em></p>
    <p style="margin: 0; fontSize: 8px; fontWeight: 500;"><em>( Checked by )</em></p>
    <p style="margin: 0; fontSize: 8px; fontWeight: 500;"><em>( Approved by )</em></p>
  </div>

</body>

</html>

  `;

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

  const htmlContent2 = `
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

        ${generateTableRows2()}

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

  const generateInvoice = async () => {

    try {
      // Generate PDF
      const pdfOptions = {
        html: htmlContent,
        fileName: 'ColourTuff_Invoice',
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar
        animated={true}
        backgroundColor='#000'
        barStyle="light-content"
      />

      {/* header */}
      <View style={{ flexDirection: "row", backgroundColor: "#000", alignItems: "center", justifyContent: "space-between", elevation: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>

          <View style={{ paddingVertical: 10, flexDirection: "row", alignItems: "center", gap: 3, paddingHorizontal: 10, justifyContent: 'space-between' }}>
            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
              <Icon name="keyboard-arrow-left" size={26} color={'#fff'} />
            </TouchableOpacity>
          </View>

          <Text style={{ color: "#fff", fontWeight: "500", fontSize: responsiveFontSize(2.4), textTransform: 'uppercase' }}>View Invoice</Text>

          <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 8 }} onPress={() => generateInvoice()}>
            <Icon name="share" size={18} color={'#fff'} />
          </TouchableOpacity>

        </View>
      </View>

      <ScrollView>

        <PinchZoomView style={{ paddingVertical: 100, flexDirection: 'row', alignItems: 'center', height: '100%' }}>
          <HTML source={{ html: htmlContent2 }} />
        </PinchZoomView>

      </ScrollView>

    </SafeAreaView>
  )
}

export default BillView;

const styles = StyleSheet.create({});