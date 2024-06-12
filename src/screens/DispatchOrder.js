import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { zomatoRed } from '../utils/colors';
import { useSelector } from 'react-redux';
import HTML from 'react-native-render-html';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import PinchZoomView from 'react-native-pinch-zoom-view';
import { useEffect, useState } from 'react';

const DispatchOrder = () => {

  const navigation = useNavigation();

  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const bendCharge = 200;
  const loadingCharge = 100;
  const transportCharge = 300;

  const [name, setName] = useState('');
  const [site, setSite] = useState('');
  const [pan, setPan] = useState('');
  const [contact, setContact] = useState('');
  const [gstin, setGstin] = useState('');

  const userDetails = useSelector(state => state.user);
  const billDetails = useSelector(state => state.bill);

  useEffect(() => {
    userDetails.map(user => {
      setName(user.name)
      setSite(user.site)
      setPan(user.pan)
      setContact(user.contact)
      setGstin(user.gstin)
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

  const generateTableRows2 = () => {
    return billDetails.map((item, index) => {

      const totalPieces = item.lengthAndPieces.reduce((sum, lp) => sum + (lp.pieces * 1), 0);

      const rows = item.lengthAndPieces.map((lp, lpIndex) => `
        <div key=${lpIndex} style="display: flex; flexDirection: row; alignItems: center; ">

          ${lpIndex === 0 ? `
            <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; border: 0.5px solid black; width: 22%; alignItems: center; padding: 0; justifyContent: center;">
              <p style="fontSize: 6px; margin: 0; fontWeight: 500;"><u>Colour: ${item.color}</u></p>
              ${item.lengthAndPieces.length === 1 ? `<u style="margin: 0; font-weight: 500; font-size: 6px; ">${item.type}</u>` : ``}
            </div>
            ` : (item.lengthAndPieces.length - 1 === lpIndex && item.lengthAndPieces.length > 2) ? `
            <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; border: 0.5px solid black; width: 22%; alignItems: center; padding: 0; justifyContent: center;">
            
            </div>
            `: (lpIndex === 1) ? `
              <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; border: 0.5px solid black; width: 22%; alignItems: center; padding: 2px; justifyContent: center;">
                <u style="margin: 0; font-weight: 500; font-size: 6px; ">${item.type}</u>
              </div>
            `: `
              <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; border: 0.5px solid black; width: 22%; alignItems: center; padding: 0; justifyContent: center;">
              
              </div>
          `}

          <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; width: 9%; border: 0.5px solid black; alignItems: center; padding-top: 1px; padding-bottom: 1px; justifyContent: center;">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.thickness}</p>
          </div>

          <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; border: 0.5px solid black; alignItems: center; width: 8%; padding-top: 1px; padding-bottom: 1px; justifyContent: center;">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${item.width}</p>
          </div>

          <div style="display: flex; height: 13px; flexDirection: column; font-size: 6px; width: 8%; border: 0.5px solid black; alignItems: center; justifyContent: center;">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500;">${lp.length} ${item.unit}</p>
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
        <div style="display: flex; flexDirection: row; alignItems: center; alignSelf: center; font-size: 6px; background-color: #a2eaf3; ">

          <div style="display: flex; flexDirection: column; font-size: 6px; width: 22%; alignItems: flex-end; height: 12px; justifyContent: center; border: 0.5px solid black; padding-right: 8px;">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500; "></p>
          </div>

          <div style="display: flex; flexDirection: column; font-size: 6px; width: 25%; alignItems: flex-end; height: 12px; justifyContent: center; border: 0.5px solid black; padding-right: 8px;">
            <p style="fontSize: 6px; margin: 0; fontWeight: 500; ">Total</p>
          </div>
         
          <div style="display: flex; flexDirection: column; font-size: 6px; width: 8%; alignItems: center; height: 12px; justifyContent: center; border: 0.5px solid black; ">
            <p style="fontSize: 6px; margin: 0; fontWeight: 600;">${totalPieces}</p>
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
        <body style="color: black; padding: 20px; background-color: white; ">
          <div style="border-color: black; border-width: 1px; border-style: solid; padding: 3px; ">

            <div>

              <div style="flexDirection: row;">
                <div style="marginLeft: 17px">
                  <h6 style="text-align: center; margin: 0; font-size: 12px; padding: 0;">POOJA ROOFING CO.(MFG)</h6>
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
                  <p style="margin: 0; fontSize: 7px; margin-top: 0.5px; font-weight: 400;marginLeft: 0.5px; text-decoration: underline;"> PRCM/24-25/098</p>
                </div>
                <p style="margin: 0; fontSize: 7px; margin-top: 0.5px; font-weight: 400;">${formattedDate}</p>
              </div>
              
              <div style="flexDirection: row; alignItems: center; ">
                <p style="margin: 0; font-size: 7px; padding: 0; fontWeight: 500">Sales Person-:</p>
                <p style="margin: 0; font-size: 7px; padding: 0; margin-left: 2px">Anil Beniwal</p>
              </div>

              <div style="flexDirection: column; alignItems: center">
                <h6 style="margin: 0; font-size: 7px; font-weight: 600;">ESTIMATE</h6>
                <h5 style="font-size: 7px; margin: 0; font-weight: 500; margin-top: 0.5px;">PARTY: ${name}</h5>
                <h6 style="margin: 0; font-size: 6px; padding: 0; fontWeight: 400; margin-top: 0.5px;">Site: ${site}</h6>
              </div>

              <div style="flexDirection: row; alignItems: center; justifyContent: space-between; margin-top: 0.5px;">
                <h6 style="margin: 0; font-size: 6px; padding: 0; fontWeight: 500">PAN: ${pan}</h6>
                <h6 style="margin: 0; font-size: 6px; padding: 0; fontWeight: 500">Contact No.: ${contact}</h6>
                <h6 style="margin: 0; font-size: 6px; padding: 0; fontWeight: 500">GSTIN: ${gstin}</h6>
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

          </div>
        </body >
      </html >
  `;

  const generateInvoice = async () => {

    try {
      // Generate PDF
      const pdfOptions = {
        html: htmlContent2,
        fileName: 'ColourTuff_DO',
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#444444', paddingBottom: 10, }}>
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

          <Text style={{ color: "#fff", fontWeight: "500", fontSize: responsiveFontSize(2.4), textTransform: 'uppercase' }}>Dispatch Order</Text>

          <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 8 }} onPress={generateInvoice}>
            <Icon name="share" size={18} color={'#fff'} />
          </TouchableOpacity>

        </View>
      </View>

      {billDetails.length === 0 ? (
        <View>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Nothing to display</Text>
        </View>
      ) : (
        <ScrollView>
          <PinchZoomView style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20, }}>

            <View style={{ height: '100%', backgroundColor: '#fff', width: '100%', padding: 12 }}>
              <View style={{ borderColor: '#000', borderWidth: 1, padding: 2 }}>

                {/* First para */}
                <View>
                  <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', textAlign: 'center', color: '#1bb3c7', textDecorationLine: 'underline' }}>POOJA ROOFING CO. (MFG)</Text>
                  <Text style={{ fontSize: responsiveFontSize(1.1), textAlign: 'center', color: '#000' }}>LOKHRA - LALGANESH ROAD , GUWAHATI - 781034 , ASSAM</Text>
                  <Text style={{ fontSize: responsiveFontSize(1.4), textAlign: 'center', color: '#000', marginTop: 7, textDecorationLine: 'underline' }}>GST NO: 18AAZFP3190K1ZD</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: responsiveFontSize(1.2), textAlign: 'left', marginVertical: 4, color: '#000', fontWeight: '700' }}>REF: DO/24-25/077</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.2), textAlign: 'right', marginVertical: 4, color: '#000', textDecorationLine: 'underline', fontWeight: '500' }}>{formattedDate}</Text>
                  </View>
                  <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: 'bold', textAlign: 'center', marginTop: 3, marginBottom: 3, color: '#000', textDecorationLine: 'underline' }}>DISPATCH ORDER</Text>
                  <Text style={{ fontSize: responsiveFontSize(1.7), textAlign: 'center', marginVertical: 6, color: '#000', fontWeight: '700', textDecorationLine: 'underline' }}>PARTY: Saraswati Enterprise</Text>
                </View>

                {/* Second para */}
                <View style={{ borderWidth: 1, borderColor: '#000', marginVertical: 8 }}>
                  <View style={{ flexDirection: 'row', backgroundColor: '#f0f0f0' }}>
                    <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', padding: 4 }}>THICKNESS</Text>
                    <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', padding: 4 }}>WIDTH</Text>
                    <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', padding: 4 }}>LENGTH</Text>
                    <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', padding: 4 }}>PC</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>0.45</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>3.5</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>17</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>30</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>0.45</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>3.5</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>15.6</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>10</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>0.45</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>3.5</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>13.6</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>10</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#000' }}>Total</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }} />
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }} />
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>50</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>0.40</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>3.5</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>7.8</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>31</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#000' }}>Total</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }} />
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }} />
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>31</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>0.40</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>2</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>10</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>4</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#000' }}>Total</Text>
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }} />
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }} />
                    <Text style={{ flex: 1, textAlign: 'center', padding: 4, borderBottomWidth: 1, borderBottomColor: '#000' }}>4</Text>
                  </View>
                </View>

                {/* Third para */}
                <View>
                  <Text style={{ fontSize: responsiveFontSize(1.2), marginBottom: 1, fontWeight: '700', color: '#000', backgroundColor: 'yellow' }}>1. Pooja Roofing CO. MFG & 0.40mm/0.45mm Thickness to be Printed.</Text>
                  <Text style={{ fontSize: responsiveFontSize(1.1), fontWeight: '700', color: '#000', }}>2. REGARDING ANY ISSUE IN MEASUREMENT PLEASE CONTACT 6901262103</Text>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                    <View>
                      <Text style={{ fontSize: responsiveFontSize(1.2), textAlign: 'center', color: '#000' }}>Prepared By</Text>
                      <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: 'bold', textAlign: 'center', color: '#000' }}>( A.B )</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: responsiveFontSize(1.2), textAlign: 'center', color: '#000' }}>Checked By</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: responsiveFontSize(1.2), textAlign: 'center', color: '#000' }}>Approved By</Text>
                      <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: 'bold', textAlign: 'center', color: '#000' }}>( S Beniwal )</Text>
                    </View>
                  </View>

                  <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: responsiveFontSize(1.2), color: '#000', marginBottom: 2, fontWeight: '700' }}>Dispatch Date:-</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.2), color: '#000', marginBottom: 2, fontWeight: '700' }}>Order By:- P. Chakraborty</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.2), color: '#000', marginBottom: 2, fontWeight: '700' }}>Material weight=</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.2), color: '#000', marginBottom: 2, fontWeight: '700' }}>Advance Payment=</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.2), fontWeight: 'bold', color: '#000', marginBottom: 2, fontWeight: '700' }}>Total Payment= 132800</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.2), color: '#000', fontWeight: '700' }}>Receipt No:-</Text>
                  </View>

                </View>

              </View>
            </View>

          </PinchZoomView>
        </ScrollView>
      )}

    </SafeAreaView>
  )
}

export default DispatchOrder;

const styles = StyleSheet.create({});

{/* <HTML source={{ html: htmlContent2 }} /> */ }