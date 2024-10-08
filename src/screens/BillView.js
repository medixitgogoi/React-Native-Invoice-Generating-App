import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HTML from 'react-native-render-html';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import PinchZoomView from 'react-native-pinch-zoom-view';
import { zomatoRed } from '../utils/colors';
import axios from 'axios';

const OrderDetails = ({ route }) => {

  // console.log('routeDetails', route);

  const navigation = useNavigation();

  const loginDetails = useSelector(state => state.login);

  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const bendCharge = route.params.bend;
  const loadingCharge = route.params.loading;
  const transportCharge = route.params.transport;

  const [name, setName] = useState('');
  const [site, setSite] = useState('');
  const [pan, setPan] = useState('');
  const [contact, setContact] = useState('');
  const [gstin, setGstin] = useState('');
  const [refNo, setRefNo] = useState('');

  const [loading, setLoading] = useState(true);

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

  useFocusEffect(
    useCallback(() => {

      const fetchOrderDetails = async () => {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${loginDetails[0]?.accessToken}`;
          const toBeDispatchedResponse = await axios.post('/employee/order/list', { order_status: '1' });

          const toBeDispatchedData = toBeDispatchedResponse.data.data;
          console.log('data', toBeDispatchedData[0]);

          setRefNo(toBeDispatchedData[0]?.pl_no);
          setPan(toBeDispatchedData[0]?.pan);
          setGstin(toBeDispatchedData[0]?.gst)

          // setOrder(toBeDispatchedData[0]);

        } catch (error) {

        } finally {
          setLoading(false);
        }
      };

      fetchOrderDetails();

      return () => {
        setLoading(true);
      };

    }, [])
  );

  useEffect(() => {
    userDetails.map(user => {
      setName(user.name)
      setSite(user.site)
      setContact(user.contact)
    })
  }, []);

  const NoOfItems = () => {
    let items = 0;
    billDetails.map(item => {
      let num = item.lengthAndPieces.length;
      items += num;
    })
    return items;
  };

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
      const totalAmount = indianNumberFormat(totalQuantity * parseInt(item.rate));

      return `
          ${item.lengthAndPieces.map((lp, lpIndex) => `
            <tr key="${itemIndex}-${lpIndex}" style="text-align: center;">
              ${lpIndex === 0 ? `
                <td style="font-size: 10px; width: 23%; padding: 3px; border-top: 0.5px solid black; border-right: 0.5px solid black; border-left: 0.5px solid black; ">
                  <p style="margin: 0; font-weight: 500; font-size: 12px;"><u>Colour: ${item.color.name}</u></p>
                  <p>${item.lengthAndPieces.length === 1 ? `<u style="margin: 0; font-weight: 500; font-size: 12px; ">${item.type.name}</u>` : ``}</p>
                  ${item.lengthAndPieces.length === 1 ? `<u style="margin: 0; font-weight: 500; font-size: 12px; ">${item.remark}</u>` : ``}
                </td>
            ` : (item.lengthAndPieces.length - 1 === lpIndex && item.lengthAndPieces.length > 2 && item.lengthAndPieces.length < 4) ? `
                <td style="font-size: 10px; width: 23%; padding: 3px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; border-left: 0.5px solid black;">
                  <u style="margin: 0; font-weight: 500; font-size: 12px; ">${item.remark}</u>
                </td>
              ` : (lpIndex === 1) ? `
                <td style="font-size: 10px; width: 23%; padding: 3px; border-right: 0.5px solid black; border-left: 0.5px solid black;">
                  <u style="margin: 0; font-weight: 500; font-size: 12px;">${item.type.name}</u>
                  <p>${item.lengthAndPieces.length === 2 ? `<u style="margin: 0; font-weight: 500; font-size: 12px; ">${item.remark}</u>` : ``}</p>
                </td>
              `: (lpIndex === 2) ? `
                <td style="font-size: 10px; width: 23%; padding: 3px; border-right: 0.5px solid black; border-left: 0.5px solid black;">
                  <u style="margin: 0; font-weight: 500; font-size: 12px; ">${item.remark}</u>
                </td>
              `: `
                <td style="font-size: 10px; width: 23%; padding: 3px; border-right: 0.5px solid black; border-left: 0.5px solid black;">
                </td>
              `}

              <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 3px;">
                <p style="margin: 0; font-weight: 500; font-size: 12px;">${item.thickness.name}</p>
              </td>

              <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 3px;">
                <p style="margin: 0; font-weight: 500; font-size: 12px;">${item.width.name ? `${item.width.name} inch` : item.width}</p>
              </td>

              <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 3px;">
                <p style="margin: 0; font-weight: 500; font-size: 11px;">${lp.length} ${item.unit.name}</p>
              </td>

              <td style="font-size: 10px; border: 0.5px solid black; width: 8%; padding: 3px; ">
                <p style="margin: 0; font-weight: 500;">${lp.pieces}</p>
              </td>

              <td style="font-size: 10px; border: 0.5px solid black; width: 14%; padding: 0; ">
                <div style="display: flex; height: 20px;">
                  <div style="width: 65%; display: flex; align-items: center; justify-content: center; padding: 0;">
                    <p style="margin: 0; font-weight: 500; font-size: 12px;">${lp.pieces * lp.length}.00</p>
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
                ` : (item.lengthAndPieces.length - 1 === lpIndex) ? `
                <td style="font-size: 10px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; width: 17%; padding: 3px;">
                
                </td>
                ` : `
                <td style="font-size: 10px; border-right: 0.5px solid black; width: 17%; padding: 3px;">
                
                </td>
              `}
              
              ${lpIndex === 0 ? `
                <td style="font-size: 10.3px; border-top: 0.5px solid black; border-right: 0.5px solid black; width: 14%; padding: 3px;">

                </td>
              ` : (item.lengthAndPieces.length - 1 === lpIndex) ? `
                <td style="font-size: 10.3px; border-bottom: 0.5px solid black; border-right: 0.5px solid black; width: 13%; padding: 3px;">

                </td>
              ` : `
                <td style="font-size: 10.3px; border-right: 0.5px solid black; width: 13%; padding: 3px;">

                </td>
              `}

            </tr>
          `).join('')}

          <tr style="height: 20px; text-align: center; ">
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

          .watermark {
            position: absolute;
            top: 32%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 50px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.1);
            z-index: -1;
            user-select: none;
            opacity: 0.25;
          }

          .watermark img{
            width: 230px;
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
            position: relative;
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
          <p class="address">REF.NO:- <u>${refNo}</u></p>
          <p class="address">${formattedDate}</p>
        </div>

        <p style="font-size: 14px; margin-top: 3px;">Sales Person-: ${loginDetails[0].name}</p>

        <div class="party-info">
          <h5 style="font-size: 13px; margin: 0; padding-bottom: 1px; font-weight: 500;">ESTIMATE</h5>
          <p style="font-size: 12px; fontWeight: 600;"> <strong>PARTY:</strong> ${name}</p>
          <h6><strong style="font-size: 12px;">Site:</strong> ${site}</h6>
        </div>

        <div style="flex-direction: row; justify-content: space-between; align-items: center; display: flex; width: 100%; margin-top: 3px;">
          <h6 style="font-weight: 400; ">${pan === 'Not specified' ? '' : `<strong>PAN:</strong> ${pan}`}</h6>
          <h6 style="font-weight: 400; "><strong>Contact No.:</strong> ${contact}</h6>
          <h6 style="font-weight: 400; ">${gstin === 'Not specified' ? '' : `<strong>GSTIN:</strong> ${gstin}`}</h6>
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
            <div class="watermark">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzKTWxwQYlE-bvvFw7cb3WLvV-sx_A-XXzdK5HrixwRw&s">
            </div>
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

  const generateTableRows2 = () => {
    return billDetails.map((item, index) => {

      const totalPieces = item.lengthAndPieces.reduce((sum, lp) => sum + (lp.pieces * 1), 0);
      const totalQuantity = item.lengthAndPieces.reduce((sum, lp) => sum + (lp.pieces * lp.length), 0);
      const totalAmount = indianNumberFormat(totalQuantity * parseInt(item.rate));

      const rows = item.lengthAndPieces.map((lp, lpIndex) => `
        <div key=${lpIndex} style="display: flex; flexDirection: row; alignItems: center; ">

          ${lpIndex === 0 ? `
            <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; border: 0.5px solid black; width: 22%; alignItems: center; padding: 0; justifyContent: center;">
              <p style="fontSize: 6px; margin: 0; fontWeight: 500;"><u>Colour: ${item.color.name}</u></p>
              ${item.lengthAndPieces.length === 1 ? `<u style="margin: 0; font-weight: 500; font-size: 6px; ">${item.type.name}</u>` : ``}
              ${item.remark && item.lengthAndPieces.length === 1 ? `<u style="margin: 0; font-weight: 500; font-size: 6px; ">${item.remark}</u>` : ``}
            </div>
            ` : (item.lengthAndPieces.length - 1 === lpIndex && item.lengthAndPieces.length > 2 && item.lengthAndPieces.length < 4) ? `
            <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; border: 0.5px solid black; width: 22%; alignItems: center; padding: 0; justifyContent: center;">
              ${item.remark ? `<u style="margin: 0; font-weight: 500; font-size: 6px; ">${item.remark}</u>` : ``}  
            </div>
            `: (lpIndex === 1) ? `
            <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; border: 0.5px solid black; width: 22%; alignItems: center; padding: 2px; justifyContent: center;">
              <u style="margin: 0; font-weight: 500; font-size: 6px; ">${item.type.name}</u>
              ${item.remark && item.lengthAndPieces.length === 2 ? `<u style="margin: 0; font-weight: 500; font-size: 6px; ">${item.remark}</u>` : ``}
            </div>
            `: (lpIndex === 2) ? `
            <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; border: 0.5px solid black; width: 22%; alignItems: center; padding: 2px; justifyContent: center;">
               ${item.remark ? `<u style="margin: 0; font-weight: 500; font-size: 6px; ">${item.remark}</u>` : ``} 
            </div>
            `: `
            <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; border: 0.5px solid black; width: 22%; alignItems: center; padding: 0; justifyContent: center;">
            </div>
          `}

          <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; width: 9%; border: 0.5px solid black; alignItems: center; padding-top: 1px; padding-bottom: 1px; justifyContent: center;">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.thickness.name}</p>
          </div>

          <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; border: 0.5px solid black; alignItems: center; width: 8%; padding-top: 1px; padding-bottom: 1px; justifyContent: center;">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.width.name ? `${item.width.name} inch` : item.width}</p>
          </div>

          <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; width: 8%; border: 0.5px solid black; alignItems: center; justifyContent: center;">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${lp.length} ${item.unit.name}</p>
          </div>

          <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; width: 8%; border: 0.5px solid black; alignItems: center; justifyContent: center;">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${lp.pieces}</p>
          </div>

          <div style="display: flex; height: 13px; flexDirection: row; font-size: 6px; width: 15%; border: 0.5px solid black; alignItems: center; justifyContent: center;">
            <div style="width: 68%; align-items: center; ">
              <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${lp.pieces * lp.length}.00</p>
            </div>
            <div style="width: 1px; background-color: black; height: 100%; "></div>
            <div style="width: 32%;">

            </div>
          </div>

          <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; width: 17%; border: 0.5px solid black; alignItems: center;  justifyContent: center; ">
    
          </div>

          <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; width: 13%; border: 0.5px solid black; alignItems: center;  justifyContent: center;">
        
          </div>

        </div>
        `).join('');

      return rows + `
        <div style="display: flex; flexDirection: row; alignItems: center; alignSelf: center; font-size: 6px; ">

          <div style="display: flex; flexDirection: column; font-size: 6px; width: 22%; alignItems: flex-end; height: 12px; justifyContent: center; border: 0.5px solid black; padding-right: 8px;">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500; "></p>
          </div>

          <div style="display: flex; flexDirection: column; font-size: 6px; width: 25%; alignItems: flex-end; height: 12px; justifyContent: center; border: 0.5px solid black; padding-right: 8px;">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500; ">Total</p>
          </div>
         
          <div style="display: flex; flexDirection: column; font-size: 6px; width: 8%; alignItems: center; height: 12px; justifyContent: center; border: 0.5px solid black; ">
            <p style="fontSize: 6px; margin: 0; fontWeight: 600;">${totalPieces}</p>
          </div>
          
          <div style="display: flex; height: 12px; flexDirection: row; font-size: 6px; width: 15%; border: 0.5px solid black; alignItems: center; justifyContent: center;">
            <div style="width: 68%; align-items: center; ">
              <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${totalQuantity}.00</p>
            </div>
            <div style="width: 1px; background-color: black; height: 100%; "></div>
            <div style="width: 32%;">
              <span style="text-align: center; ">Rft</span>
            </div>
          </div>
         
          <div style="display: flex; flexDirection: row; font-size: 6px; width: 17%; alignItems: center; height: 12px; justifyContent: center; border: 0.5px solid black; ">
            <div style="width: 18%; ">
              <span style="text-align: center; font-weight: 500;">₹</span>
            </div>
            <div style="width: 1px; background-color: black; height: 100%; "></div>
            <div style="width: 40%; ">
              <span style="text-align: center; font-weight: 500; ">${item.rate}.00</span>
            </div>
            <div style="width: 1px; background-color: black; height: 100%; "></div>
            <div style="width: 42%;  ">
              <span style="text-align: center; font-weight: 500;">Per Rft</span>
            </div>  
          </div>
          
          <div style="display: flex; flexDirection: column; font-size: 6px; width: 13%; alignItems: center; height: 12px; justifyContent: center; border: 0.5px solid black; ">
            <p style="fontSize: 6px; margin: 0; fontWeight: 600;">₹${totalAmount}.00</p>
          </div>
        
          </div>
      `;

    }).join('');
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
              <p style="margin: 0; fontSize: 7px; margin-top: 0.5px; font-weight: 400;marginLeft: 0.5px; text-decoration: underline;"> ${refNo}</p>
            </div>
            <p style="margin: 0; fontSize: 7px; margin-top: 0.5px; font-weight: 400;">${formattedDate}</p>
          </div>
          
          <div style="flexDirection: row; alignItems: center; ">
            <p style="margin: 0; font-size: 7px; padding: 0; fontWeight: 500">Sales Person-:</p>
            <p style="margin: 0; font-size: 7px; padding: 0; margin-left: 2px">${loginDetails[0].name}</p>
          </div>

          <div style="flexDirection: column; alignItems: center">
            <h6 style="margin: 0; font-size: 7px; font-weight: 600;">ESTIMATE</h6>
            <h5 style="font-size: 7px; margin: 0; font-weight: 500; margin-top: 0.5px;">PARTY: ${name}</h5>
            <h6 style="margin: 0; font-size: 6px; padding: 0; fontWeight: 400; margin-top: 0.5px;">Site: ${site}</h6>
          </div>

          <div style="flexDirection: row; alignItems: center; justifyContent: space-between; margin-top: 0.5px;">
            <h6 style="margin: 0; font-size: 6px; padding: 0; fontWeight: 500">${pan === 'Not specified' ? '' : `PAN: ${pan}`}</h6>
            <h6 style="margin: 0; font-size: 6px; padding: 0; fontWeight: 500">Contact No.: ${contact}</h6>
            <h6 style="margin: 0; font-size: 6px; padding: 0; fontWeight: 500">${gstin === 'Not specified' ? '' : `GSTIN: ${gstin}`}</h6>
          </div>
        
        </div>

        <div style="flexDirection: row; alignItems: center; margin-bottom: 1px; alignSelf: center; margin-top: 2px; ">
          
          <div style="flexDirection: column; font-size: 6px; border: 0.5px solid black; width: 22%; alignItems: center; padding-top: 1px; padding-bottom: 1px; backgroundColor: #5bda49"; >
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">Material</p>
            <u style="fontSize: 6px; margin: 0; fontWeight: 500;">(Hi-rib)</u>
          </div>

          <div style="flexDirection: column; font-size: 6px; width: 9%; border: 0.5px solid black; alignItems: center; padding-top: 1px; padding-bottom: 1px; backgroundColor: #5bda49"; " >
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

          <div style="flexDirection: column; font-size: 6px; width: 17%; border: 0.5px solid black; alignItems: center;  padding-top: 1px; padding-bottom: 1px; backgroundColor: #5bda49";">
            <p style = "fontSize: 6px; margin: 0; fontWeight: 500;">Rate</p>
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">(In Rs.)</p>
          </div>

          <div style="flexDirection: column; font-size: 6px; width: 13%; border: 0.5px solid black;alignItems: center;  padding-top: 1px; padding-bottom: 1px; backgroundColor: #5bda49";">
            <p style = "fontSize: 6px; margin: 0; fontWeight: 500;">Amount</p>
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">(In Rs.)</p>
          </div>

        </div>

        ${generateTableRows2()}

        <div style=" width: 100%; border: 0.5px solid black; flexDirection: row; alignItems: center; margin-top: 1px;">

          <div style="width: 86.9%; flexDirection: column; alignItems: flex-end; padding-right: 2px; padding-top: 5px; padding-bottom: 5px; ">
            ${loadingCharge !== 0 ? `<p style="font-size: 6px; padding-right: 2px; margin: 0; ">Loading Charges</p>` : ``}
            ${bendCharge !== 0 ? `<p style="font-size: 6px; padding-right: 2px; margin: 0; ">Bend Charges</p>` : ``}
            ${transportCharge !== 0 ? `<p style="font-size: 6px; padding-right: 2px; margin: 0; ">Transport Charges</p>` : ``}
          </div>

          <div style="height: 100%; backgroundColor: black; width: 1.2px"></div>

          <div style="width: 13%; flexDirection: column; alignItems: center; padding-right: 2px;">
            ${loadingCharge !== 0 ? `<p style="font-size: 6px; padding-right: 2px; font-weight: 600; margin: 0; ">₹${indianNumberFormat(loadingCharge)}.00</p>` : ``}
            ${bendCharge !== 0 ? `<p style="font-size: 6px; padding-right: 2px; font-weight: 600; margin: 0;">₹${indianNumberFormat(bendCharge)}.00</p>` : ``}
            ${transportCharge !== 0 ? `<p style="font-size: 6px; padding-right: 2px; font-weight: 600; margin: 0;">₹${indianNumberFormat(transportCharge)}.00</p>` : ``}
          </div>

        </div>
          
        <div style="width: 100%; border: 0.5px solid black; width: 100%; flexDirection: row; alignItems: center; ">

          <div style="width: 86.9%; padding-top: 5px; padding-bottom: 5px; flexDirection: row; justifyContent: flex-end; padding-right: 2px;">
            <p style="margin: 1px; fontSize: 6px; ">Total amount to be paid</p>
          </div>
          
          <div style="height: 100%; backgroundColor: black; width: 1.2px"></div>

          <div style="width: 13%; flexDirection: row; justifyContent: center; ">
            <p style="fontSize: 6px; fontWeight: 600; margin: 0; ">₹${indianNumberFormat(calculateTotalPrice())}.00</p>
          </div>

        </div>

        <div style="width: 100%;">
          <p style="fontSize: 6px; fontWeight: 400; margin: 0;"><em>(Rupees ${numberToWords(calculateTotalPrice())} Only)</em></p>
        </div>

        <div style="margin-top: 4px;">
          <div style="display: flex; flexDirection: row;">
            <div>
              <h6 style="fontSize: 6px; margin: 0; fontWeight: 400;"><em>Note:</em></h6>
              <h5 style="fontSize: 6px; fontWeight: 500; margin-top: 2px; margin-bottom: 1px;">Terms & conditions:-</h5>
              <h6 style="fontSize: 6px; fontWeight: 400; margin: 0; padding-left: 1px"><em>1. Prices are inclusive of GST</em></h6>
              <h6 style="fontSize: 6px; fontWeight: 400; margin: 0; padding-left: 1px"><em>2. Prices are based on ex-factory at Changsari, Assam</em></h6>
              <h6 style="fontSize: 6px; fontWeight: 400; margin: 0; padding-left: 1px"><em>3. Payment Terms : 100% in Advance</em></h6>
              <h6 style="fontSize: 6px; fontWeight: 400; margin: 0; padding-left: 1px"><em>4. Rates are subject to change without any Prior Information.</em></h6>
            </div>
            <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzKTWxwQYlE-bvvFw7cb3WLvV-sx_A-XXzdK5HrixwRw&s" style="width: 90px; opacity: 0.2; paddingTop: 5px;">
            </div>
          </div>
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
      const pdfOptions = {
        html: htmlContent,
        fileName: 'ColourTuff_Invoice',
        directory: 'Documents',
      };

      const pdf = await RNHTMLtoPDF.convert(pdfOptions);
      const pdfPath = pdf.filePath;

      // Share the PDF
      const shareOptions = {
        title: 'Share Invoice',
        url: `file://${pdfPath}`,
        type: 'application/pdf',
        saveToFiles: true,
      };

      await Share.open(shareOptions);
    } catch (error) {

    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f3f6', paddingBottom: 10, }}>
      <StatusBar
        animated={true}
        backgroundColor='#fff'
        barStyle="dark-content"
      />

      {/* header */}
      <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "space-between", elevation: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: "100%", }}>

          <View style={{ paddingVertical: 10, flexDirection: "row", alignItems: "center", gap: 3, paddingHorizontal: 10, justifyContent: 'space-between' }}>
            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
              <Icon name="keyboard-arrow-left" size={26} color={zomatoRed} />
            </TouchableOpacity>
          </View>

          <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.3), textTransform: 'uppercase' }}>View Invoice</Text>

          <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 8 }} onPress={() => generateInvoice()}>
            <Icon name="share" size={18} color={zomatoRed} />
          </TouchableOpacity>

        </View>
      </View>

      <ScrollView>

        {loading ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'center', marginTop: 30 }}>
            <ActivityIndicator size="large" color={zomatoRed} />
            <Text style={{ color: zomatoRed, fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>Building the invoice ...</Text>
          </View>
        ) : (
          <PinchZoomView style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20, }}>
            <HTML source={{ html: htmlContent2 }} />
          </PinchZoomView>
        )}

      </ScrollView>

    </SafeAreaView>
  )
}

export default OrderDetails;

const styles = StyleSheet.create({});